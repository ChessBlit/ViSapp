"use client";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

const ErrorDialog = ({ open, title, desc }) => {
	return (
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{desc}</DialogDescription>
				</DialogHeader>
			</DialogContent>
			<DialogFooter>
				<Button>Ok</Button>
			</DialogFooter>
		</Dialog>
	);
};

export default ErrorDialog;
