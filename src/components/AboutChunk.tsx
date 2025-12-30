"use client";

import Container from "@/components/Container";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { committees } from "@/data/committees";
import { certifications } from "@/data/certifications";

function ActivityGroupsNew() {
	const imageRef = useRef<HTMLDivElement>(null);
	const [maxScale, setMaxScale] = useState(0.9);

	const { scrollYProgress } = useScroll({
		target: imageRef,
		offset: ["start end", "end start"],
	});

	// Create a smooth scaling transform
	const rawScale = useTransform(scrollYProgress, [0, 0.6], [0.9, 1.1]);

	// Use effect to track and update max scale
	useEffect(() => {
		const unsubscribe = rawScale.on("change", (value) => {
			if (value > maxScale) {
				setMaxScale(value);
			}
		});

		return unsubscribe;
	}, [rawScale, maxScale]);

	// Final scale that never goes below the max reached
	const finalScale = useTransform(rawScale, (value) =>
		Math.max(value, maxScale)
	);

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
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
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	};

	return (
		<Container>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Activity Groups Section */}
				<motion.div
					className="mb-16 sm:mb-20 lg:mb-24"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.15 }}
				>
					{/* Activity Groups Title */}
					<motion.h1
						className="font-azonix text-hero-heading leading-tight mb-8 lg:mb-12"
						variants={itemVariants}
					>
						<span className="block whitespace-nowrap">
							activity groups
						</span>
					</motion.h1>

					{/* Large Image with improved one-way scaling */}
					<div
						ref={imageRef}
						className="w-full mb-8 lg:mb-12"
					>
						<motion.div
							className="w-full h-[40vh] sm:h-[60vh] lg:h-[80vh]"
							style={{
								scale: finalScale,
								transition: "scale 0.3s ease-out",
							}}
						>
							<Image
								className="w-full h-full rounded-2xl object-contain"
								src="/images/activity-groups/collection.svg"
								alt="All activity group logos"
								fill
								unoptimized
							/>
						</motion.div>
					</div>

					{/* Description Text */}
					<motion.p
						className="font-ubuntu-sans text-hero-subtext leading-tight max-w-5xl"
						variants={itemVariants}
					>
						Our activity groups are led by student ambassadors in
						collaboration with companies like{" "}
						<strong className="font-bold">AWS</strong>,{" "}
						<strong className="font-bold">Red Hat</strong>,{" "}
						<strong className="font-bold">Cisco</strong>, and{" "}
						<strong className="font-bold">
							Palo Alto Networks
						</strong>
						, giving members direct exposure to current tools and
						real-world expertise.
					</motion.p>
				</motion.div>

				{/* Committees Section */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.15 }}
				>
					{/* Committees Title and Description */}
					<div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 lg:gap-12 mb-12 lg:mb-16">
						{/* Left side - Title */}
						<motion.div
							className="flex-1 max-w-2xl lg:pr-8"
							variants={itemVariants}
						>
							<h1 className="font-azonix text-hero-heading leading-tight">
								<span className="block whitespace-nowrap">
									committees
								</span>
							</h1>
						</motion.div>

						{/* Right side - Description */}
						<motion.div
							className="flex-1 max-w-3xl"
							variants={itemVariants}
						>
							<p className="font-ubuntu-sans text-hero-subtext leading-tight">
								Our committees are the backbone of the club.
								They&apos;re fully student-run, giving members
								the chance to take ownership and make a real
								impact behind the scenes.
							</p>
						</motion.div>
					</div>

					{/* Committee Cards Stack */}
					<motion.div
						className="space-y-6 lg:space-y-8 mb-12 lg:mb-16"
						variants={containerVariants}
					>
						{committees.map((committee, index) => (
							<motion.div
								key={committee.id}
								className="bg-gradient-to-br from-white/8 to-white/4 rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10 relative overflow-hidden"
								variants={itemVariants}
								custom={index}
							>
								<div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8">
									{/* Left side content */}
									<div className="flex-1 space-y-4 lg:space-y-6">
										{/* Title - Top left */}
										<h3 className="font-azonix text-hero-subtitle text-white">
											{committee.title}
										</h3>

										{/* Description - Left area */}
										<p className="font-ubuntu-sans text-hero-button text-white/90 leading-relaxed max-w-2xl">
											{committee.description}
										</p>

										{/* Apply Button - Bottom left area */}
										{committee.application && (
											<div className="pt-4 lg:pt-6">
												<Button
													className="font-azonix px-6 sm:px-8 py-2 sm:py-3 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
													style={{
														borderRadius: "10px",
													}}
													asChild
												>
													<Link
														href={
															committee.application
														}
													>
														Apply
													</Link>
												</Button>
											</div>
										)}
									</div>

									{/* Right side - SVG placeholder */}
									<div className="hidden lg:block flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56">
										<Image
											className="rounded w-full h-full object-contain"
											src={committee.image}
											alt={committee.title}
											width={224}
											height={224}
											unoptimized
										/>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>

					{/* Subtle off-tone section for calm transition */}
					<div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-16 sm:mb-20 lg:mb-24  bg-[#101010]">
						<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
							<motion.div
								className="w-full"
								variants={itemVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.3 }}
							>
								<p className="font-ubuntu-sans text-hero-subtext leading-relaxed text-white/90 text-center max-w-6xl mx-auto">
									Whether you&apos;re organizing competitions,
									managing outreach, or architecting the
									club&apos;s backend, committees offer
									hands-on experience and are often the first
									step toward leadership within the club. If
									you&apos;re interested in joining a
									committee, you can apply using the links
									above or reach out on the discord.
								</p>
							</motion.div>
						</div>
					</div>
				</motion.div>

				{/* Certifications Section */}
				<motion.div
					className="mb-16 sm:mb-20 lg:mb-24"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.15 }}
				>
					{/* Certification Title */}
					<motion.h1
						className="font-azonix text-hero-heading leading-tight mb-6 lg:mb-8"
						variants={itemVariants}
					>
						<span className="block whitespace-nowrap">
							certifications
						</span>
					</motion.h1>

					{/* Certification Description */}
					<motion.p
						className="font-ubuntu-sans text-hero-subtext leading-tight max-w-4xl mb-12 lg:mb-16"
						variants={itemVariants}
					>
						We offer a variety of certifications, all at zero cost
						to you! If you&apos;re looking to prove your knowledge
						or stand out to recruiters, certifications are the way
						to go. Contact our activity leaders for more information
						on how to qualify for a certification.
					</motion.p>

					{/* Certification Grid */}
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
						variants={containerVariants}
					>
						{certifications.map((cert) => (
							<motion.div
								key={cert.id}
								className="relative aspect-square group cursor-pointer"
								variants={itemVariants}
							>
								<div className="w-full h-full bg-gradient-to-br from-white/8 to-white/4 rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-white/20 overflow-hidden">
									{/* Placeholder background */}
									<div className="flex items-center w-full h-full">
										<Image
											className="w-full h-auto p-8"
											src={cert.image}
											alt={cert.title}
											height={300}
											width={300}
											unoptimized
										/>
									</div>

									{/* Hover overlay */}
									<motion.div
										className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent flex flex-col justify-end p-6"
										initial={{ opacity: 0 }}
										whileHover={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
									>
										<h3 className="text-white text-hero-button font-ubuntu-sans font-medium mb-2">
											{cert.title}
										</h3>
										<p className="text-white/90 text-hero-button font-ubuntu-sans leading-relaxed mb-4">
											{cert.description}
										</p>
										<Button
											className="font-azonix px-4 py-2 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow-lg transition-all duration-300 self-start"
											style={{ borderRadius: "8px" }}
										>
											<Link href={cert.link}>
												Learn More
											</Link>
										</Button>
									</motion.div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</Container>
	);
}

export default ActivityGroupsNew;
