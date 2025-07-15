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

	const idOrUsername = (await params)?.idOrUsername;
	const { groupId } = await req.json();

	// Validate groupId
	if (!mongoose.Types.ObjectId.isValid(groupId)) {
		return NextResponse.json(
			{ success: false, message: "Invalid group ID" },
			{ status: 400 }
		);
	}

	// Check group existence
	const group = await Group.findById(groupId);
	if (!group) {
		return NextResponse.json(
			{ success: false, message: "Group not found" },
			{ status: 404 }
		);
	}

	// Check logged-in user
	const refreshToken = cookies().get("refreshToken")?.value;
	if (!refreshToken) {
		return NextResponse.json(
			{ success: false, message: "User is not logged in" },
			{ status: 401 }
		);
	}

	const user = await User.findOne({ refreshToken }).lean();
	if (!user) {
		return NextResponse.json(
			{ success: false, message: "User not found" },
			{ status: 404 }
		);
	}

	if (!group.members.includes(user._id)) return NextResponse.json({success: false, message: "User not is group. You need to be in the group to make an invitaion link"}, {status: 401})

	// Validate input
	if (!idOrUsername) {
		return NextResponse.json(
			{ success: false, message: "id or username not provided" },
			{ status: 400 }
		);
	}

	// Safe handling for ID or username
	const isValidObjectId = mongoose.Types.ObjectId.isValid(idOrUsername);
	const inviteUser = await User.findOne({
		$or: [
			{ username: idOrUsername },
			...(isValidObjectId
				? [{ _id: new mongoose.Types.ObjectId(idOrUsername) }]
				: []),
		],
	});

	if (!inviteUser) {
		return NextResponse.json(
			{
				success: false,
				message: "The user you are inviting was not found",
			},
			{ status: 404 }
		);
	}

	// Generate invite URL
	const inviteURL = await bcrypt.hash(inviteUser._id.toString(), 10);

	// Create Invite
	const invite = await Invite.create({
		url: inviteURL,
		invitedId: inviteUser._id,
		invitedBy: user._id,
		invitedToGroup: group._id,
	});

	// Send response
	return NextResponse.json(
		{
			success: true,
			message: "Invite URL generated successfully",
			inviteUrl: invite,
			encodedURL: encodeURIComponent(invite.url),
		},
		{ status: 200 }
	);
}
