import connectDB from "@/lib/mongodb";
import DetailsClient from "./DetailsClient";
import { User } from "@/models/User.model";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

const DetailsPage = async ({ params }) => {
	await connectDB();
	const id = (await params).id;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	if (!refreshToken) window.location.href = "/sign-up";
	const currentUser = await User.findOne({ refreshToken });
	if (!mongoose.Types.ObjectId.isValid(id)) return notFound();
	const user = await User.findById(id).lean();
	if (!user) return notFound();
	if (!currentUser.contacts.includes(user._id)) return notFound();
	return <DetailsClient userString={JSON.stringify(user)} />;
};

export default DetailsPage;
