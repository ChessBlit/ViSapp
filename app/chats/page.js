"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MessageCircle, Search, Users, ChevronRight } from "lucide-react";

const page = () => {
	const [contacts, setContacts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredContacts, setFilteredContacts] = useState([]);

	async function fetchContacts() {
		const myHeaders = new Headers();

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
		};

		try {
			const response = await fetch(
				"/api/contacts/getContacts",
				requestOptions
			);
			const result = await response.json();
			setContacts(result.contacts);
			setFilteredContacts(result.contacts);
			return result;
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchContacts();
	}, []);

	useEffect(() => {
		const filtered = contacts.filter(
			(contact) =>
				contact.fullname
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				contact.username
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
		);
		setFilteredContacts(filtered);
	}, [searchTerm, contacts]);

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-15">
			{/* Header */}
			<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-6 shadow-sm">
				<div className="max-w-4xl mx-auto">
					<div className="flex items-center space-x-3 mb-4">
						<div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-xl">
							<Users className="w-6 h-6 text-white" />
						</div>
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
								Contacts
							</h1>
							<p className="text-gray-500 dark:text-gray-400 text-sm">
								{filteredContacts.length}{" "}
								{filteredContacts.length === 1
									? "contact"
									: "contacts"}{" "}
								available
							</p>
						</div>
						<div className="flex justify-end w-full">
							<Link
								href={"/groups"}
								className="rounded-full p-2 bg-blue-600 text-white"
							>
								<Users className="w-6 h-6 text-white" />
							</Link>
						</div>
					</div>

					{/* Search Bar */}
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
						<input
							type="text"
							placeholder="Search contacts..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-all duration-200 shadow-sm"
						/>
					</div>
				</div>
			</div>

			{/* Contacts List */}
			<div className="px-4 sm:px-6 py-6 max-[400px]:flex justify-center items-center">
				<div className="max-w-4xl mx-auto">
					{filteredContacts.length === 0 ? (
						<div className="text-center py-12">
							<div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
								<Users className="w-8 h-8 text-gray-400 dark:text-gray-500" />
							</div>
							<h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
								{searchTerm
									? "No contacts found"
									: "No contacts yet"}
							</h3>
							<p className="text-gray-500 dark:text-gray-400">
								{searchTerm
									? "Try adjusting your search terms"
									: "Your contacts will appear here"}
							</p>
						</div>
					) : (
						<div className="grid gap-3 sm:gap-4">
							{filteredContacts.map((contact) => (
								<Link
									key={contact._id}
									href={"/chat/" + contact._id}
								>
									<div className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
										{/* Contact Info */}
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-4">
												{/* Avatar */}
												<div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full flex items-center justify-center shadow-lg">
													<span className="text-white font-bold text-lg sm:text-xl">
														{contact.fullname
															.charAt(0)
															.toUpperCase()}
													</span>
												</div>

												{/* Contact Details */}
												<div className="flex-1 min-w-0">
													<h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white truncate">
														{contact.fullname}
													</h3>
													<p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base truncate">
														@{contact.username}
													</p>
												</div>
											</div>

											{/* Action Indicators */}
											<div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
												<div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
													<MessageCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />
												</div>
												<ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
											</div>
										</div>

										{/* Hover Glow Effect */}
										<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default page;
