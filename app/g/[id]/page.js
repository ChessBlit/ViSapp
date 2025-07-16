import { cookies } from "next/headers";
import GroupClient from "./groupClient"
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User.model";



const page = async ({params}) => {
    const id = (await params).id;
    const refreshToken = (await cookies()).get("refreshToken")?.value
    if (!refreshToken) window.location.href = "/login"

    await connectDB();
    const user = await User.findOne({refreshToken}).lean()

    return <GroupClient userString={JSON.stringify(user)} id={id} />

}

export default page