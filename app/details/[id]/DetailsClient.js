"use client";
import React from "react";

const DetailsClient = ({ userString }) => {
	const user = JSON.parse(userString);
	return (
		<div className="py-20">
			{user.fullname}
			<br />@{user.username}
			<br />
			{user.phone}
			<br />
			{user.createdAt} {/* This is a JS Date */}
		</div>
	);
};

export default DetailsClient;
