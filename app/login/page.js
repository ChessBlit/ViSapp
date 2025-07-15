"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
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
				window.location.href = "/chats"
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<main className="py-18">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="usernameOrPhone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username Or Phone</FormLabel>
								<FormControl>
									<Input
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
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="1234" {...field} />
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

export default LoginPage;
