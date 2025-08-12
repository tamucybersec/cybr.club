"use client";

import Container from "@/components/Container";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

function JoinLanding() {
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
				<motion.div
					className="flex-1 max-w-2xl lg:pr-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.h1
						className="font-azonix text-5xl"
						variants={itemVariants}
					>
						Join Us!
					</motion.h1>

					<motion.p
						className="font-ubuntu-sans text-[22px] leading-relaxed text-white/70"
						variants={itemVariants}
					>
						Everyone is welcome here, no matter your experience
						level or how much time you can commit. There are no
						dues, no required meetings, and plenty of groups
						tailored to different skill levels and interests. Still
						interested? Follow the steps below to become an official
						member of the Texas A&M Cybersecurity Club!
					</motion.p>
				</motion.div>

				<motion.div
					className="flex-1 relative h-[200px] lg:h-[300px]"
					variants={itemVariants}
					initial="hidden"
					animate="visible"
					custom={1}
				>
					<div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/10">
						<Image
							className="object-contain"
							src="/images/committees/NibblesWow.png"
							alt={"Nibbles Wow"}
							fill
							unoptimized
						/>
					</div>
				</motion.div>
			</div>
		</Container>
	);
}

export default JoinLanding;
