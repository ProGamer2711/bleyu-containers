import { useContext } from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";
import { loginUser } from "../../../services/userService";
import { formatValidationError } from "../../../util/validationUtils";

import styles from "./LogIn.module.css";

export default function LogIn() {
	const [
		formState,
		formErrors,
		handleChange,
		handleBlur,
		handleSubmitValidation,
	] = useForm({
		email: "",
		password: "",
	});

	const { setUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const { state } = useLocation();

	const handleSubmit = e => {
		const isInvalid = handleSubmitValidation(e);

		if (isInvalid) return;

		loginUser(formState)
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
		<div className={styles["login"]}>
			<form onSubmit={handleSubmit}>
				<div className="form-field">
					<label htmlFor="email">Email:</label>

					<input
						type="text"
						id="email"
						name="email"
						placeholder="user@example.com"
						required
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
						required
						value={formState.password}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					{formErrors.password && (
						<p className="error">{formErrors.password}</p>
					)}
				</div>

				<div className="form-field">
					<button type="submit">Log In</button>
				</div>
			</form>

			<Link to="/auth/signup" className="redirect">
				Don't have an account?
			</Link>
		</div>
	);
}
