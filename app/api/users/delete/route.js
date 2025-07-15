import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { User } from "@/models/User.model";
import { cookies } from "next/headers";

export async function POST(req) {
	await connectDB();
	const cookieMonster = await cookies();
	const refreshToken = cookieMonster.get("refreshToken")?.value;

	if (!refreshToken)
		return NextResponse.json(
			{ success: false, message: "User not logged in" },
			{ status: 400 }
		);

	const user = await User.findOne({ refreshToken });
	if (!user)
		return NextResponse.json(
			{ success: false, message: "User not found" },
			{ status: 404 }
		);

	await User.deleteOne({ _id: user._id });

    cookieMonster.delete("refreshToken")
    cookieMonster.delete("accessToken")

	return NextResponse.json(
		{ success: true, message: "User deleted successfully" },
		{ status: 200 }
	);
}
