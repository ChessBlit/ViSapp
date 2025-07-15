import connectDB from "@/lib/mongodb";
import { Message } from "@/models/Message.model";
import { NextResponse } from "next/server";
import { Group } from "@/models/Group.model";
import { messageSchema } from "@/schemas/message.schema";
import { treeifyError } from "zod";
import { User } from "@/models/User.model";
import { cookies } from "next/headers";

export async function POST(req) {
	await connectDB();
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	const parsed = messageSchema.safeParse(await req.json());
	if (!parsed.success)
		return NextResponse.json(
			{ error: false, message: treeifyError(parsed.error) },
			{ status: 400 }
		);

	const { to, content, group } = parsed.data;

	const user = await User.findOne({ refreshToken });
	console.log(user._id);
	if (to) {
		const toUser = await User.findById(to);
		if (!toUser)
			return NextResponse.json(
				{
					success: false,
					message: "The user you sent a message to doesn't exist",
				},
				{ status: 404 }
			);
		const message = await Message.create({
			owner: user._id,
			content,
			to: toUser._id,
		});
		user.messages.push(message._id);
		await user.save();
		toUser.recievedMessages.push(message._id);
		await toUser.save();
	} else {
		const wholeGroup = await Group.findById(group);
		if (!wholeGroup) return NextResponse.json({success: false, message: "Group not foun"}, {status: 404})
		const message = await Message.create({
			content,
			group,
			owner: user._id,
		});
		user.messages.push(message._id);
		await user.save();
		wholeGroup.messages.push(message._id);
		await wholeGroup.save();
	}

	return NextResponse.json(
		{ success: true, message: "Message sent successfully" },
		{ status: 200 }
	);
}
