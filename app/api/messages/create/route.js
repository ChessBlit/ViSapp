import connectDB from "@/lib/mongodb";
import { Message } from "@/models/Message.model";
import { NextResponse } from "next/server";
import { Group } from "@/models/Group.model";
import { messageSchema } from "@/schemas/message.schema";
import { treeifyError } from "zod";
import { User } from "@/models/User.model";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function POST(req) {
	await connectDB();

	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!refreshToken)
		return NextResponse.json(
			{ success: false, message: "User not logged in" },
			{ status: 401 }
		);

	const parsed = messageSchema.safeParse(await req.json());
	if (!parsed.success)
		return NextResponse.json(
			{ success: false, message: treeifyError(parsed.error) },
			{ status: 400 }
		);

	const { to, content, group } = parsed.data;

	const user = await User.findOne({ refreshToken });
	if (!user)
		return NextResponse.json(
			{ success: false, message: "User not found" },
			{ status: 404 }
		);

	if (to) {
		let toUser = await User.findOne({ phone: to });

		if (!toUser && mongoose.Types.ObjectId.isValid(to)) {
			toUser = await User.findById(to);
		}

		if (!toUser) {
			return NextResponse.json(
				{
					success: false,
					message: "The user you sent a message to doesn't exist",
				},
				{ status: 404 }
			);
		}

		await Message.create({
			owner: user._id,
			content,
			to: toUser._id,
		});

	} else {
		if (!mongoose.Types.ObjectId.isValid(group)) {
			return NextResponse.json(
				{ success: false, message: "Invalid group ID" },
				{ status: 400 }
			);
		}

		const wholeGroup = await Group.findById(group);
		if (!wholeGroup)
			return NextResponse.json(
				{ success: false, message: "Group not found" },
				{ status: 404 }
			);

		const message = await Message.create({
			content,
			group,
			owner: user._id,
		});

		wholeGroup.messages.push(message._id);

		await wholeGroup.save();
	}

	return NextResponse.json(
		{ success: true, message: "Message sent successfully" },
		{ status: 200 }
	);
}
