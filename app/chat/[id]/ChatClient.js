"use client";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/schemas/message.schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { pusherClient } from "@/lib/pusherClient";
import { Send, User } from "lucide-react";
import Link from "next/link";

const ChatClient = ({ userString }) => {
	const [messages, setMessages] = useState([]);
	const user = JSON.parse(userString);
	const bottomRef = useRef(null);

	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			content: "",
			to: user._id,
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
				"/api/messages/create/",
				requestOptions
			);
			const result = await response.json();
			form.setValue("content", "");
			fetchMessages();
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchMessages() {
		const requestOptions = {
			method: "POST",
			redirect: "follow",
		};

		try {
			const response = await fetch(
				"/api/chats/getAll/" + user._id,
				requestOptions
			);
			const result = await response.json();
			setMessages(result.messages);
		} catch (error) {
			console.error(error);
		}
	}

	function scrollToBottom() {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}

	useEffect(() => {
		if (!user?._id) return;

		fetchMessages();

		const channel = pusherClient.subscribe("chat-channel");

		channel.bind("new-message", (data) => {
			if (!data?.message) return;
			setMessages((prev) => [...prev, data.message]);
		});

		return () => {
			pusherClient.unsubscribe("chat-channel");
		};
	}, []);
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<main className="min-h-screen pt-15 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
			{/* Header */}
			<div className="sticky top-0 z-50 bg-white dark:bg-gray-800 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 shadow-sm">
				<div className="max-w-5xl mx-auto flex items-center justify-between">
					<Link href={"/details/" + user._id} className="flex items-center space-x-3">
						<div className="p-2 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-xl shadow-lg">
							<User />
						</div>
						<div>
							<h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
								{user.fullname}
							</h1>
						</div>
					</Link>

				</div>
			</div>
			{/* Messages Container */}
			<div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-8">
				<div className="max-w-5xl mx-auto space-y-1 sm:space-y-2">
					{messages &&
						messages.map((message, index) => {
							const isCurrentUser = message.owner !== user._id;
							const isFirstInSequence =
								index === 0 ||
								messages[index - 1].owner !== message.owner;
							const isLastInSequence =
								index === messages.length - 1 ||
								messages[index + 1].owner !== message.owner;

							return (
								<div
									key={message._id}
									className={`flex ${
										isCurrentUser
											? "justify-start"
											: "justify-end"
									}`}
								>
									{/* Message Bubble */}
									<div
										className={`relative px-4 sm:px-5 py-2.5 sm:py-3 max-w-xs sm:max-w-md lg:max-w-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
											isCurrentUser
												? `bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white ${
														isFirstInSequence &&
														isLastInSequence
															? "rounded-2xl"
															: isFirstInSequence
															? "rounded-2xl rounded-br-lg"
															: isLastInSequence
															? "rounded-2xl rounded-tr-lg"
															: "rounded-l-2xl rounded-r-lg"
												  }`
												: `bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 ${
														isFirstInSequence &&
														isLastInSequence
															? "rounded-2xl"
															: isFirstInSequence
															? "rounded-2xl rounded-bl-lg"
															: isLastInSequence
															? "rounded-2xl rounded-tl-lg"
															: "rounded-r-2xl rounded-l-lg"
												  }`
										} ${isFirstInSequence ? "mt-3" : ""}`}
									>
										{/* Sender Label */}
										{isFirstInSequence && (
											<div
												className={`text-xs font-medium mb-1 ${
													isCurrentUser
														? "text-blue-100 dark:text-blue-200"
														: "text-gray-500 dark:text-gray-400"
												}`}
											>
												{isCurrentUser
													? "You"
													: user.fullname}
											</div>
										)}

										{/* Message Content */}
										<p className="text-sm sm:text-base leading-relaxed break-words">
											{message.content}
										</p>

										{/* Timestamp */}
										<div
											className={`text-xs mt-1 ${
												isCurrentUser
													? "text-blue-100 dark:text-blue-200"
													: "text-gray-400 dark:text-gray-500"
											}`}
										>
											{new Date(
												message.createdAt
											).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>

			<div ref={bottomRef} className="mt-18" />
			{/* Input Form */}
			<div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 sm:py-6 shadow-lg fixed bottom-0 w-full">
				<div className="max-w-5xl mx-auto">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex items-end space-x-3 sm:space-x-4"
						>
							<FormField
								control={form.control}
								name="content"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<div className="relative">
												<Input
													{...field}
													placeholder="Type your message..."
													className="pr-4 py-3 sm:py-4 text-sm sm:text-base bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-all duration-200 shadow-sm"
													onKeyPress={(e) => {
														if (
															e.key === "Enter" &&
															!e.shiftKey
														) {
															e.preventDefault();
															form.handleSubmit(
																onSubmit
															)();
														}
													}}
												/>
											</div>
										</FormControl>
										<FormMessage className="text-xs sm:text-sm mt-1" />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								size="sm"
								className="px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
								disabled={!form.watch("content")?.trim()}
							>
								<Send className="w-4 h-4 sm:w-5 sm:h-5" />
								<span className="sr-only">Send message</span>
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</main>
	);
};

export default ChatClient;
