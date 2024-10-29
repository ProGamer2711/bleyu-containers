const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

async function getPosts(query = {}) {
	try {
		const count = await Post.countDocuments(query);

		const posts = await Post.find(query)
			.populate("_owner", ["username", "imageUrl"])
			.populate("_comments")
			.lean();

		return { count, posts };
	} catch (err) {
		return { err };
	}
}

async function updatePost(postId, userId, post) {
	try {
		// Verify ownership of post
		if (
			!(
				await Post.findById(postId).populate("_owner").lean()
			)._owner._id.equals(userId)
		) {
			throw new Error("You are not authorized to update this post.", 401);
		}

		const postToUpdate = await Post.findById(postId);

		if (!postToUpdate) {
			throw new Error("There is no such post with provided id.", 404);
		}

		const updatedPost = await Post.findByIdAndUpdate(postId, post, {
			new: true,
		});

		return updatedPost;
	} catch (err) {
		return { err };
	}
}

async function changePostRating(postId, userId, ratingChange) {
	try {
		const postToUpdate = await Post.findById(postId);

		if (!postToUpdate) {
			throw new Error("There is no such post with provided id.", 404);
		}

		const ratedBy = postToUpdate._ratedBy;

		// Check if user unvotes for post
		if (ratingChange === 0) {
			const rate = ratedBy.find(rate => rate._user.equals(userId));
			if (rate) {
				const newRatedBy = ratedBy.filter(rate => !rate._user.equals(userId));
				postToUpdate._ratedBy = newRatedBy;
				postToUpdate.rating -= rate.vote;

				await postToUpdate.save();

				return postToUpdate.toJSON();
			} else {
				throw new Error("You have not voted for this post yet.", 401);
			}
		}

		// Check if user has already voted for this post
		if (
			ratedBy.some(
				rate => rate._user.equals(userId) && rate.vote === ratingChange
			)
		) {
			throw new Error("You have already voted for this post.", 401);
		} else if (ratedBy.some(rate => rate._user.equals(userId))) {
			// Update _ratedBy array
			const updatedPost = await Post.findByIdAndUpdate(
				postId,
				{
					$inc: {
						rating: ratingChange * 2,
					},
					$set: {
						_ratedBy: ratedBy.map(rate => {
							if (rate._user.equals(userId)) {
								rate.vote = ratingChange;
							}
							return rate;
						}),
					},
				},
				{ new: true }
			);

			return updatedPost;
		} else {
			const updatedPost = await Post.findByIdAndUpdate(
				postId,
				{
					$inc: { rating: ratingChange },
					$push: { _ratedBy: { _user: userId, vote: ratingChange } },
				},
				{ new: true }
			);

			return updatedPost;
		}
	} catch (err) {
		return { err };
	}
}

async function deletePost(postId, userId) {
	try {
		// Verify ownership of post
		if (
			!(
				await Post.findById(postId).populate("_owner").lean()
			)._owner._id.equals(userId)
		) {
			throw new Error("You are not authorized to delete this post.", 401);
		}

		const postToDelete = await Post.findById(postId);

		if (!postToDelete) {
			throw new Error("There is no such post with provided id.", 404);
		}

		await Post.findByIdAndDelete(postId);

		// Remove post from user's posts
		await User.findByIdAndUpdate(postToDelete._owner, {
			$pull: { _posts: postId },
		});

		// Delete all comments from post
		await Comment.deleteMany({ _post: postId });

		return { message: "Post has been deleted." };
	} catch (err) {
		return { err };
	}
}

async function createPost(post) {
	try {
		const newPost = await new Post(post).save();

		// Add post to user's posts
		await User.findByIdAndUpdate(post._owner, {
			$push: { _posts: newPost._id },
		});

		return newPost.toJSON();
	} catch (err) {
		return { err };
	}
}

module.exports = {
	getPosts,
	updatePost,
	changePostRating,
	deletePost,
	createPost,
};
