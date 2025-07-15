import connectDB from "@/lib/mongodb";
import { User } from "@/models/User.model";
import { Group } from "@/models/Group.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(_, { params }) {
	await connectDB();
	const id = (await params).id;
	const refreshToken = (await cookies()).get("refreshToken")?.value;

	if (!mongoose.Types.ObjectId.isValid(id))
		return NextResponse.json(
			{ success: false, message: "Invalid ObjectID" },
			{ status: 401 }
		);

	if (!refreshToken)
		return NextResponse.json(
			{
				success: false,
				message: "User must be logged in to leave a group",
			},
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

	const group = await Group.findById(id);
	if (!group)
		return NextResponse.json(
			{ success: false, message: "Group not found" },
			{ status: 404 }
		);

	if (!group.members.includes(user._id))
		return NextResponse.json(
			{
				success: false,
				message: "User is already not a member of the group",
			},
			{ status: 400 }
		);
	if (group.owner.equals(user._id))
		return NextResponse.json(
			{ success: false, message: "The owner cannot leave the group" },
			{ status: 400 }
		);

	group.members.pull(user._id);
	await group.save();

	return NextResponse.json(
		{ success: true, message: "Removed User from group successfully" },
		{ status: 200 }
	);
}
