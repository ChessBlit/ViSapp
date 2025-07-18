"use client"
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2, CheckCircle } from "lucide-react";

const AcceptClient = ({ url }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	
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
					setIsLoading(false);
					return;
				}
				// Show success briefly before redirect
				setIsLoading(false);
				setTimeout(() => {
					window.location.href = `/g/${result.redirectURL}`
				}, 1000);
			} catch (error) {
				console.error(error);
				setError("An unexpected error occurred. Please try again.");
				setIsLoading(false);
			}
		})();
	}, [url]);

	return (
		<main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 flex items-center">
			<div className="max-w-md mx-auto">
				{isLoading && (
					<div className="text-center">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
							<Loader2 className="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto mb-4 animate-spin" />
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								Processing Invite
							</h2>
							<p className="text-gray-600 dark:text-gray-400">
								Please wait while we accept your group invitation...
							</p>
						</div>
					</div>
				)}

				{!isLoading && !error && (
					<div className="text-center">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
							<CheckCircle className="w-12 h-12 text-green-500 dark:text-green-400 mx-auto mb-4" />
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								Invitation Accepted!
							</h2>
							<p className="text-gray-600 dark:text-gray-400">
								Redirecting you to the group...
							</p>
						</div>
					</div>
				)}

				{error && (
					<div className="space-y-4">
						<Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
							<AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
							<AlertDescription className="text-red-800 dark:text-red-200 font-medium">
								{error}
							</AlertDescription>
						</Alert>
						
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
								What can you do?
							</h3>
							<ul className="space-y-2 text-gray-600 dark:text-gray-400">
								<li className="flex items-start gap-2">
									<span className="text-blue-500 dark:text-blue-400">•</span>
									<span>Check if the invitation link is correct</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-blue-500 dark:text-blue-400">•</span>
									<span>Make sure you&apos;re logged in to your account</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-blue-500 dark:text-blue-400">•</span>
									<span>Contact the group admin for a new invitation</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-blue-500 dark:text-blue-400">•</span>
									<span>Try refreshing the page</span>
								</li>
							</ul>
							<button 
								onClick={() => window.location.reload()}
								className="mt-4 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
							>
								Try Again
							</button>
						</div>
					</div>
				)}
			</div>
		</main>
	);
};

export default AcceptClient;