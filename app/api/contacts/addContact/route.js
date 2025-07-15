import connectDB from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { User } from "@/models/User.model";
import mongoose from "mongoose";

export async function POST(req) {
	await connectDB();
	const { phone } = await req.json();
	if (!phone)
		return NextResponse.json(
			{
				success: false,
				message: "Phone number is not given",
				fields: ["phone"],
			},
			{ status: 400 }
		);

	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!refreshToken)
		return NextResponse.json(
			{ success: false, message: "User not logged in" },
			{ status: 401 }
		);

	const OtherUser = await User.findOne({ phone });
	if (!OtherUser)
		return NextResponse.json(
			{
				success: false,
				message:
					"The User you were trying to add into your contacts was not found",

				fields: ["phone"],
			},
			{ status: 404 }
		);

	const user = await User.findOne({ refreshToken });

	if (!user)
		return NextResponse.json(
			{
				success: false,
				message: "User not found",
			},
			{ status: 404 }
		);

	if (user.contacts.includes(OtherUser._id))
		return NextResponse.json(
			{
				success: false,
				message: "Contact already exists",
				fields: ["phone"],
			},
			{ status: 400 }
		);
	user.contacts.push(OtherUser._id);
	await user.save();

	return NextResponse.json(
		{ success: true, message: "Contact added successfully" },
		{ status: 200 }
	);
}
