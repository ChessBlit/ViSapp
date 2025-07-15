import connectDB from "@/lib/mongodb";
import ChatClient from "./ChatClient";
import { User } from "@/models/User.model";

export default async function ChatPage({ params }) {
	const chatId = (await params).id;
	await connectDB();
    const user = await User.findById(chatId)

	return <ChatClient userString={JSON.stringify(user)} />;
}
