import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { User } from "@/models/User.model";
import bcrypt from "bcryptjs";
import { Invite } from "@/models/Invite.model";
import { cookies } from "next/headers";
import { Group } from "@/models/Group.model";
import mongoose from "mongoose";

export async function POST(req, { params }) {
	await connectDB();
	const idOrUsername = (await params).idOrUsername;
	const { groupId } = await req.json();

	if (!mongoose.Types.ObjectId.isValid(groupId))
		return NextResponse.json(
			{ success: false, message: "Invalid objectID" },
			{ status: 400 }
		);

	const group = await Group.findById(groupId);
	if (!group)
		return NextResponse.json(
			{ success: false, message: "Group not found" },
			{ status: 404 }
		);

	const refreshToken = (await cookies()).get("refreshToken")?.value;

	if (!refreshToken)
		return NextResponse.json(
			{ success: false, message: "User is not logged in" },
			{ status: 401 }
		);

	const user = await User.findOne({ refreshToken }).lean();

	if (!idOrUsername)
		return NextResponse.json(
			{ success: false, message: "id or username not given" },
			{ status: 400 }
		);

	const inviteUser = await User.findOne({
		username: idOrUsername,
	});

	if (!inviteUser)
		return NextResponse.json(
			{
				success: true,
				message: "The user you are inviting is not found",
			},
			{ status: 404 }
		);

	const inviteURL = await bcrypt.hash(inviteUser._id.toString(), 10);

	const invite = await Invite.create({
		url: inviteURL,
		invitedId: inviteUser._id,
		invitedBy: user._id,
		invitedToGroup: group._id,
	});

	return NextResponse.json(
		{
			success: true,
			message: "Invite url generated successfully",
			inviteUrl: invite,
			encodedURL: encodeURIComponent(invite.url)
		},
		{ status: 200 }
	);
}
