"use client";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { inviteSchema } from "@/schemas/invite.schema";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const InviteForm = ({ groupId }) => {
	const [link, setLink] = useState();
	const form = useForm({
		resolver: zodResolver(inviteSchema),
		defaultValues: {
			groupId: groupId,
			phone: "",
		},
	});
	const [copied, setCopied] = useState(false);

	async function onSubmit(values) {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({ groupId: values.groupId });

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		try {
			setCopied(false);
			const response = await fetch(
				"http://localhost:3000/api/group/invite/" + values.phone,
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
			}
			setLink(
				`${process.env.NEXT_PUBLIC_HOST}/g/accept/${result.encodedURL}`
			);
		} catch (error) {
			console.error(error);
		}
	}

	async function handleCopy() {
		try {
			setCopied(true);
			await navigator.clipboard.writeText(link);
			setTimeout(() => {
				setCopied(false);
			}, 3000);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild className={"w-full"}>
				<p>Invite Users</p>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate an invition link</DialogTitle>
					<DialogDescription>Invite a person</DialogDescription>
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
											placeholder="+91 13246 12345"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Enter the phone number of the person
										whom you want to invite in this group.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
				{link && (
					<div className="flex flex-col justify-center gap-1">
						<div className="flex justify-center items-center gap-4">
							<Input readOnly value={link} className="w-full " />{" "}
							<span>
								<Copy
									className={`w-[1.2rem] h-[1.2rem] ${
										copied && "hidden"
									}`}
									onClick={handleCopy}
								/>
								<Check
									className={`${
										!copied && "hidden"
									} text-green-400 w-[1.2rem] h-[1.2rem]`}
								/>
							</span>
						</div>
						<p className="dark:text-gray-600 text-gray-500 text-sm">
							This link will expire in 1 hour
						</p>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default InviteForm;
