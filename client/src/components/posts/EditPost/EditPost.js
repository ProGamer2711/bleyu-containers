import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";
import * as postService from "../../../services/postService";
import { formatValidationError } from "../../../util/validationUtils";

import styles from "./EditPost.module.css";

export default function EditPost() {
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
			_id: "",
		},
		{
			title: true,
			content: true,
		}
	);

	const { id } = useParams();

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		postService
			.getPost(id)
			.then(({ post }) => {
				handleChange({ target: { name: "title", value: post.title } });
				handleChange({ target: { name: "content", value: post.content } });
				handleChange({ target: { name: "_id", value: post._id } });
			})
			.catch(err => {
				alert(err?.err || err);
			});
	}, [id, handleChange]);

	const handleSubmit = e => {
		const isInvalid = handleSubmitValidation(e);

		if (isInvalid) return;

		postService
			.editPost(formState._id, { ...formState, _owner: user._id })
			.then(post => {
				navigate(`/posts/${post._id}`, { replace: true });
			})
			.catch(err => {
				alert(formatValidationError(err));
			});
	};

	return (
		<div className={styles["edit-post"]}>
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
					<button type="submit">Edit Post</button>
				</div>
			</form>
		</div>
	);
}
