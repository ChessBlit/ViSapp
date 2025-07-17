import { cookies } from "next/headers";
import GroupClient from "./groupClient"
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User.model";
import { Group } from "@/models/Group.model";
import { notFound } from "next/navigation";



const page = async ({params}) => {
    const id = (await params).id;
    const refreshToken = (await cookies()).get("refreshToken")?.value
    if (!refreshToken) window.location.href = "/sign-up"

    await connectDB();
    const user = await User.findOne({refreshToken}).lean()
    const group = await Group.findById(id)
    if (!group) return notFound();

    if (!group.members.includes(user._id)) return notFound()


    return <GroupClient userString={JSON.stringify(user)} groupString={JSON.stringify(group)} />

}

export default page