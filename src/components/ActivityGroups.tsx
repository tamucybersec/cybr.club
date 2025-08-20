"use client";

import Container from "@/components/Container";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { ActivityGroup, activityGroups } from "@/data/activityGroups";

function ActivityGroups() {
	const [hoveredItem, setHoveredItem] = useState<number | null>(null);
	const [selectedModal, setSelectedModal] = useState<number | null>(null);

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
		hidden: { opacity: 0, y: 15 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.2,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	};

	const titleVariants: Variants = {
		hidden: { opacity: 0, y: 15 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.2,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	};

	const handleLearnMore = (groupId: number) => {
		setSelectedModal(groupId);
	};

	const closeModal = () => {
		setSelectedModal(null);
	};

	const DesktopActivityGroup = (group: ActivityGroup) => (
		<motion.div
			key={group.id}
			className="relative h-64 md:h-80 lg:h-96 group cursor-pointer"
			variants={itemVariants}
			onHoverStart={() => setHoveredItem(group.id)}
			onHoverEnd={() => setHoveredItem(null)}
		>
			<div className="w-full h-full rounded-md border border-white/10 transition-all duration-300 group-hover:border-white/20 overflow-hidden relative" style={{ backgroundColor: '#0B0B0B' }}>
				{/* Placeholder background with fixed aspect ratio */}
				<div
					className="w-full h-full p-4 relative"
					style={{ aspectRatio: "1/1", backgroundColor: '#0B0B0B' }}
				>
					<Image
						className="object-contain p-16"
						src={group.image}
						alt={group.title}
						fill
						unoptimized
					/>
				</div>

				{/* Hover overlay */}
				<motion.div
					className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent flex flex-col justify-between p-6"
					initial={{ opacity: 0 }}
					animate={{
						opacity: hoveredItem === group.id ? 1 : 0,
					}}
					transition={{ duration: 0.3 }}
				>
					{/* Description - Left side */}
					<div className="flex-1 flex flex-col justify-center">
						<h3 className="font-azonix text-3xl">{group.title}</h3>
						<h5 className="font-ubuntu-sans text-lg font-light">
							{group.day}s at {group.time}
						</h5>
						<p className="text-white text-base lg:text-lg font-ubuntu-sans font-medium">
							{group.description}
						</p>
					</div>

					{/* Learn More Button - Right corner */}
					<div className="flex justify-end">
						<Button
							variant="outline"
							className="text-sm font-ubuntu-sans px-4 py-2 h-auto bg-transparent border border-white/40 text-white hover:bg-transparent hover:border-white/70 transition-all duration-300"
							style={{ borderRadius: "8px" }}
							onClick={() => handleLearnMore(group.id)}
						>
							Learn More
						</Button>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);

	const MobileActivityGroup = (group: ActivityGroup) => (
		<motion.div
			key={group.id}
			className="rounded-md border border-white/10 p-6"
			style={{ backgroundColor: '#0B0B0B' }}
			variants={itemVariants}
		>
			{/* Placeholder background with fixed height */}
			<div
				className="w-full h-32 rounded mb-6 relative"
				style={{ aspectRatio: "16/9" }}
			>
				<Image
					className="object-contain p-2"
					src={group.image}
					alt={group.title}
					fill
					unoptimized
				/>
			</div>

			{/* Description */}
			<div className="flex-1 flex flex-col justify-center">
				<h3 className="font-azonix text-hero-subtext">{group.title}</h3>
				<h5 className="font-ubuntu-sans text-sm font-light">
					{group.day}s at {group.time}
				</h5>
				<p className="text-white text-hero-button font-ubuntu-sans font-medium mb-4">
					{group.description}
				</p>
			</div>

			{/* Learn More Button */}
			<Button
				variant="outline"
				className="text-sm font-ubuntu-sans px-4 py-2 h-auto bg-transparent border border-white/40 text-white hover:bg-transparent hover:border-white/70 transition-all duration-300"
				style={{ borderRadius: "8px" }}
				onClick={() => handleLearnMore(group.id)}
			>
				Learn More
			</Button>
		</motion.div>
	);

	const Modal = () => (
		<AnimatePresence>
			{selectedModal && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={closeModal}
				>
					{/* Backdrop */}
					<div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

					{/* Modal Content */}
					<motion.div
						className="relative bg-white/20 backdrop-blur-xl border border-white/20 rounded-lg p-8 max-w-md w-full"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close button */}
						<button
							onClick={closeModal}
							className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
						>
							<X size={24} />
						</button>

						{/* Modal text */}
						<p className="text-white font-azonix text-2xl leading-relaxed pr-8">
							{
								activityGroups.find(
									(group) => group.id === selectedModal
								)?.title
							}
						</p>

						{/* Modal text */}
						<p className="text-white font-ubuntu-sans text-lg leading-relaxed pr-8">
							{
								activityGroups.find(
									(group) => group.id === selectedModal
								)?.modalContent
							}
						</p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return (
		<>
			<Container className="py-16 sm:py-20 lg:py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Title */}
					<motion.h2
						className="font-azonix text-hero-heading text-center mb-12 lg:mb-16"
						variants={titleVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.1, margin: "100px" }}
					>
						Activity Groups
					</motion.h2>

					{/* Desktop Grid */}
					<motion.div
						className="hidden md:grid grid-cols-2 gap-6 lg:gap-8"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.1, margin: "100px" }}
					>
						{activityGroups.map((group) =>
							DesktopActivityGroup(group)
						)}
					</motion.div>

					{/* Mobile Layout */}
					<motion.div
						className="md:hidden space-y-6"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.1, margin: "100px" }}
					>
						{activityGroups.map((group) =>
							MobileActivityGroup(group)
						)}
					</motion.div>
				</div>
			</Container>
			{Modal()}
		</>
	);
}

export default ActivityGroups;
