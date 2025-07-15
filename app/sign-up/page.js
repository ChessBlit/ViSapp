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
			const response = await fetch("/api/users/signup", requestOptions);
			const result = await response.json();
			if (!response.ok) {
				// Show server error on a specific field or globally
				result.fields.map(field => {
					form.setError(field, {
						type: "server",
						message: result.message || "Something went wrong",
					});
				});
				return;
			}
			try {
				const res = await fetch("/api/users/login", {
					method: "POST",
          headers: myHeaders,
          redirect: "follow",
					body: JSON.stringify({
						usernameOrPhone: values.phone,
            password: values.password
					}),
				});
        if (!res.ok) window.location.href("/login")
        else window.location.href("/chats")
			} catch {
        window.location.href = "/login"
      }
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<main className="py-17">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="vihiBhai" {...field} />
								</FormControl>
								<FormDescription>
									This is your public display username.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input
										placeholder="+91 54892 65468"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is your phone number
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="fullname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Vihaan Thakur"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your password"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is your secure password.
								</FormDescription>
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

export default SignUpPage;
