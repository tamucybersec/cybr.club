"use client";

import Container from "@/components/Container";
import { photos } from "@/data/photos";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

function AboutLanding() {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
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
				duration: 0.6,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	};

	return (
		<Container className="mt-[15dvh] sm:mt-[20dvh] px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 lg:gap-12 max-w-7xl mx-auto">
				{/* Left side - SVG and Text */}
				<motion.div
					className="flex-1 max-w-2xl lg:pr-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* About Header SVG */}
					<motion.div
						className="mb-8 lg:mb-12 ml-0 sm:ml-0"
						variants={itemVariants}
					>
						<Image
							src="/images/app/AboutHeader.svg"
							alt="About Header"
							width={400}
							height={120}
							priority
							unoptimized
							className="w-auto h-auto max-w-[300px] sm:max-w-[400px]"
						/>
					</motion.div>

					{/* Paragraph Text */}
					<motion.p
						className="font-ubuntu-sans text-body-large leading-relaxed text-white/70"
						variants={itemVariants}
					>
						The Texas A&M Cybersecurity Club was founded on a spirit of generosity and mentorship for students interested in cybersecurity. Many of us found our start because someone took the time to help us, and we&apos;re proud to keep that tradition going by giving back to others in the same way.
					</motion.p>
				</motion.div>

				{/* Right side - Image Placeholder */}
				<motion.div
					className="flex-1 w-full max-w-2xl relative h-[400px] lg:h-[400px] xl:h-[400px]"
					variants={itemVariants}
					custom={1}
				>
					<div className="relative w-full h-full">
						<Image
							className="object-contain rounded-xl"
							src={photos.leadership.path}
							alt={photos.leadership.title}
							fill
							unoptimized
						/>
					</div>
				</motion.div>
			</div>
		</Container>
	);
}

export default AboutLanding;
