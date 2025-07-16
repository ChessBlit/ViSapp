"use client";
import { contactSchema } from "@/schemas/contact.schema";
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

const ContactForm = ({ openDialog, setOpenDialog }) => {
	const form = useForm({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			phone: "",
		},
	});

	async function onSubmit(values) {
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
			const response = await fetch(
				"/api/contacts/addContact",
				requestOptions
			);
			const result = await response.json();
			if (!response.ok) {
				result.fields.map((field) => {
					form.setError(field, {
						type: "server",
						message: result.message || "Something went wrong",
					});
				});
				return;
			}
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<Dialog
			open={openDialog === "contact"}
			onOpenChange={(v) => !v && setOpenDialog(null)}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Enter Contact Phone Number</DialogTitle>
					<DialogDescription>Add a contact</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input
											placeholder="+91 12345 67890"
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

export default ContactForm;
