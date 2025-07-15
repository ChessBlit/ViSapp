import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		fullname: {
			type: String,
			required: true,
		},
		messages: {
			required: true,
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
			default: [],
		},
		recievedMessages: {
			required: true,
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
			default: [],
		},
		phone: {
			type: String,
			unique: true,
			required: true,
		},
		group: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Group",
		},
		password: {
			type: String,
			required: true,
		},
		refreshToken: {
            type: String,
            index: true
        }
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
			fullname: this.fullName,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
			fullname: this.fullName,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
