"use client";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const LeaveDialog = ({ group }) => {
	const [openConfDeleteDialog, setOpenConfDeleteDialog] = useState(false);

	async function deleteGroup() {
		const myHeaders = new Headers();

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
		};

		try {
			const response = await fetch(
				"/api/group/delete/" + group._id,
				requestOptions
			);
			const result = await response.json();
			return result;
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<Dialog>
				<DialogTrigger asChild className={"w-full"}>
					<p>Delete Group</p>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Group?</DialogTitle>
						<DialogDescription>
							THIS ACTION CANNOT BE REDONE
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant={"outline"}>Cancel</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								variant={"destructive"}
								onClick={setOpenConfDeleteDialog}
							>
								Delete Group
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Dialog
				open={openConfDeleteDialog}
				onOpenChange={setOpenConfDeleteDialog}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely Sure?</DialogTitle>
						<DialogDescription>
							By deleting you understand the bad consequences that
							can happen
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant={"outline"}>Cancel</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								onClick={() => {
									toast.promise(deleteGroup, {
										loading: "Loading...",
										success: (data) => {
											return data.message;
										},
										error: (data)=> {return data.message},
									}); window.location.href="/groups"
								}}
								variant={"destructive"}
							>
								<Trash />
								Delete Group
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default LeaveDialog;
