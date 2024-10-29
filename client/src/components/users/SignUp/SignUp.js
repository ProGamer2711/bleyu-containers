import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";
import { registerUser } from "../../../services/userService";
import { formatValidationError } from "../../../util/validationUtils";

import styles from "./SignUp.module.css";

export default function SignUp() {
	const [
		formState,
		formErrors,
		handleChange,
		handleBlur,
		handleSubmitValidation,
	] = useForm(
		{
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			imageUrl: "",
		},
		{
			username: true,
			email: true,
			password: true,
			confirmPassword: true,
		}
	);

	const { setUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const { state } = useLocation();

	const handleSubmit = e => {
		const isInvalid = handleSubmitValidation(e, formState["confirmPassword"]);

		if (isInvalid) return;

		registerUser(formState)
			.then(data => {
				setUser(data);
				navigate(state?.previousPath || -1, { replace: true });
			})
			.catch(err => {
				console.log(err);
				alert(formatValidationError(err));
			});
	};

	return (
		<div className={styles["signup"]}>
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
					<label htmlFor="imageUrl">Image Url (Not Required):</label>

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
					<button type="submit">Sign Up</button>
				</div>
			</form>

			<Link to="/auth/login" className="redirect">
				Already have an account?
			</Link>
		</div>
	);
}
