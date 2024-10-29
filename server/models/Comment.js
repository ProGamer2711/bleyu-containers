const { Schema, model, models } = require("mongoose");

const commentSchema = new Schema(
	{
		_owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		_post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
			minLength: [
				3,
				"The content of the comment must be at least 3 characters long.",
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
	},
	{ timestamps: true, versionKey: false }
);

const commentModel = models["Comment"] || model("Comment", commentSchema);

module.exports = commentModel;
