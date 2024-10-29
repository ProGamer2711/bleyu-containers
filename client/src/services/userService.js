import * as requester from "../util/requester";

export const getUsers = async () => {
	const data = await requester.get("/users").catch(err => {
		throw err;
	});

	return data;
};

export const getUser = async userId => {
	const data = await requester.get(`/users/${userId}`).catch(err => {
		throw err;
	});

	return data;
};

export const registerUser = async ({ username, email, password, imageUrl }) => {
	const data = await requester
		.post("/auth/register", {
			username,
			email,
			password,
			imageUrl: imageUrl || undefined,
		})
		.catch(err => {
			throw err;
		});

	return data;
};

export const loginUser = async ({ email, password }) => {
	const data = await requester
		.post("/auth/login", {
			email,
			password,
		})
		.catch(err => {
			throw err;
		});

	return data;
};

export const logoutUser = async () => {
	const data = await requester.get("/auth/logout").catch(err => {
		throw err;
	});

	return data;
};

export const editUser = async (userId, user) => {
	const data = await requester.put(`/users/${userId}`, user).catch(err => {
		throw err;
	});

	return data;
};

export const deleteUser = async (userId, password) => {
	const data = await requester
		.del(`/users/${userId}`, {
			password,
		})
		.catch(err => {
			throw err;
		});

	return data;
};
