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
import { toast } from "sonner";
import { Button } from "../ui/button";
import { UserMinus } from "lucide-react";

const RemoveContactDialog = ({ user }) => {
	async function removeContact() {
		const myHeaders = new Headers();

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
		};

		try {
			const response = await fetch(
				"/api/contacts/remove/" + user,
				requestOptions
			);
			const result = await response.json();
			return result;
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Dialog>
			<DialogTrigger>Remove Contact</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will remove this
						contact your account
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"outline"}>Cancel</Button>
					</DialogClose>
					<Button
						variant={"destructive"}
						onClick={()=>{toast.promise(removeContact, {
							loading: "Loading...",
							success: (data) => {
								return data.message;
							},
							error: (data) => {
								return data.message;
							},
						}); window.location.href = "/chats"}}
					>
						<UserMinus /> Remove Contact
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default RemoveContactDialog;
