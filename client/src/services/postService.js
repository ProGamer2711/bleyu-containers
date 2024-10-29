import * as requester from "../util/requester";

export const getPosts = async userId => {
	const requestPath = userId ? `/user/${userId}` : "";

	const data = await requester.get(`/posts${requestPath}`).catch(err => {
		throw err;
	});

	return data;
};

export const getPost = async id => {
	const data = await requester.get(`/posts/${id}`).catch(err => {
		throw err;
	});

	return data;
};

export const createPost = async post => {
	const data = await requester.post("/posts", post).catch(err => {
		throw err;
	});

	return data;
};

export const editPost = async (id, post) => {
	const data = await requester.put(`/posts/${id}`, post).catch(err => {
		throw err;
	});

	return data;
};

export const upvotePost = async id => {
	const data = await requester.put(`/posts/${id}/upvote`).catch(err => {
		throw err;
	});

	return data;
};

export const downvotePost = async id => {
	const data = await requester.put(`/posts/${id}/downvote`).catch(err => {
		throw err;
	});

	return data;
};

export const unvotePost = async id => {
	const data = await requester.put(`/posts/${id}/unvote`).catch(err => {
		throw err;
	});

	return data;
};

export const deletePost = async (id, ownerId) => {
	const data = await requester
		.del(`/posts/${id}`, {
			_owner: ownerId,
		})
		.catch(err => {
			throw err;
		});

	return data;
};
