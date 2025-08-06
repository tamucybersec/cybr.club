"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

function HeroSection() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	} as const;

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: (custom = 0) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				delay: 0.1 + custom * 0.1,
				ease: [0.25, 0.46, 0.45, 0.94] as const,
			},
		}),
	} as const;

	const imageVariants = {
		hidden: {
			opacity: 0,
			y: 50,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.8,
				delay: 0.3,
				ease: [0.215, 0.61, 0.355, 1],
			},
		},
	} as const;

	return (
		<Container className="mt-[15dvh] sm:mt-[20dvh] px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-12 max-w-7xl mx-auto">
				<motion.div
					className="flex-1 max-w-2xl lg:pr-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.h1
						className="font-azonix text-hero-heading leading-tight"
						variants={itemVariants}
					>
						<span className="block whitespace-nowrap">
							Jump-start your Journey
						</span>
						<span className="block">in Cybersecurity</span>
					</motion.h1>

					<motion.p
						className="text-[#AAAAAA] text-hero-subtext leading-snug max-w-3xl mt-0 sm:mt-4"
						variants={itemVariants}
					>
						Earn certifications, gain real-world experience,
						<br className="hidden sm:block" />
						and find your calling in cybersecurity
					</motion.p>

					<motion.div
						className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-6 sm:mt-12"
						variants={itemVariants}
					>
						<Button
							asChild
							className="text-hero-button font-azonix px-8 sm:px-10 py-1.5 sm:py-4 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
							style={{ borderRadius: "10px" }}
						>
							<Link href="/join">Join</Link>
						</Button>

						<Button
							asChild
							variant="outline"
							className="text-hero-button font-azonix px-8 sm:px-10 py-3 sm:py-4 h-auto bg-transparent border border-white/40 text-white hover:bg-transparent hover:border-white/70 transition-all duration-300"
							style={{ borderRadius: "10px" }}
						>
							<Link href="#learn">Learn More</Link>
						</Button>
					</motion.div>
				</motion.div>

				<motion.div
					className="flex-1 w-full left-15 max-w-2xl relative h-[300px] lg:h-[400px] xl:h-[500px]"
					variants={imageVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div
						className="relative w-full h-full"
						whileHover={{ scale: 1.02 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 10,
						}}
					>
						<Image
							src="/images/app/PlaceholderLogo.svg"
							alt="Cybersecurity Club Shield Logo"
							fill
							sizes="(max-width: 1024px) 100vw, 50vw"
							priority
							className="object-contain object-center"
						/>
					</motion.div>
				</motion.div>
			</div>
		</Container>
	);
}

export default HeroSection;
