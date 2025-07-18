"use client";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RemoveContactDialog from "../dialogs/RemoveContactDialog";

export default function ClientMenu({ user }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<MoreVertical className="w-5 h-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Link href={"/details/" + user._id} className="w-full h-full">Details</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className={"text-red-400"} onSelect={(e)=>e.preventDefault()}>
					<UserMinus className="text-red-400" />
					<RemoveContactDialog user={user._id} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
