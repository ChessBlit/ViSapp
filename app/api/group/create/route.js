import connectDB from "@/lib/mongodb";
import { User } from "@/models/User.model";
import { groupSchema } from "@/schemas/group.schema";
import { cookies } from "next/headers";
import { Group } from "@/models/Group.model";
import { NextResponse } from "next/server";

export async function POST(req) {
	await connectDB();
	const { name } = await req.json();
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!refreshToken)
		return NextResponse.json(
			{ success: false, message: "User is not logged in" },
			{ status: 401 }
		);
	const parsed = groupSchema.safeParse({ name });

	const user = await User.findOne({ refreshToken });
	if (!parsed.success)
		return NextResponse(
			{ success: false, message: "Group name is required" },
			{ status: 400 }
		);

	const groupCreated = await Group.create({
		owner: user._id,
		name,
	});

	groupCreated.members.push(user._id)

	if (!groupCreated)
		return NextResponse.json(
			{ success: false, message: "Couldn't create group" },
			{ status: 500 }
		);

	return NextResponse.json(
		{ success: true, message: "Group created successfully" },
		{ status: 200 }
	);
}
