"use client";
import { useState } from "react";
import { Moon, Sun, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactSchema } from "@/schemas/contact.schema";
import Link from "next/link";

const Navbar = () => {
	const { setTheme } = useTheme();
	const [openDialog, setOpenDialog] = useState(null); // 'contact' | 'group' | null

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
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<nav className="flex z-50 fixed w-full justify-around backdrop-blur-sm dark:bg-slate-800/50 bg-white/50 py-3 items-center">
				<Link href="/">
				<div className="logo font-medium text-2xl">ViSapp</div>
				</Link>
				<div className="user flex gap-2">
					{/* Theme toggle */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
								<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
								<span className="sr-only">Toggle theme</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setTheme("light")}>
								Light
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTheme("system")}
							>
								System
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Add new button */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<Plus className="min-h-[1.3rem] min-w-[1.3rem]" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								onClick={() => setOpenDialog("contact")}
							>
								Contact
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setOpenDialog("group")}
							>
								Group
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>

			{/* Contact Dialog */}
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

			{/* Group Dialog */}
			<Dialog
				open={openDialog === "group"}
				onOpenChange={(v) => !v && setOpenDialog(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Group</DialogTitle>
						<DialogDescription>
							Enter group details
						</DialogDescription>
					</DialogHeader>
					<p className="text-sm text-muted-foreground">
						Coming soon...
					</p>
				</DialogContent>
			</Dialog>

		</>
	);
};

export default Navbar;
