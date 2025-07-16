import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
	return (
		<main className="py-20">
			<Link href={"/login"}>
				<Button variant={"outline"}>Log in</Button>
			</Link>
			<Link href={"/sign-up"}>
				<Button >Sign up</Button>
			</Link>
		</main>
	);
};

export default Home;
