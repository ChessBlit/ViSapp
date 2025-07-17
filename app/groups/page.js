"use client";
import { useState, useEffect } from "react";
import { ChevronRight, MessageCircle, Search, User, Users } from "lucide-react";
import Link from "next/link";

const GroupsPage = () => {
	const [groups, setGroups] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

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

	const filteredGroups = groups.filter((group) =>
		group.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 sm:py-12 lg:py-15">
			{/* Header */}
			<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 md:px-6 py-4 sm:py-6 shadow-sm">
				<div className="max-w-4xl mx-auto">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
						<div className="flex items-center space-x-3">
							<div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-xl">
								<Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
							</div>
							<div>
								<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
									Groups
								</h1>
								<p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
									{filteredGroups.length}{" "}
									{filteredGroups.length === 1
										? "group"
										: "groups"}{" "}
									available
								</p>
							</div>
						</div>
						<div className="flex justify-end sm:justify-start">
							<Link
								href={"/chats"}
								className="rounded-full p-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white"
							>
								<User className="w-5 h-5 text-white" />
							</Link>
						</div>
					</div>

					{/* Search Bar */}
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
						<input
							type="text"
							placeholder="Search groups..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-all duration-200 shadow-sm"
						/>
					</div>
				</div>
			</div>

			{/* Groups List */}
			<div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6">
				<div className="max-w-4xl mx-auto">
					{filteredGroups.length === 0 ? (
						<div className="text-center py-8 sm:py-12">
							<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
								<Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" />
							</div>
							<h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-white mb-2">
								{searchTerm
									? "No groups found"
									: "No groups yet"}
							</h3>
							<p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
								{searchTerm
									? "Try adjusting your search terms"
									: "Your groups will appear here"}
							</p>
						</div>
					) : (
						<div className="grid gap-2 sm:gap-3 md:gap-4">
							{filteredGroups.map((group) => (
								<Link key={group._id} href={"/g/" + group._id}>
									<div className="group relative bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 lg:p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-md transition-all duration-200 ]">
										{/* Group Info */}
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
												{/* Avatar */}
												<div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
													<span className="text-white font-bold text-sm sm:text-lg lg:text-xl">
														{group.name
															.charAt(0)
															.toUpperCase()}
													</span>
												</div>

												{/* Group Details */}
												<div className="flex-1 min-w-0">
													<h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 dark:text-white truncate">
														{group.name}
													</h3>
												</div>
											</div>

											{/* Action Indicators */}
											<div className="flex items-center space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
												<div className="p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
													<MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 dark:text-blue-400" />
												</div>
												<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
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

export default GroupsPage;