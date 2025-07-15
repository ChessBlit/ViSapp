import mongoose, { Schema } from "mongoose";

const inviteSchema = new Schema({
	url: {
		type: String,
		required: true,
	},
	invitedId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	isAccepted: {
		type: Boolean,
		required: true,
		default: false,
	},
	invitedBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	invitedToGroup: {
		type: Schema.Types.ObjectId,
		ref: "Group",
		required: true,
	},
	expire: {
		type: Date,
		default: Date.now,
		expires: 3600,
	},
});

export const Invite =
	mongoose.models.Invite || mongoose.model("Invite", inviteSchema);
