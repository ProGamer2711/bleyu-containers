import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";
import * as userService from "../../../services/userService";

import styles from "./DeleteUser.module.css";

export default function DeleteUser() {
	const [
		formState,
		formErrors,
		handleChange,
		handleBlur,
		handleSubmitValidation,
	] = useForm(
		{
			password: "",
		},
		{
			password: true,
		}
	);

	const { id } = useParams();

	const navigate = useNavigate();

	const { setUser } = useContext(AuthContext);

	const handleSubmit = e => {
		const isInvalid = handleSubmitValidation(e);

		if (isInvalid) return;

		if (!window.confirm("Are you sure you want to delete this user?")) return;

		userService
			.deleteUser(id, formState.password)
			.then(({ message }) => {
				alert(message);
				setUser({});
				navigate("/", { replace: true });
			})
			.catch(err => {
				alert(err?.err || err);
			});
	};

	return (
		<div className={styles["form-wrapper"]}>
			<form className={styles["delete-user"]} onSubmit={handleSubmit}>
				<div className="form-field">
					<label htmlFor="password">Confirm Password:</label>

					<input
						type="password"
						id="password"
						name="password"
						placeholder="Confirm Password"
						value={formState.password}
						onChange={handleChange}
						onBlur={e => handleBlur(e)}
					/>

					{formErrors.password && (
						<p className="error">{formErrors.password}</p>
					)}
				</div>

				<div className="form-field">
					<button type="submit">Delete User</button>
				</div>
			</form>
		</div>
	);
}
