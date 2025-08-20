"use client";

import Container from "@/components/Container";
import { motion, type Variants } from "framer-motion";

function NoBarriersSection() {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: [0.25, 0.1, 0.25, 1],
			},
		},
	};

	return (
		<Container className="py-16 sm:py-20 lg:py-24">
			<motion.div
				className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1, margin: "100px" }}
			>
				{/* Left side - No payment, no prereqs, no pressure */}
				<motion.div
					className="flex items-center gap-4 sm:gap-6 lg:gap-8 justify-center lg:justify-start w-full lg:w-auto"
					variants={itemVariants}
				>
					{/* Vertical line */}
					<div className="w-0.5 h-20 sm:h-24 lg:h-32 bg-white/40"></div>

					{/* Text content */}
					<div className="font-azonix text-hero-heading leading-[0.85] text-left">
						<div className="block">No payment,</div>
						<div className="block">no prereqs,</div>
						<div className="block">no pressure.</div>
					</div>
				</motion.div>

				{/* Right side - Description */}
				<motion.div
					className="flex-1 max-w-3xl text-center lg:text-left"
					variants={itemVariants}
				>
					<div className="font-ubuntu-sans pb-5 text-[#AAAAAA] leading-snug px-4 sm:px-0 text-hero-subtext">
						<div className="space-y-1 sm:space-y-2 max-w-md">
							Come to any meetings you want, whenever it works for
							you. There are no club fees, no prerequisites, and
							no pressure to make every meeting. Just show up when
							you&apos;re interested.
						</div>
					</div>
				</motion.div>
			</motion.div>
		</Container>
	);
}

export default NoBarriersSection;
