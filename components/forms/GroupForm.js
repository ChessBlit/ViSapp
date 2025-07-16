"use client";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { groupSchema } from "@/schemas/group.schema";
import { toast } from "sonner";


const GroupForm = ({ openDialog, setOpenDialog }) => {
	const groupForm = useForm({
		resolver: zodResolver(groupSchema),
		defaultValues: {
			name: "",
		},
	});
	async function onGroupFormSubmit(values) {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify(values);

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		try {
			const response = await fetch("/api/group/create", requestOptions);
			const result = await response.json();
			toast("Group created successfully", {
				action: {
					label: "Check it Out!",
					onClick: () => (window.location.href = "/groups"),
				},
			});
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Dialog
			open={openDialog === "group"}
			onOpenChange={(v) => !v && setOpenDialog(null)}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Group</DialogTitle>
					<DialogDescription>Enter group details</DialogDescription>
				</DialogHeader>
				<Form {...groupForm}>
					<form
						onSubmit={groupForm.handleSubmit(onGroupFormSubmit)}
						className="space-y-8"
					>
						<FormField
							control={groupForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Group Name</FormLabel>
									<FormControl>
										<Input
											placeholder="VIHAAN DA GROUP"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button type="submit">Submit</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default GroupForm;
