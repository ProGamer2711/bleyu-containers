import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";
import * as postService from "../../../services/postService";
import { formatValidationError } from "../../../util/validationUtils";

import styles from "./CreatePost.module.css";

export default function CreatePost() {
	const [
		formState,
		formErrors,
		handleChange,
		handleBlur,
		handleSubmitValidation,
	] = useForm(
		{
			title: "",
			content: "",
		},
		{
			title: true,
			content: true,
		}
	);

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleSubmit = e => {
		const isInvalid = handleSubmitValidation(e);

		if (isInvalid) return;

		postService
			.createPost({ ...formState, _owner: user._id })
			.then(post => {
				navigate(`/posts/${post._id}`, { replace: true });
			})
			.catch(err => {
				alert(formatValidationError(err));
			});
	};

	return (
		<div className={styles["create-post"]}>
			<form onSubmit={handleSubmit}>
				<div className="form-field">
					<label htmlFor="title">Title:</label>

					<input
						type="text"
						id="title"
						name="title"
						placeholder="Title"
						value={formState.title}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					{formErrors.title && <p className="error">{formErrors.title}</p>}
				</div>

				<div className="form-field">
					<label htmlFor="content">Content:</label>

					<textarea
						id="content"
						name="content"
						placeholder="Content"
						value={formState.content}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					{formErrors.content && <p className="error">{formErrors.content}</p>}
				</div>

				<div className="form-field">
					<button type="submit">Create Post</button>
				</div>
			</form>
		</div>
	);
}
