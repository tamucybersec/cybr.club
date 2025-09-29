"use client";

import Container from "@/components/Container";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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

	const committees = [
		{
			id: 1,
			title: "Technology Committee",
			description:
				"The Technology Committee leads the development of both our backend systems (the Discord bot, CyberHam, and internal APIs) and our frontend platforms (this website and the Sponsor Dashboard). You'll gain real, resume-worthy experience using industry-standard tools while making a meaningful contribution to your community. New members are welcome year-round.",
			image: "/images/committees/cyberham.png",
			application: "https://example.com",
		},
		{
			id: 2,
			title: "Public Relations Committee",
			description:
				"The Public Relations Committee handles everything related to our external presence, from organizing outreach efforts and photographing events to designing our brand materials. They're the creative force behind how we're seen by the world, and they take that responsibility seriously. If you're passionate about storytelling, design, or community engagement, this is the place to make your mark. No experience needed.",
			image: "/images/committees/zero-two.png",
		},
	];

	const certifications = [
		{
			id: 1,
			title: "Cisco Certified Network Associate (CCNA)",
			description:
				"A foundational certification validating essential networking skills, including IP connectivity, network access, and security fundamentals.",
			image: "/images/certifications/ccna-white.png",
			link: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html",
		},
		{
			id: 2,
			title: "AWS Certified Cloud Practitioner",
			description:
				"An entry-level certification demonstrating a broad understanding of cloud concepts, AWS services, security, and billing fundamentals.",
			image: "/images/certifications/aws-cloud-practitioner.png",
			link: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
		},
		{
			id: 3,
			title: "Palo Alto Networks Certified Cybersecurity Practitioner",
			description:
				"A certification that verifies core knowledge of cybersecurity principles, network security, and the use of Palo Alto Networks technologies.",
			image: "/images/certifications/palo-practitioner.png",
			link: "https://www.paloaltonetworks.com/services/education/panw-cybersecurity-practitioner",
		},
		{
			id: 4,
			title: "Red Hat Certified System Administrator (RHCSA)",
			description:
				"A certification validating essential skills in Linux system administration, including installation, configuration, and basic management tasks.",
			image: "/images/certifications/redhat.png",
			link: "https://www.redhat.com/en/services/certification/rhcsa",
		},
	];

	return (
		<Container className="py-16 sm:py-20 lg:py-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Activity Groups Section */}
				<motion.div
					className="mb-16 sm:mb-20 lg:mb-24"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
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
							className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]"
							style={{
								scale: finalScale,
								transition: "scale 0.3s ease-out",
							}}
						>
							<div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10"></div>
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
					viewport={{ once: true, amount: 0.3 }}
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
										<h3 className="font-azonix text-xl sm:text-2xl lg:text-3xl text-white">
											{committee.title}
										</h3>

										{/* Description - Left area */}
										<p className="font-ubuntu-sans text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl">
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
									<div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
										<Image
											className="rounded"
											src={committee.image}
											alt={committee.title}
											width={200}
											height={200}
											unoptimized
										/>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>

					{/* Subtle off-tone section for calm transition */}
					<div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-16 sm:mb-20 lg:mb-24 py-12 lg:py-16 bg-[#101010]">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<motion.div
								className="w-full"
								variants={itemVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.3 }}
							>
								<p className="font-ubuntu-sans text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/90 text-center max-w-6xl mx-auto">
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
					viewport={{ once: true, amount: 0.3 }}
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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation.
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
										<h3 className="text-white text-lg lg:text-xl font-ubuntu-sans font-medium mb-2">
											{cert.title}
										</h3>
										<p className="text-white/90 text-sm lg:text-base font-ubuntu-sans leading-relaxed mb-4">
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
