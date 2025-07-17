import connectDB from "@/lib/mongodb";
import ChatClient from "./ChatClient";
import { User } from "@/models/User.model";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export default async function ChatPage({ params }) {
	const chatId = (await params).id;
	const refreshToken = (await cookies()).get("refreshToken")?.value
	if (!refreshToken) window.location.href = "/sign-up"
	const currentUser = await User.findOne({refreshToken})
	if (!currentUser) return notFound()
	await connectDB();
    const user = await User.findById(chatId).lean()
	if (!currentUser.contacts.includes(user._id)) return notFound();

	return <ChatClient userString={JSON.stringify(user)} />;
}
