import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";
import * as userService from "../../../services/userService";
import { formatValidationError } from "../../../util/validationUtils";

import styles from "./EditUser.module.css";

export default function EditUser() {
	const { user, setUser } = useContext(AuthContext);

	const [
		formState,
		formErrors,
		handleChange,
		handleBlur,
		handleSubmitValidation,
	] = useForm(
		{
			username: user.username,
			email: user.email,
			password: "",
			confirmPassword: "",
			imageUrl: user.imageUrl,
			oldPassword: "",
		},
		{
			oldPassword: true,
		}
	);

	const navigate = useNavigate();

	const { state } = useLocation();

	const handleSubmit = e => {
		const isInvalid = handleSubmitValidation(e, formState["confirmPassword"]);

		if (isInvalid) return;

		userService
			.editUser(user._id, {
				...formState,
				password: formState.oldPassword,
				newPassword: formState.password,
			})
			.then(data => {
				alert("User updated successfully");
				setUser(data);
				navigate(state?.previousPath || -1, { replace: true });
			})
			.catch(err => {
				console.log(err);
				alert(formatValidationError(err));
			});
	};

	return (
		<div className={styles["edit-user"]}>
			<form onSubmit={handleSubmit}>
				<div className="form-field">
					<label htmlFor="username">Username:</label>

					<input
						type="text"
						id="username"
						name="username"
						placeholder="Username"
						value={formState.username}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					{formErrors.username && (
						<p className="error">{formErrors.username}</p>
					)}
				</div>

				<div className="form-field">
					<label htmlFor="email">Email:</label>

					<input
						type="text"
						id="email"
						name="email"
						placeholder="user@example.com"
						value={formState.email}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					{formErrors.email && <p className="error">{formErrors.email}</p>}
				</div>

				<div className="form-field">
					<label htmlFor="password">Password:</label>

					<input
						type="password"
						id="password"
						name="password"
						placeholder="Password"
						value={formState.password}
						onChange={e => handleChange(e, formState.confirmPassword)}
						onBlur={e => handleBlur(e, formState.confirmPassword)}
					/>

					{formErrors.password && (
						<p className="error">{formErrors.password}</p>
					)}
				</div>

				<div className="form-field">
					<label htmlFor="confirmPassword">Confirm Password:</label>

					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						placeholder="Confirm Password"
						value={formState.confirmPassword}
						onChange={e => handleChange(e, formState.password)}
						onBlur={e => handleBlur(e, formState.password)}
					/>

					{formErrors.confirmPassword && (
						<p className="error">{formErrors.confirmPassword}</p>
					)}
				</div>

				<div className="form-field">
					<label htmlFor="imageUrl">Image Url:</label>

					<input
						type="text"
						id="imageUrl"
						name="imageUrl"
						placeholder="https://www.example.com/image.jpg"
						value={formState.imageUrl}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					{formErrors.imageUrl && (
						<p className="error">{formErrors.imageUrl}</p>
					)}
				</div>

				<div className="form-field">
					<label htmlFor="oldPassword">Old Password (Required):</label>

					<input
						type="password"
						id="oldPassword"
						name="oldPassword"
						placeholder="Old Password"
						value={formState.oldPassword}
						onChange={handleChange}
						onBlur={e => handleBlur(e)}
					/>

					{formErrors.oldPassword && (
						<p className="error">{formErrors.oldPassword}</p>
					)}
				</div>

				<div className="form-field">
					<button type="submit">Edit User</button>
				</div>
			</form>
		</div>
	);
}
