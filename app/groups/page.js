"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const GroupPage = () => {
	const [groups, setGroups] = useState([]);

	async function fetchGroups() {
		const myHeaders = new Headers();

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
		};

		try {
			const response = await fetch(
				"/api/group/getGroups",
				requestOptions
			);
			const result = await response.json();
			setGroups(result.groups);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchGroups();
	}, []);

	return (
		<main className="py-20">
			{groups &&
				groups.map((group) => (
					<Link href={"/g/"+group._id} key={group._id}>
						<div >{group.name}</div>
					</Link>
				))}
		</main>
	);
};

export default GroupPage;
