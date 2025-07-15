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

	console.log(username, phone, fullname, password);

	const doesUserExist = await User.findOne({
		$or: [{username}, {phone}]
	}).lean();

	if (doesUserExist) {
		return NextResponse.json(
			{ success: false, message: "User already exists" },
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
