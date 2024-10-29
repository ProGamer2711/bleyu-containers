const router = require("express").Router();
const {
	getPosts,
	updatePost,
	deletePost,
	createPost,
	changePostRating,
} = require("../helpers/posts");
const verifyToken = require("../middleware/auth");

// get all posts
router.get("/", async (_, res) => {
	try {
		const { err, count, posts } = await getPosts({});

		if (err) throw err;

		res.status(200).json({ posts, count });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// get posts by user id
router.get("/user/:id", async (req, res) => {
	try {
		const { err, count, posts } = await getPosts({ _owner: req.params.id });

		if (err) throw err;

		res.status(200).json({ posts, count });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// get post by id
router.get("/:id", async (req, res) => {
	try {
		const { err, posts } = await getPosts({ _id: req.params.id });

		if (err) throw err;

		if (!posts) {
			throw new Error("There is no such post with provided id.", 404);
		}

		res.status(200).json({ post: posts[0] });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ err: err.message });
	}
});

// update post
router.put("/:id", verifyToken, async (req, res) => {
	try {
		let body = req.body;

		let ownerId = body._owner;

		delete body._owner;

		const post = await updatePost(req.params.id, ownerId, body);

		if (post.err) throw post.err;

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// delete post
router.delete("/:id", verifyToken, async (req, res) => {
	try {
		const post = await deletePost(req.params.id, req.body._owner);

		if (post.err) throw post.err;

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// create new post
router.post("/", verifyToken, async (req, res) => {
	try {
		const post = await createPost(req.body);

		if (post.err) throw post.err;

		res.status(201).json(post);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// upvote post
router.put("/:id/upvote", verifyToken, async (req, res) => {
	try {
		const post = await changePostRating(req.params.id, req.user.user_id, 1);

		if (post.err) throw post.err;

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// downvote post
router.put("/:id/downvote", verifyToken, async (req, res) => {
	try {
		const post = await changePostRating(req.params.id, req.user.user_id, -1);

		if (post.err) throw post.err;

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// unvote post
router.put("/:id/unvote", verifyToken, async (req, res) => {
	try {
		const post = await changePostRating(req.params.id, req.user.user_id, 0);

		if (post.err) throw post.err;

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

module.exports = {
	path: "/posts",
	router,
};
