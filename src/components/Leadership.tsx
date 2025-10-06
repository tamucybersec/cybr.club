"use client";

import Container from "@/components/Container";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";
import {
	faGithub,
	faLinkedin,
	IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { Officer, Socials } from "@/data/leadership";
import Image from "next/image";
import ObfuscatedLink from "./ObfuscatedLink";

function SocialIcon({ platform }: { platform: keyof Socials }) {
	let icon: IconDefinition | undefined = undefined;
	switch (platform) {
		case "email":
			icon = faEnvelope;
			break;
		case "github":
			icon = faGithub;
			break;
		case "linkedin":
			icon = faLinkedin;
			break;
		case "website":
			icon = faLink;
			break;
	}
	if (icon === undefined) {
		return undefined;
	}

	return (
		<FontAwesomeIcon
			icon={icon}
			className="w-[18px] h-[18px] text-white/70 hover:text-white transition-colors duration-200"
		/>
	);
}

function LeadershipCard({ member }: { member: Officer }) {
	return (
		<motion.div
			className="group"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			whileHover={{ y: -5 }}
		>
			<div className="bg-gradient-to-br from-white/8 to-white/4 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:shadow-xl">
				{/* Image Section - No margin, fills to border */}
				<div className="relative overflow-hidden m-4 rounded-lg aspect-[3/2]">
					{/* Placeholder image */}
					<Image
						className="rounded-lg object-contain"
						src={member.image}
						alt={`Head-shot of ${member.name}`}
						fill
						unoptimized
					/>
					{/* <div className="w-full h-full bg-gradient-to-br from-white/15 to-white/8"></div> */}
				</div>

				{/* Content Section - Secondary background */}
				<div className="bg-[#171717] p-4 sm:p-5 lg:p-6">
					{/* Name */}
					<h3 className="font-ubuntu-sans text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
						{member.name}
					</h3>

					{/* Title */}
					<p className="font-ubuntu-sans text-sm sm:text-base text-white/80 mb-3 sm:mb-4">
						{member.position}
					</p>

					{/* Social Links */}
					{member.socials && (
						<div className="flex items-center gap-3 sm:gap-4">
							{Object.entries(member.socials).map(
								([platform, url], index) => (
									<ObfuscatedLink
										key={index}
										href={url}
										isEmail={
											(platform as keyof Socials) ===
											"email"
										}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:scale-110 transition-transform duration-200"
									>
										<SocialIcon
											platform={platform as keyof Socials}
										/>
									</ObfuscatedLink>
								)
							)}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
}

function Leadership({ name, group }: { name: string; group: Officer[] }) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	return (
		<Container className="py-16 sm:py-20 lg:py-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.h1
					className="font-azonix text-hero-heading leading-tight mb-12 sm:mb-16 lg:mb-20 text-center"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					{name}
				</motion.h1>

				{/* Leadership Grid */}
				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{group.map((member, index) => (
						<LeadershipCard
							key={index}
							member={member}
						/>
					))}
				</motion.div>
			</div>
		</Container>
	);
}

export default Leadership;
