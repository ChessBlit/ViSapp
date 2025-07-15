import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { User } from "@/models/User.model";
import { cookies } from "next/headers";

export async function POST() {
	await connectDB();
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!refreshToken)
		return NextResponse.json(
			{ success: false, message: "User not logged in" },
			{ status: 401 }
		);

	const user = await User.findOne({ refreshToken }).populate({
		path: "contacts",
		select: "username fullname phone",
	}).lean();
	if (!user)
		return NextResponse.json(
			{ success: false, message: "User not found" },
			{ status: 404 }
		);

	const contacts = user.contacts;

	return NextResponse.json(
		{ success: true, message: "Contacts fetched successfully", contacts },
		{ status: 200 }
	);
}
