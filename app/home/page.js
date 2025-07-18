import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
	ArrowRight,
	Users,
	Shield,
	Zap,
	Star,
	Globe,
	ChevronDown,
} from "lucide-react";

const Home = () => {
	return (
		<main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			{/* Hero Section */}
			<section className="relative overflow-hidden min-h-screen flex items-center">
				{/* Background Pattern */}
				<div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

				{/* Content */}
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
					<div className="text-center">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-200 dark:border-blue-800">
							<Zap className="w-4 h-4" />
							<span>Welcome to the Future</span>
						</div>

						{/* Main Headline */}
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
							Connect, Free,{" "}
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
								Super Fast
							</span>
						</h1>

						{/* Subtitle */}
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
							Join thousands of users who are already building
							amazing things together. Start your journey today
							with our powerful platform designed for
							collaboration.
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
							<Link href={"/sign-up"}>
								<Button
									size="lg"
									className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
								>
									Get Started Free
									<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</Button>
							</Link>
							<Link href={"/login"}>
								<Button
									variant="outline"
									size="lg"
									className="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
								>
									Sign In
								</Button>
							</Link>
						</div>

						{/* Social Proof */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-600 dark:text-gray-400">
							<div className="flex items-center gap-2">
								<div className="flex -space-x-2">
									{[1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold"
										>
											{i}
										</div>
									))}
								</div>
								<span className="text-sm">
									10,000+ Active Users
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="flex text-yellow-400">
									{[1, 2, 3, 4, 5].map((i) => (
										<Star
											key={i}
											className="w-4 h-4 fill-current"
										/>
									))}
								</div>
								<span className="text-sm">4.9/5 Rating</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 min-h-[110vh] flex items-center">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Why Choose Our Platform?
						</h2>
						<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Discover the features that make us the preferred
							choice for teams worldwide
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Feature 1 */}
						<div className="group">
							<div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-blue-200 dark:border-blue-800">
								<div className="bg-blue-500 dark:bg-blue-400 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
									<Users className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
									Connect With Anyone
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Connect with anyone with a seamless expirience.
								</p>
							</div>
						</div>

						{/* Feature 2 */}
						<div className="group">
							<div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-purple-200 dark:border-purple-800">
								<div className="bg-purple-500 dark:bg-purple-400 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
									<Shield className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
									Enterprise Security
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Your data is protected with enterprise-grade
									security and compliance standards.
								</p>
							</div>
						</div>

						{/* Feature 3 */}
						<div className="group">
							<div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-green-200 dark:border-green-800">
								<div className="bg-green-500 dark:bg-green-400 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
									<Globe className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
									Global Reach
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Connect with users worldwide with our
									globally distributed infrastructure.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 min-h-screen flex items-center">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
						Ready to Get Started?
					</h2>
					<p className="text-xl text-blue-100 dark:text-blue-50 mb-8 max-w-2xl mx-auto">
						Join thousands of satisfied users and experience the
						difference today. No credit card required.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href={"/sign-up"}>
							<Button
								size="lg"
								className="bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
							>
								Start Free Trial
							</Button>
						</Link>
						<Link href={"/login"}>
							<Button
								variant="outline"
								size="lg"
								className="border-2 border-white dark:text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
							>
								Sign In
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Home;
