"use client"
import React, { useEffect, useState } from "react";

const AcceptClient = ({ url }) => {
	const [error, setError] = useState(null);
	useEffect(() => {
		(async () => {
			const myHeaders = new Headers();

			const requestOptions = {
				method: "POST",
				headers: myHeaders,
				redirect: "follow",
			};

			try {
				const response = await fetch(
					"/api/group/acceptInvite/" + url,
					requestOptions
				);
				const result = await response.json();
				if (!response.ok){
					setError(result.message)
					return;
				}
				window.location.href = `/g/${result.redirectURL}`
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return <main className="py-20">{error && <div>{error}</div>}</main>;
};

export default AcceptClient;
