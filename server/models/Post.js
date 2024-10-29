const { Schema, model, models } = require("mongoose");

const postSchema = new Schema(
	{
		_owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Post must have an owner."],
		},
		title: {
			type: String,
			required: [true, "Title is required."],
			trim: true,
			minLength: [
				3,
				"The title of the post must be at least 3 characters long.",
			],
		},
		content: {
			type: String,
			required: [true, "Content is required."],
			trim: true,
			minLength: [
				3,
				"The content of the post must be at least 3 characters long.",
			],
		},
		rating: {
			type: Number,
			default: 0,
		},
		_ratedBy: [
			{
				_user: {
					type: Schema.Types.ObjectId,
					ref: "User",
				},
				vote: {
					type: Number,
					default: 0,
				},
			},
		],
		_comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

const postModel = models["Post"] || model("Post", postSchema);

module.exports = postModel;
