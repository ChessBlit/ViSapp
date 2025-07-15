import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		group: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Group",
		},
		to: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export const Message =
	mongoose.models.Message || mongoose.model("Message", messageSchema);
