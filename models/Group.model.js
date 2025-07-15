import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messages: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
        required: true,
        default: []
    },
    name: {
        type: String,
        required: true
    },
    members: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        default: []
    }

}, { timestamps: true });

export const Group =
	mongoose.models.Group || mongoose.model("Group", groupSchema);

