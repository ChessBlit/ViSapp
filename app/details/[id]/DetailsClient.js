"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Calendar, AtSign } from "lucide-react";

const DetailsClient = ({ userString }) => {
	// Sample user data for demonstration
	const user = JSON.parse(userString)

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getInitials = (name) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 flex items-center">
			<div className="max-w-4xl mx-auto">
				{/* Header Section */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						User Details
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						View and manage user information
					</p>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
					{/* Profile Card */}
					<Card className="lg:col-span-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
						<CardHeader className="text-center pb-4">
							<div className="flex justify-center mb-4">
								<Avatar className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700">
									<AvatarImage
										src={user.avatar}
										alt={user.fullname}
									/>
									<AvatarFallback className="bg-blue-500 dark:bg-blue-600 text-white text-xl font-semibold">
										{getInitials(user.fullname)}
									</AvatarFallback>
								</Avatar>
							</div>
							<CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
								{user.fullname}
							</CardTitle>
							<div className="flex items-center justify-center gap-2 mt-2">
								<AtSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
								<span className="text-gray-600 dark:text-gray-400 font-medium">
									{user.username}
								</span>
							</div>
						</CardHeader>
					</Card>

					{/* Contact Information */}
					<Card className="lg:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
								<User className="w-5 h-5" />
								Contact Information
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Phone */}
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
										<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Phone Number
										</label>
									</div>
									<div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
										<span className="text-gray-900 dark:text-white font-medium">
											{user.phone}
										</span>
									</div>
								</div>

								{/* Username */}
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<AtSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
										<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Username
										</label>
									</div>
									<div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
										<span className="text-gray-900 dark:text-white font-medium">
											@{user.username}
										</span>
									</div>
								</div>
							</div>

							{/* Account Created */}
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
									<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Account Created
									</label>
								</div>
								<div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
									<span className="text-gray-900 dark:text-white font-medium">
										{formatDate(user.createdAt)}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

			</div>
		</div>
	);
};

export default DetailsClient;
