"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/signup.schema";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUpPage = () => {
	const form = useForm({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: "",
			phone: "",
			fullname: "",
			password: "",
		},
	});

	const createHeaders = () => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		return headers;
	};

	async function loginUser(phone, password) {
		try {
			const res = await fetch("/api/users/login", {
				method: "POST",
				headers: createHeaders(),
				body: JSON.stringify({ usernameOrPhone: phone, password }),
			});
			window.location.href = res.ok ? "/chats" : "/login";
		} catch {
			window.location.href = "/login";
		}
	}

	async function onSubmit(values) {
		try {
			const response = await fetch("/api/users/signup", {
				method: "POST",
				headers: createHeaders(),
				body: JSON.stringify(values),
			});
			const result = await response.json();

			if (!response.ok) {
				result.fields?.forEach((field) => {
					form.setError(field, {
						type: "server",
						message: result.message || "Something went wrong",
					});
				});
				return;
			}
			await loginUser(values.phone, values.password);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<main className="min-h-screen w-full bg-gray-100 dark:bg-gray-950 flex items-center justify-center overflow-hidden pt-14 px-4">
			<div className="w-full max-w-5xl h-full md:h-[86vh] grid md:grid-cols-2 md:bg-gray-200 bg-gray-100 dark:bg-gray-900 text-white md:rounded-2xl shadow-xl">
				{/* Left Panel */}

				<div className="hidden md:flex flex-col justify-center items-center rounded-l-2xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 p-8 text-center">
					<h2 className="text-4xl font-bold mb-2">
						Join the Family!
					</h2>
					<p className="text-base text-white/90 dark:text-white/80">
						Create your account and let's connect with everyone
					</p>
				</div>

				{/* Right Panel (Form) */}
				<div className="flex flex-col max-h-full overflow-y-auto px-6 sm:px-8 md:px-10 py-8 scroll-area transition-all">
					<style jsx global>{`


						.scroll-area::-webkit-scrollbar-thumb {
							background-color: #9ca3af;
							border-radius: 4px;
						}

						.scroll-area {
							scrollbar-width: thin;
							scrollbar-color: #9ca3af transparent;
						}

						/* Dark mode overrides */

						.dark .scroll-area:hover {
							scrollbar-color: #9ca3af transparent;
						}
					`}</style>

					<div className="max-w-md mx-auto w-full">
						<h1 className="text-2xl font-bold mb-6 text-center dark:text-white text-gray-700">
							Create a New Account
						</h1>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								{[
									{
										name: "username",
										label: "Username",
										placeholder: "vihiBhai",
										desc: "This will be your public username.",
										autoComplete: "username",
									},
									{
										name: "phone",
										label: "Phone",
										placeholder: "+91 54892 65468",
										desc: "Used to verify your identity.",
										autoComplete: "tel",
									},
									{
										name: "fullname",
										label: "Full Name",
										placeholder: "Vihaan Thakur",
										desc: "Your complete name.",
										autoComplete: "name",
									},
									{
										name: "password",
										label: "Password",
										placeholder: "Enter your password",
										desc: "Choose a strong password.",
										autoComplete: "new-password",
										type: "password",
									},
								].map(
									({
										name,
										label,
										placeholder,
										desc,
										autoComplete,
										type,
									}) => (
										<FormField
											key={name}
											control={form.control}
											name={name}
											render={({ field, fieldState }) => (
												<FormItem>
													<FormLabel
														className={
															fieldState.error
																? "text-red-500"
																: "dark:text-white text-gray-800"
														}
													>
														{label}
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															type={
																type || "text"
															}
															placeholder={
																placeholder
															}
															autoComplete={
																autoComplete
															}
															className={`bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 ${
																fieldState.error
																	? "border-red-500 ring-red-500 focus:ring-red-500"
																	: ""
															}`}
														/>
													</FormControl>
													<FormDescription className="text-xs text-gray-400 dark:text-gray-500">
														{desc}
													</FormDescription>
													<FormMessage className="text-red-500 mt-1 text-sm" />
												</FormItem>
											)}
										/>
									)
								)}

								<Button
									type="submit"
									className="w-full mt-2 rounded-lg py-2 bg-green-600 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600 transition-all"
								>
									Sign Up
								</Button>
							</form>
						</Form>

						<div className="mt-5 text-center text-sm text-gray-600 dark:text-gray-500">
							Already have an account?{" "}
							<a
								href="/login"
								className="text-green-500 hover:underline"
							>
								Sign in
							</a>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default SignUpPage;
