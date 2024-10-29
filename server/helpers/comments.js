const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

async function getComments(query = {}) {
	try {
		const count = await Comment.countDocuments(query);

		const comments = await Comment.find(query)
			.populate("_owner", ["username", "imageUrl"])
			.populate("_post", ["title", "rating"])
			.lean();

		return { count, comments };
	} catch (err) {
		return { err };
	}
}

async function updateComment(commentId, comment) {
	try {
		// Verify ownership of comment
		if (
			!(
				await Comment.findById(commentId).populate("_owner").lean()
			)._owner._id.equals(comment._owner)
		) {
			throw new Error("You are not authorized to update this comment.", 401);
		}

		const commentToUpdate = await Comment.findById(commentId);

		if (!commentToUpdate) {
			throw new Error("There is no such comment with provided id.", 404);
		}

		const updatedComment = await Comment.findByIdAndUpdate(commentId, comment, {
			new: true,
		});

		return updatedComment;
	} catch (err) {
		return { err };
	}
}

async function changeCommentRating(commentId, userId, ratingChange) {
	try {
		const commentToUpdate = await Comment.findById(commentId);

		if (!commentToUpdate) {
			throw new Error("There is no such comment with provided id.", 404);
		}

		const ratedBy = commentToUpdate._ratedBy;

		// Check if user unvotes for comment
		if (ratingChange === 0) {
			const rate = ratedBy.find(rate => rate._user.equals(userId));
			if (rate) {
				const newRatedBy = ratedBy.filter(rate => !rate._user.equals(userId));
				commentToUpdate._ratedBy = newRatedBy;
				commentToUpdate.rating -= rate.vote;

				await commentToUpdate.save();

				return commentToUpdate.toJSON();
			} else {
				throw new Error("You have not voted for this comment yet.", 401);
			}
		}

		// Check if user has already voted for this comment
		if (
			ratedBy.some(
				rate => rate._user.equals(userId) && rate.vote === ratingChange
			)
		) {
			throw new Error("You have already voted for this comment.", 401);
		} else if (ratedBy.some(rate => rate._user.equals(userId))) {
			// Update _ratedBy array
			const updatedComment = await Comment.findByIdAndUpdate(
				commentId,
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

			return updatedComment;
		} else {
			const updatedComment = await Comment.findByIdAndUpdate(
				commentId,
				{
					$inc: { rating: ratingChange },
					$push: { _ratedBy: { _user: userId, vote: ratingChange } },
				},
				{ new: true }
			);

			return updatedComment;
		}
	} catch (err) {
		return { err };
	}
}

async function deleteComment(commentId, userId) {
	try {
		// Verify ownership of comment
		if (
			!(
				await Comment.findById(commentId).populate("_owner").lean()
			)._owner._id.equals(userId)
		) {
			throw new Error("You are not authorized to delete this comment.", 401);
		}

		const commentToDelete = await Comment.findById(commentId);

		if (!commentToDelete) {
			throw new Error("There is no such comment with provided id.", 404);
		}

		await Comment.findByIdAndDelete(commentId);

		// Remove comment from post's comments
		await Post.findByIdAndUpdate(commentToDelete._post, {
			$pull: { _comments: commentId },
		});

		// Remove comment from user's comments
		await User.findByIdAndUpdate(commentToDelete._owner, {
			$pull: { _comments: commentId },
		});

		return { message: "Comment has been deleted." };
	} catch (err) {
		return { err };
	}
}

async function createComment(comment) {
	try {
		const newComment = await new Comment(comment).save();

		// Add comment to post's comments
		await Post.findByIdAndUpdate(comment._post, {
			$push: { _comments: newComment._id },
		});

		// Add comment to user's comments
		await User.findByIdAndUpdate(comment._owner, {
			$push: { _comments: newComment._id },
		});

		return newComment.toJSON();
	} catch (err) {
		return { err };
	}
}

module.exports = {
	getComments,
	updateComment,
	changeCommentRating,
	deleteComment,
	createComment,
};
