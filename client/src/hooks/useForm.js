import { useState } from "react";

import { validateField, validateForm } from "../util/validationUtils";

export const useForm = (initialState, checkLength = {}) => {
	const [formState, setFormState] = useState(initialState);
	const [formErrors, setFormErrors] = useState({});

	const handleChange = (e, ...args) => {
		setFormState(formState => ({
			...formState,
			[e.target.name]: e.target.value,
		}));

		if (formErrors[e.target.name]) {
			const [error, secondaryError, field] = validateField(
				e,
				checkLength[e.target.name] || false,
				...args
			);

			setFormErrors(formErrors => ({
				...formErrors,
				[e.target.name]: error || "",
			}));

			if (field) {
				setFormErrors(formErrors => ({
					...formErrors,
					[field]: secondaryError || "",
				}));
			}
		}
	};

	const handleBlur = (e, ...args) => {
		const [error, secondaryError, field] = validateField(
			e,
			checkLength[e.target.name] || false,
			...args
		);

		setFormErrors(formErrors => ({
			...formErrors,
			[e.target.name]: error || "",
		}));

		if (field) {
			setFormErrors(formErrors => ({
				...formErrors,
				[field]: secondaryError || "",
			}));
		}
	};

	const handleSubmitValidation = (e, ...args) => {
		e.preventDefault();

		const errors = validateForm(formState, checkLength, ...args);

		if (Object.values(errors).some(error => error.length > 0)) {
			setFormErrors(errors);
			return true;
		}

		return false;
	};

	return [
		formState,
		formErrors,
		handleChange,
		handleBlur,
		handleSubmitValidation,
	];
};
