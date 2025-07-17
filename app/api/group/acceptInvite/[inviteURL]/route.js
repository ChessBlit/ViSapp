import connectDB from "@/lib/mongodb";
import { User } from "@/models/User.model";
import { Invite } from "@/models/Invite.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Group } from "@/models/Group.model";

export async function POST(_, { params }) {
	await connectDB();
	const inviteURL = (await params).inviteURL;
	const refreshToken = (await cookies()).get("refreshToken")?.value;

	if (!refreshToken)
		return NextResponse.json(
			{ success: false, message: "Unauthorized request" },
			{ status: 401 }
		);

	const user = await User.findOne({ refreshToken });


	if (!user)
		return NextResponse.json(
			{
				success: false,
				message: "User not found or invalid refresh token",
			},
			{ status: 404 }
		);

	const invite = await Invite.findOne({ url: inviteURL });
	if (!invite)
		return NextResponse.json(
			{ success: false, message: "This url is expired or invalid" },
			{ status: 410 }
		);
	if (!invite.invitedId.equals(user._id))
		return NextResponse.json(
			{ success: false, message: "Unauthozied request" },
			{ status: 401 }
		);

    const group = await Group.findById(invite.invitedToGroup)

    if (!group) return NextResponse.json({success: false, mesage: "Group not found"}, {status: 404});
	
	const userAlreadyInGroup = await group.members.includes(user._id)
	if (userAlreadyInGroup) return NextResponse.json({success: false, message: "User already in group"}, {status: 409})
    
    group.members.push(user._id)
    await group.save()

    await Invite.deleteOne({url: inviteURL})

	return NextResponse.json(
		{ invite, success: true, message: "Invite accepted successfully", redirectURL: group._id },
		{ status: 200 }
	);
}
