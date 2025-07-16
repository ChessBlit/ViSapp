import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";

export async function POST() {
    await connectDB();
    const refreshToken = (await cookies()).get("refreshToken")?.value

    if (!refreshToken) return NextResponse.json({success: false, message: "User not logged in"}, {status: 401});

    const user = await User.findOne({refreshToken}).lean()
    if (!user) return NextResponse.json({success: false, message: "User not found"}, {status: 404});

    const groups = await Group.find({members: user._id}).lean()

    return NextResponse.json({groups, success: true}, {status: 200})
}