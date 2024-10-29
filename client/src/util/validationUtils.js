export const formatValidationError = errors => {
	let formattedError = "";

	for (let key in errors) {
		formattedError += `${errors[key]}\n`;
	}

	return formattedError;
};

export const validateField = (e, checkLength, ...args) => {
	const { name, value } = e.target;
	let error = null;
	let secondaryError = null;
	let field = null;

	if (value.length === 0) {
		if (checkLength && value.length === 0) error = "This field is required";

		return [error, secondaryError, field];
	}

	switch (name) {
		case "username":
			error = validateUsername(value)
				? null
				: "Username must not contain spaces";
			break;
		case "email":
			error = validateEmail(value) ? null : "Invalid email";
			break;
		case "password":
			error = validatePassword(value)
				? null
				: "Password must be at least 8 characters, \nhave an uppercase and lowercase letter and one special character";

			if (args.length) {
				field = "confirmPassword";
				if (!validateMatchingPasswords(value, args[0])) {
					secondaryError = "Passwords do not match";
				}
			}
			break;
		case "confirmPassword":
			error = validateMatchingPasswords(value, args[0])
				? null
				: "Passwords do not match";
			break;
		case "oldPassword":
			error = validatePassword(value)
				? null
				: "Password must be at least 8 characters, \nhave an uppercase and lowercase letter and one special character";
			break;
		case "imageUrl":
			error = validateUrl(value) ? null : "Invalid URL";
			break;
		case "title":
			error = minLength(3, value)
				? null
				: "Title must be at least 3 characters long";
			break;
		case "content":
			error = minLength(3, value)
				? null
				: "Content must be at least 3 characters long";
			break;
		default:
			break;
	}

	return [error, secondaryError, field];
};

export const validateForm = (formState, checkLength, ...args) => {
	let errors = {};

	for (let key in formState) {
		const [error, secondaryError, field] = validateField(
			{ target: { name: key, value: formState[key] } },
			checkLength[key],
			// for the case of confirmPassword
			args[0] || formState[key]
		);

		if (error) {
			errors[key] = error;
		}

		if (secondaryError) {
			errors[field] = secondaryError;
		}
	}

	return errors;
};

const validateUsername = username => {
	return !/\s/g.test(username);
};
const validateEmail = email => {
	const re = /^[A-Za-z0-9_.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;
	return re.test(String(email).trim().toLowerCase());
};

const validatePassword = password => {
	const re =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return re.test(String(password));
};

const validateMatchingPasswords = (password, confirmPassword) => {
	return password === confirmPassword;
};

const validateUrl = url => {
	if (url.length === 0) return true;

	const re = /^https?:\/\/.+/;
	return re.test(String(url).trim());
};

const minLength = (min, value) => {
	return value.length >= min;
};
