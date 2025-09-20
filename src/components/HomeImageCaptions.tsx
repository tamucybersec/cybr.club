"use client";

import Container from "@/components/Container";
import { photos } from "@/data/photos";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

function LargeImagesSection() {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: [0.25, 0.1, 0.25, 1],
			},
		},
	};

	return (
		<Container>
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
			>
				{/* First Image */}
				<motion.div
					className="flex flex-col gap-4"
					variants={itemVariants}
				>
					<div className="w-full h-[30vh] lg:h-[35vh] bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/10 relative">
						<Image
							src={photos.austinPoint.path}
							alt={"Students helping students"}
							fill
							unoptimized
							className="object-cover rounded-xl"
						/>
					</div>
					<p className="text-hero-button font-ubuntu-sans text-center text-[#AAAAAA]">
						{photos.austinPoint.embelishment}
					</p>
				</motion.div>

				{/* Second Image */}
				<motion.div
					className="flex flex-col gap-4"
					variants={itemVariants}
				>
					<div className="w-full h-[30vh] lg:h-[35vh] bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/10 relative">
						<Image
							src={photos.infoGavin.path}
							alt={"Build a community"}
							fill
							unoptimized
							className="object-cover rounded-xl"
						/>
					</div>
					<p className="text-hero-button font-ubuntu-sans text-center text-[#AAAAAA]">
						{photos.infoGavin.embelishment}
					</p>
				</motion.div>
			</motion.div>
		</Container>
	);
}

export default LargeImagesSection;
