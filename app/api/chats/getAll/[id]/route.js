import { User } from "@/models/User.model";
import connectDB from "@/lib/mongodb";
import { Message } from "@/models/Message.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(_, { params }) {
	await connectDB();
	const otherUserId = (await params).id;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!refreshToken)
		return NextResponse.json(
			{ success: false, message: "User not logged in" },
			{ status: 401 }
		);

	const user = await User.findOne({ refreshToken });
	if (!user)
		return NextResponse.json(
			{
				success: false,
				message: "User not found or Invalid refresh token",
			},
			{ status: 404 }
		);
	const otherUser = await User.findById(otherUserId);

	if (!otherUser)
		return NextResponse.json(
			{
				success: false,
				message:
					"The user which you were trying to send a message to is not found",
			},
			{ status: 404 }
		);

	const othersMessages = await Message.find({
		to: user._id,
		owner: otherUser._id,
	}).lean();

	const myMessages = await Message.find({
		to: otherUser._id,
		owner: user._id,
	}).lean();

	const allMessages = [...othersMessages, ...myMessages].sort(
		(a, b) => new Date(a.createdAt) - new Date(b.createdAt) 
	);

	return NextResponse.json(
		{
			success: true,
			messages: allMessages,
			message: "Chat fetched successfully",
		},
		{ status: 200 }
	);
}
