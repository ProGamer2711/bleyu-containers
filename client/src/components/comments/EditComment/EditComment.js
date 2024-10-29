import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "../../../hooks/useForm";
import * as commentService from "../../../services/commentService";
import { formatValidationError } from "../../../util/validationUtils";

import styles from "./EditComment.module.css";

export default function EditComment() {
	const [
		formState,
		formErrors,
		handleChange,
		handleBlur,
		handleSubmitValidation,
	] = useForm(
		{
			content: "",
			_owner: "",
			_post: "",
		},
		{ content: true }
	);

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		commentService.getComment(id).then(({ comment }) => {
			handleChange({ target: { name: "content", value: comment.content } });
			handleChange({ target: { name: "_owner", value: comment._owner?._id } });
			handleChange({ target: { name: "_post", value: comment._post._id } });
		});
	}, [id, handleChange]);

	const handleSubmit = e => {
		const isInvalid = handleSubmitValidation(e);

		if (isInvalid) return;

		commentService
			.editComment(id, {
				_owner: formState._owner,
				content: formState.content,
			})
			.then(() => {
				navigate(`/posts/${formState._post}`, { replace: true });
			})
			.catch(err => alert(formatValidationError(err)));
	};

	return (
		<div className={styles["edit-comment"]}>
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
					<button type="submit">Edit Comment</button>
				</div>
			</form>
		</div>
	);
}
