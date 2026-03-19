"use client";

import Container from "@/components/Container";
import { motion } from "framer-motion";
import { SocialIcon } from "@/components/Leadership";
import { Alumni } from "@/data/alumni";
import { Socials } from "@/data/leadership";
import Image from "next/image";

function AlumniCard({ member }: { member: Alumni[number] }) {
	return (
		<motion.div
			className="group"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			whileHover={{ y: -5 }}
		>
			<div className="bg-gradient-to-br from-white/8 to-white/4 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:shadow-xl h-full flex flex-col">
				{/* Image Section - Only if image exists */}
				{member.image && (
					<div className="relative overflow-hidden aspect-[3/2]">
						<Image
							className={
								member.imageMode === "contain"
									? "object-contain"
									: "object-cover"
							}
							src={member.image}
							alt={`Photo of ${member.name}`}
							fill
							unoptimized
						/>
					</div>
				)}

				{/* Content Section */}
				<div className="bg-[#171717] p-4 sm:p-5 flex flex-1 flex-col">
					{/* Name */}
					<h3 className="font-ubuntu-sans text-base sm:text-lg font-semibold text-white mb-1">
						{member.name}
					</h3>

					{/* Position */}
					<p className="font-ubuntu-sans text-sm text-white/80 mb-1">
						{member.position}
					</p>

					{/* Graduation Term */}
					<p className="font-ubuntu-sans text-xs text-white/50 mb-3">
						{member.grad}
					</p>

					{/* Social Links */}
					{member.socials && (
						<div className="flex items-center gap-3 mt-auto">
							{Object.entries(member.socials).map(
								([platform, url], index) => (
									<a
										key={index}
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:scale-110 transition-transform duration-200"
									>
										<SocialIcon
											platform={platform as keyof Socials}
										/>
									</a>
								)
							)}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
}

export default function AlumniSection({ alumni }: { alumni: Alumni }) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
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
					Alumni
				</motion.h1>

				{/* Alumni Grid */}
				<motion.div
					className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{alumni.map((member, index) => (
						<AlumniCard
							key={index}
							member={member}
						/>
					))}
				</motion.div>
			</div>
		</Container>
	);
}
