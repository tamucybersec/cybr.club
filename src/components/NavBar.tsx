"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import { Button } from "./ui/button";
import Logo from "./Logo";

function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<motion.div
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 16, opacity: 1 }}
			transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
			className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
		>
			<Container>
				<div className="px-2 sm:px-4">
					<div className="flex justify-between items-center rounded-2xl px-6 py-3 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-[20px] border border-white/10 shadow-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-50 before:pointer-events-none">
						<div className="flex-1 flex items-center">
							<Link
								href="/"
								className="scale-90 sm:scale-100"
							>
								<Logo />
							</Link>

							{/* Desktop Navigation Links - Center */}
							<div className="hidden md:flex items-center justify-center flex-1 space-x-6 lg:space-x-10">
								<NavLink href="/about">About</NavLink>
								{/* <NavLink href="/events">Events</NavLink> */}
								<NavLink href="/partnership">
									Partnership
								</NavLink>
							</div>
						</div>

						{/* Desktop Join Button - Right */}
						<div className="hidden md:block">
							<Button
								asChild
								className="font-azonix px-5 py-2 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
								style={{ borderRadius: "10px" }}
							>
								<Link href="/join">Join</Link>
							</Button>
						</div>

						{/* Mobile Navigation */}
						<div className="flex items-center space-x-4 md:hidden">
							<Button
								asChild
								className="font-azonix px-4 py-2 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow transition-all duration-200 text-sm"
								style={{ borderRadius: "8px" }}
							>
								<Link href="/join">Join</Link>
							</Button>

							{/* Custom Two-Line Hamburger */}
							<button
								onClick={toggleMenu}
								className="relative w-8 h-8 flex items-center justify-center focus:outline-none group"
								aria-label="Toggle menu"
								type="button"
							>
								<div className="relative w-6 h-5">
									<span
										className={`absolute left-0 w-full h-0.5 bg-white/90 transition-all duration-300 ease-out ${
											isMenuOpen
												? "top-1/2 -translate-y-1/2 rotate-45"
												: "top-0.5"
										}`}
									/>
									<span
										className={`absolute left-0 w-full h-0.5 bg-white/90 transition-all duration-300 ease-out ${
											isMenuOpen
												? "opacity-0 -translate-x-4"
												: "top-1/2 -translate-y-1/2 opacity-100"
										}`}
									/>
									<span
										className={`absolute left-0 w-full h-0.5 bg-white/90 transition-all duration-300 ease-out ${
											isMenuOpen
												? "bottom-1/2 translate-y-1/2 -rotate-45"
												: "bottom-0.5"
										}`}
									/>
								</div>
							</button>
						</div>
					</div>

					{/* Mobile Menu */}
					<AnimatePresence>
						{isMenuOpen && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 8 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{
									duration: 0.2,
									ease: "easeInOut",
									staggerChildren: 0.05,
								}}
								className="md:hidden absolute left-4 right-4 z-40"
								onClick={toggleMenu}
							>
								<div
									className="mt-2 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-[20px] border border-white/10 p-4 space-y-3"
									onClick={(e) => e.stopPropagation()}
								>
									<MobileNavLink
										href="/about"
										onClick={toggleMenu}
									>
										About
									</MobileNavLink>
									{/* <MobileNavLink
										href="/events"
										onClick={toggleMenu}
									>
										Events
									</MobileNavLink> */}
									<MobileNavLink
										href="/partnership"
										onClick={toggleMenu}
									>
										Partnership
									</MobileNavLink>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</Container>
		</motion.div>
	);
}

function NavLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="relative group"
		>
			<span className="text-white/80 hover:text-white transition-colors duration-300 font-medium text-sm lg:text-base font-ubuntu">
				{children}
			</span>
			<motion.div
				className="absolute -bottom-1 left-0 h-0.5 bg-white"
				initial={{ width: 0 }}
				whileHover={{ width: "100%" }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			/>
		</Link>
	);
}

function MobileNavLink({
	href,
	children,
	onClick,
}: {
	href: string;
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, x: -10 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.2 }}
		>
			<Link
				href={href}
				onClick={onClick}
				className="block py-2.5 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-base font-medium"
			>
				{children}
			</Link>
		</motion.div>
	);
}

export default NavBar;
