"use client";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { MoreVertical, UserPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import InviteForm from "@/components/forms/InviteForm";
import { toast } from "sonner";

export default function Menu({ id }) {
	const [open, setOpen] = useState(false);

	async function leaveGroup() {
		const myHeaders = new Headers();

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
		};

		try {
			const response = await fetch(
				"/api/group/leave/" + id,
				requestOptions
			);
			const result = await response.json();
			if (!response.ok) {
				toast.error(result.message);
			}
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
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

				<DropdownMenuContent align="end" className="w-48">
					<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
						<UserPlus className="w-4 h-4 mr-2" />
						<InviteForm groupId={id} />
					</DropdownMenuItem>
					<DropdownMenuSeparator />

					<DropdownMenuItem
						onSelect={(e) => {
							e.preventDefault();
							setOpen(true); // open dialog manually
						}}
						className="text-red-400"
					>
						<LogOut className="w-4 h-4 mr-2 text-red-400" />
						Leave Group
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Leave Group</DialogTitle>
					</DialogHeader>
					<div>Are you sure you want to leave this group?</div>
					<DialogFooter>
						<Button variant="ghost" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={() => {
								leaveGroup();
								setOpen(false);
							}}
						>
							Leave
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
