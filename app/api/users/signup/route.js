import { User } from "@/models/User.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { signUpSchema } from "@/schemas/signup.schema";
import { treeifyError } from "zod";

export async function POST(req) {
	await connectDB();
	const parsed = signUpSchema.safeParse(await req.json());

	if (!parsed.success) {
		return NextResponse.json(treeifyError(parsed.error), { status: 400 });
	}
	const { username, phone, fullname, password } = parsed.data;


	const doesUserExistByUsername = await User.findOne({
		username
	}).lean();
	const doesUserExistByPhone = await User.findOne({
		phone
	}).lean();

	if (doesUserExistByUsername) {
		return NextResponse.json(
			{ success: false, message: "User already exists", fields: ["username"] },
			{ status: 409 }
		);
	}
	if (doesUserExistByPhone) {
		return NextResponse.json(
			{ success: false, message: "User already exists", fields: ["phone"] },
			{ status: 409 }
		);
	}

	const user = await User.create({
		username,
		phone,
		fullname,
		password,
	});

	return NextResponse.json(
		{ user, message: "User registered successfully", success: true },
		{ status: 200 }
	);
}
