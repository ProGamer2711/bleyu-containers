const router = require("express").Router();
const {
	getComments,
	updateComment,
	deleteComment,
	createComment,
	changeCommentRating,
} = require("../helpers/comments");
const verifyToken = require("../middleware/auth");

// get all comments for post
router.get("/post/:postId", async (req, res) => {
	try {
		const { err, count, comments } = await getComments({
			_post: req.params.postId,
		});

		if (err) throw err;

		res.status(200).json({ comments, count });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// get comments by user id
router.get("/user/:userId", async (req, res) => {
	try {
		const { err, count, comments } = await getComments({
			_owner: req.params.userId,
		});

		if (err) throw err;

		res.status(200).json({ comments, count });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// get comment by id
router.get("/:id", async (req, res) => {
	try {
		const { err, comments } = await getComments({ _id: req.params.id });

		if (err) throw err;

		if (!comments) {
			throw new Error("There is no such comment with provided id.", 404);
		}

		res.status(200).json({ comment: comments[0] });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// update comment
router.put("/:id", verifyToken, async (req, res) => {
	try {
		const comment = await updateComment(req.params.id, req.body);

		if (comment.err) throw comment.err;

		res.status(200).json(comment);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// delete comment
router.delete("/:id", verifyToken, async (req, res) => {
	try {
		const comment = await deleteComment(req.params.id, req.body._owner);

		if (comment.err) throw comment.err;

		res.status(200).json(comment);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// create new comment
router.post("/", verifyToken, async (req, res) => {
	try {
		const comment = await createComment(req.body);

		if (comment.err) throw comment.err;

		res.status(201).json(comment);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// upvote comment
router.put("/:id/upvote", verifyToken, async (req, res) => {
	try {
		const comment = await changeCommentRating(
			req.params.id,
			req.user.user_id,
			1
		);

		if (comment.err) throw comment.err;

		res.status(200).json(comment);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// downvote comment
router.put("/:id/downvote", verifyToken, async (req, res) => {
	try {
		const comment = await changeCommentRating(
			req.params.id,
			req.user.user_id,
			-1
		);

		if (comment.err) throw comment.err;

		res.status(200).json(comment);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// unvote comment
router.put("/:id/unvote", verifyToken, async (req, res) => {
	try {
		const comment = await changeCommentRating(
			req.params.id,
			req.user.user_id,
			0
		);

		if (comment.err) throw comment.err;

		res.status(200).json(comment);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

module.exports = {
	path: "/comments",
	router,
};
