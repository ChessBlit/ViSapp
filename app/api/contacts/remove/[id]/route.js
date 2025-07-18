import connectDB from "@/lib/mongodb";
import { User } from "@/models/User.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function POST(_, { params }) {
	await connectDB();
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!refreshToken)
		return NextResponse.json({
			success: false,
			message: "User is not logged in",
		}, {status: 401});
	const userId = (await params).id;
	if (!userId || !mongoose.Types.ObjectId.isValid(userId))
		return NextResponse.json({
			success: false,
			message: "Either user id is not given or it is invalid",
		}, {status: 400});

	const currentUser = await User.findOne({ refreshToken });
	if (!currentUser)
		return NextResponse.json({
			success: false,
			message: "Current user is not found",
		}, {status: 404});
	const toRemoveUser = await User.findById(userId);
	if (!toRemoveUser || !currentUser.contacts.includes(toRemoveUser._id))
		return NextResponse.json({
			success: false,
			message:
				"The User you want to remove from your contacts is not found",
		}, {status: 404});

	currentUser.contacts.pull(toRemoveUser._id);
	await currentUser.save();

	return NextResponse.json({
		success: false,
		message: "Removed user from contacts successfully",
	}, {status: 200});
}
