import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";
import * as commentService from "../../../services/commentService";
import { formatValidationError } from "../../../util/validationUtils";

import styles from "./CreateComment.module.css";

export default function CreateComment() {
	const [
		formState,
		formErrors,
		handleChange,
		handleBlur,
		handleSubmitValidation,
	] = useForm(
		{
			content: "",
		},
		{ content: true }
	);

	const { id } = useParams();

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleSubmit = e => {
		const isInvalid = handleSubmitValidation(e);

		if (isInvalid) return;

		commentService
			.createComment({
				_post: id,
				_owner: user._id,
				content: formState.content,
			})
			.then(() => {
				navigate(`/posts/${id}`, { replace: true });
			})
			.catch(err => alert(formatValidationError(err)));
	};

	return (
		<div className={styles["create-comment"]}>
			<form onSubmit={handleSubmit}>
				<div className="form-field">
					<label htmlFor="content">Comment:</label>

					<textarea
						className={styles["comment"]}
						id="content"
						name="content"
						placeholder="Add a comment..."
						value={formState.content}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					{formErrors.content && <p className="error">{formErrors.content}</p>}
				</div>

				<div className="form-field">
					<button type="submit">Create Comment</button>
				</div>
			</form>
		</div>
	);
}
