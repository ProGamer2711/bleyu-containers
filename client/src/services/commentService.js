import * as requester from "../util/requester";

export const getPostComments = async postId => {
	const data = await requester.get(`/comments/post/${postId}`).catch(err => {
		throw err;
	});

	return data;
};

export const getUserComments = async userId => {
	const data = await requester.get(`/comments/user/${userId}`).catch(err => {
		throw err;
	});

	return data;
};

export const getComment = async commentId => {
	const data = await requester.get(`/comments/${commentId}`).catch(err => {
		throw err;
	});

	return data;
};

export const createComment = async comment => {
	const data = await requester.post("/comments", comment).catch(err => {
		throw err;
	});

	return data;
};

export const editComment = async (id, comment) => {
	const data = await requester.put(`/comments/${id}`, comment).catch(err => {
		throw err;
	});

	return data;
};

export const upvoteComment = async id => {
	const data = await requester.put(`/comments/${id}/upvote`).catch(err => {
		throw err;
	});

	return data;
};

export const downvoteComment = async id => {
	const data = await requester.put(`/comments/${id}/downvote`).catch(err => {
		throw err;
	});

	return data;
};

export const unvoteComment = async id => {
	const data = await requester.put(`/comments/${id}/unvote`).catch(err => {
		throw err;
	});

	return data;
};

export const deleteComment = async (id, ownerId) => {
	const data = await requester
		.del(`/comments/${id}`, {
			_owner: ownerId,
		})
		.catch(err => {
			throw err;
		});

	return data;
};
