"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/schemas/message.schema";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const GroupClient = ({ userString, id }) => {
    const user = JSON.parse(userString)
	const [messages, setMessages] = useState([]);

	const form = useForm({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			content: "",
			group: id,
		},
	});

	async function fetchMessages() {
		const myHeaders = new Headers();

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
		};

		try {
			const response = await fetch(
				"/api/group/getAll/" + id,
				requestOptions
			);
			const result = await response.json();
			setMessages(result.messages);
		} catch (error) {
			console.error(error);
		}
	}

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
				"/api/messages/create/",
				requestOptions
			);
			const result = await response.json();
			console.log(result);
            form.setValue("content", "")
			fetchMessages();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchMessages();
	}, []);

	return (
		<main className="py-20">
            <Button>Invite</Button>
			{messages &&
				messages.map((message) => (
					<div key={message._id} className={`flex flex-col ${message.owner._id === user._id ? "items-start" : "items-end"}`}>
                        {console.log(message.owner._id, user._id)}
						<span className={`text-orange-600`}>
							{message.owner.fullname}{" "}
						</span>
						{message.content}
					</div>
				))}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Type a message"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</main>
	);
};

export default GroupClient;
