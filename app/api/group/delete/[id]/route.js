import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Message } from "@/models/Message.model";

export async function POST(_, { params }) {
    await connectDB();
    const groupId = (await params).id
    if (!groupId) return NextResponse.json({success: false, message: "Group id is required"}, {status: 400});
    const refreshToken = (await cookies()).get("refreshToken")?.value
    if (!refreshToken) return NextResponse.json({success: false, message: "User not logged in"}, {status: 401});

    
    const group = await Group.findById(groupId);
    if (!group) return NextResponse.json({success: false, message: "Group not found"}, {status: 404});

    const user = await User.findOne({refreshToken})
    
    if (!user) return NextResponse.json({success: false, message: "User not found"}, {status: 404});
    if (!group.owner.equals(user._id)) return NextResponse.json({success: false, message: "Only the admin can delete the group"}, {status: 401});

    await Group.deleteOne({_id: group._id})
    await Message.deleteMany({
        group: group._id
    })

    return NextResponse.json({success: true, message: "Group deleted successfully"}, {status: 200})
    
    
}
