"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/login.schema";

const LoginPage = () => {
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			usernameOrPhone: "",
			password: "",
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
			const response = await fetch("/api/users/login", requestOptions);
			const result = await response.json();
			if (!response.ok) {
				result.fields.map(field => {
					form.setError(field, {
						type: "server",
						message: result.message || "Something went wrong",
					});
				});
				return;
			} else {
				window.location.href = "/chats";
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-5xl grid md:grid-cols-2 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl transition-all">
				{/* Left Branding Panel */}
				<div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 text-white p-10">
					<div className="text-center space-y-4">
						<h2 className="text-4xl font-extrabold tracking-tight">
							Welcome Back
						</h2>
						<p className="text-lg text-blue-100">
							Log in to continue your journey with us.
						</p>
					</div>
				</div>

				{/* Right Form Panel */}
				<div className="p-8 sm:p-10">
					<div className="mb-8 text-center">
						<h1 className="text-3xl font-bold text-gray-800 dark:text-white">
							Login to Your Account
						</h1>
						<p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
							Enter your credentials to continue
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="usernameOrPhone"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm text-gray-700 dark:text-gray-300">
											Username or Phone
										</FormLabel>
										<FormControl>
											<Input
												className="w-full rounded-lg bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
												placeholder="VihaanBhai"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm text-gray-700 dark:text-gray-300">
											Password
										</FormLabel>
										<FormControl>
											<Input
												type="password"
												className="w-full rounded-lg bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
												placeholder="1234"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full rounded-lg py-2 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all"
							>
								Sign In
							</Button>
						</form>
					</Form>

					{/* Optional: extra options below form */}
					<div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
						Don&apos;t have an account?{" "}
						<a
							href="/sign-up"
							className="text-blue-600 hover:underline dark:text-blue-400"
						>
							Sign up
						</a>
					</div>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;
