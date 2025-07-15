import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Group } from "@/models/Group.model";
import { Message } from "@/models/Message.model";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { User } from "@/models/User.model";

export async function POST(_, { params }) {
	await connectDB();
	const groupId = (await params).id;
	if (!groupId)
		return NextResponse.json(
			{ success: false, message: "Group id is not given" },
			{ status: 400 }
		);
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
				message: "User not found or invalid refreshToken",
			},
			{ status: 404 }
		);

	if (!mongoose.Types.ObjectId.isValid(groupId))
		return NextResponse.json(
			{ success: false, message: "ObjectId is not valid" },
			{ status: 400 }
		);
	const group = await Group.findById(groupId);

	const isMember = group.members.includes(user._id);
	console.log(isMember);
	console.log(group.members);

	if (!isMember)
		return NextResponse.json(
			{
				success: false,
				message:
					"Unauthorized request, user is not a member of the group",
			},
			{ status: 401 }
		);

	if (!group)
		return NextResponse.json(
			{ success: false, message: "Group not found" },
			{ status: 404 }
		);

	const messages = await Message.find({ group: groupId }).lean();

	return NextResponse.json({ success: true, messages }, { status: 200 });
}
