"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoadOverlay() {
	const duration = 500;
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Hide the overlay after a brief moment to allow content to start loading
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, duration);

		return () => clearTimeout(timer);
	}, []);

	if (!isLoading) return null;

	return (
		<motion.div
			initial={{ opacity: 1 }}
			animate={{ opacity: 0 }}
			transition={{ duration: duration / 1000, ease: "easeOut" }}
			className="fixed inset-0 z-[100] bg-black pointer-events-none"
		/>
	);
}
