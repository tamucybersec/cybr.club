"use client";

import Container from "@/components/Container";
import { motion, Variants } from "framer-motion";
import ModernSlider from "./FeatureSlider";
import Image from "next/image";
import { photos } from "@/data/photos";

function AboutMission() {
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
		<Container className="py-16 sm:py-20 lg:py-24">
			<motion.div
				className="max-w-7xl mx-auto pl-12 sm:pl-16 lg:pl-0"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<motion.div
					className="flex-1 max-w-2xl lg:pr-8 relative"
					variants={itemVariants}
				>
					<div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 to-white/10"></div>
					<p className="font-ubuntu-sans text-base sm:text-lg lg:text-[22px] leading-relaxed text-white/70 mb-12 lg:mb-16 pl-6 lg:pl-6">
						The club began with a focus on hacking and defense, but
						as we&apos;ve grown, so has our mission. Now, we explore
						a wide range of cybersecurity topics and ideas.
					</p>
				</motion.div>

				{/* Modern Slider */}
				<motion.div
					className="w-full max-w-7xl mx-auto"
					variants={itemVariants}
				>
					<ModernSlider />
				</motion.div>

				{/* Image and Text Section */}
				<motion.div
					className="relative mt-12 lg:mt-16 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center"
					variants={itemVariants}
				>
					{/* Image Placeholder - Left Side */}
					<div className="w-full lg:w-1/2 h-64 lg:h-[420px] rounded-lg overflow-hidden relative">
						<Image
							className="object-cover rounded-xl w-full h-full"
							src={photos.ciscoGigEm.path}
							alt={photos.ciscoGigEm.title}
							fill
							unoptimized
						/>
					</div>

					{/* Text Content - Right Side */}
					<div className="w-full lg:w-1/2 flex flex-col justify-center">
						<div className="font-ubuntu-sans text-base sm:text-lg lg:text-[22px] leading-relaxed text-white/70 space-y-4 lg:space-y-6">
							<p>
								Whether you&apos;re brand new or already
								experienced, we hope to help you discover just
								how broad and exciting the world of
								cybersecurity really is.
							</p>
							<p>
								Since we were established, our top priority has
								been helping members grow. Along the way,
								students have earned respected certifications,
								placed in national competitions, and landed
								roles at both startups and major companies all
								through the skills and support they found here.
							</p>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</Container>
	);
}

export default AboutMission;
