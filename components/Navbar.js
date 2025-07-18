"use client";
import { Moon, Sun, Plus, User, LogOut, Trash } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ContactForm from "./forms/ContactForm";
import { useState } from "react";
import GroupForm from "./forms/GroupForm";
import DeleteAccountDialog from "./dialogs/DeleteAccountDialog";

const Navbar = () => {
	const { setTheme } = useTheme();
	const [openDialog, setOpenDialog] = useState(null); // 'contact' | 'group' | null

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

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<User className="min-h-[1.3rem] min-w-[1.3rem]" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								asChild
								onClick={() => setOpenDialog("contact")}
							>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<DropdownMenuItem>
											<Plus />
											<p>New</p>
										</DropdownMenuItem>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem
											onClick={() =>
												setOpenDialog("contact")
											}
										>
											Contact
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												setOpenDialog("group")
											}
										>
											Group
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className={"text-red-400"}
								onClick={async () => {
									await fetch("/api/users/logout/", {
										method: "POST",
									});
									window.location.href = "/home";
								}}
							>
								<LogOut className="text-red-400" />
								Logout
							</DropdownMenuItem>
							<DropdownMenuItem
								className={"text-red-400"}
								onClick={(e) => e.preventDefault()}
							>
								<Trash className="text-red-400" />
								<DeleteAccountDialog />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>

			{/* Contact Dialog */}
			<ContactForm
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
			/>
			{/* Group Dialog */}
			<GroupForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
		</>
	);
};

export default Navbar;
