import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User.model";

export async function POST() {
	await connectDB();
	const cookieMonster = await cookies();
	const refreshToken = cookieMonster.get("refreshToken")?.value;

	if (!refreshToken)
		return NextResponse.json(
			{ error: true, message: "User already logged out" },
			{ status: 400 }
		);

	const user = await User.findOne({ refreshToken });
	user.refreshToken = undefined;
	await user.save({ validiateBeforeSave: false });


	cookieMonster.delete("refreshToken");
	cookieMonster.delete("accessToken");

	return NextResponse.json(
		{ success: true, message: "User logged out successfully" },
		{ status: 200 }
	);
}
