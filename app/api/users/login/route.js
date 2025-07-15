import connectDB from "@/lib/mongodb";
import { User } from "@/models/User.model";
import { loginSchema } from "@/schemas/login.schema";
import { NextResponse } from "next/server";
import { treeifyError } from "zod";

async function generateAccessAndRefreshTokens(id) {
	try {
		const user = await User.findById(id);
		const accessToken = await user.generateAccessToken();
		const refreshToken = await user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new Error(
			500,
			error.message ||
				"Something went wrong while generating access and refresh token"
		);
	}
}

export async function POST(req) {
	await connectDB();
	const parsed = loginSchema.safeParse(await req.json());

	if (!parsed.success)
		return NextResponse.json(
			{ success: false, message: treeifyError(parsed.error) },
			{ status: 400 }
		);

	const { usernameOrPhone, password } = parsed.data;

	const user = await User.findOne({
		$or: [{ username: usernameOrPhone }, { phone: usernameOrPhone }],
	});

	if (!user)
		return NextResponse.json(
			{ success: false, message: "User not found" },
			{ status: 404 }
		);

	const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
		user._id
	);

	const isPasswordCorrect = await user.isPasswordCorrect(password);

	if (!isPasswordCorrect)
		return NextResponse.json(
			{ success: false, message: "Invalid user credentials" },
			{ status: 401 }
		);

	const loggedInUser = await User.findById(user._id)
		.select("-password -refreshToken")
		.lean();

	const res = NextResponse.json(
		{
			success: true,
			message: "User logged in successfully",
			user: loggedInUser,
		},
		{ status: 200 }
	);

	res.cookies.set("accessToken", accessToken, {
		httpOnly: true,
		secure: true,
	});
	res.cookies.set("refreshToken", refreshToken, {
		httpOnly: true,
		secure: true,
	});

	return res;
}
