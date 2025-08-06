"use client";

import Container from "@/components/Container";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

// Manual entries for each activity group
const activityGroups: {
	id: number;
	title: string;
	description: string;
	modalContent: string;
	day: string;
	time: string;
	image: string;
}[] = [
	{
		id: 1,
		title: "Cyber Policy",
		description:
			"In the world of cyber, the most powerful weapon isn't always good malware; it's often better policy. The strategic decisions made after a major compromise determine whether the lights stay on, economies remain stable, and nations avoid conflict. Our activity group bridges the critical gap between technical know-how and strategic action, preparing you to advise leaders and make decisions during a crisis. Join us to shape the rules of digital statecraft and also compete against top universities in the Atlantic Council's national Cyber 9/12 Challenge.",
		modalContent: "",
		day: "Monday",
		time: "7:00",
		image: "/images/activity-groups/policy.png",
	},
	{
		id: 2,
		title: "Red Hat Academy",
		description:
			"Learn the fundamentals of Linux and system administration, then prove your knowledge and skills with an industry certification from the leading company in Open Source software, at no cost to you. We don't just teach you the command; we show you how Linux is used in the real world, with hands-on labs designed to help you really get it. Join us at our regular scheduled meetings, where you get to apply your knowledge, ask questions, and work with your peers, or follow along with the self-paced online course available all year round.",
		modalContent: "",
		day: "Monday",
		time: "8:00",
		image: "/images/activity-groups/red-hat.png",
	},
	{
		id: 3,
		title: "Cyber Operations",
		description:
			"A combination of several previously individual activity groups (HackTheBox, Capture the Flag, Blue Team). Designed to teach fundamental skills in both offensive and defensive security.",
		modalContent: "",
		day: "Tuesday",
		time: "7:00",
		image: "/images/activity-groups/hack-the-box.png",
	},
	{
		id: 4,
		title: "Hardware Hacking",
		description:
			"The other side of Cybersecurity: Lockpicking, Physical Security, and Embedded Systems.",
		modalContent: "",
		day: "Tuesday",
		time: "8:00",
		image: "/images/activity-groups/flipper.svg",
	},
	{
		id: 5,
		title: "Beginner Meetings",
		description:
			"Explore the world of cybersecurity in a beginner-friendly format. Learn new skills, watch live demos, and hear from industry professionals - all in one place. Whether you're just starting out or curious about the field, this is your one-stop shop for all things cyber.",
		modalContent: "Placeholder text 5",
		day: "Wednesday",
		time: "7:00",
		image: "/images/club-logos/white-shield.svg",
	},
	{
		id: 6,
		title: "AWS Academy",
		description: "Activity Group Description 6",
		modalContent: "Placeholder text 6",
		day: "Wednesday",
		time: "8:00",
		image: "/images/activity-groups/aws.svg",
	},
	{
		id: 7,
		title: "Palo Alto Academy",
		description:
			"Get hands on experience and learn more about the leading company in cybersecurity. Each meeting is dedicated to teaching key concepts for PANW Certifications so you can be better equipped for your first internship or job.",
		modalContent: "",
		day: "Thursday",
		time: "7:00",
		image: "/images/activity-groups/palo-alto.svg",
	},
	{
		id: 8,
		title: "Cisco Networking Academy",
		description:
			"Learn networking principles from the ground up! The Cisco Academy shares the joy of computer networking with students of all skill levels. In addition to weekly lessons, we host monthly hands-on labs with real Cisco equipment to get you the experience you need to earn the coveted CCNA - for free!",
		modalContent: "",
		day: "Thursday",
		time: "8:00",
		image: "/images/activity-groups/cisco.svg",
	},
];

function ActivityGroups() {
	const [hoveredItem, setHoveredItem] = useState<number | null>(null);
	const [selectedModal, setSelectedModal] = useState<number | null>(null);

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
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

	const titleVariants: Variants = {
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

	const handleLearnMore = (groupId: number) => {
		setSelectedModal(groupId);
	};

	const closeModal = () => {
		setSelectedModal(null);
	};

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
						viewport={{ once: true, amount: 0.3 }}
					>
						activity groups
					</motion.h2>

					{/* Desktop Grid */}
					<motion.div
						className="hidden md:grid grid-cols-2 gap-6 lg:gap-8"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						{activityGroups.map((group) => (
							<motion.div
								key={group.id}
								className="relative h-64 md:h-80 lg:h-96 group cursor-pointer"
								variants={itemVariants}
								onHoverStart={() => setHoveredItem(group.id)}
								onHoverEnd={() => setHoveredItem(null)}
							>
								<div className="w-full h-full bg-gradient-to-br from-white/8 to-white/4 rounded-md border border-white/10 transition-all duration-300 group-hover:border-white/20 overflow-hidden relative">
									{/* Placeholder background with fixed aspect ratio */}
									<div
										className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 p-4 relative"
										style={{ aspectRatio: "1/1" }}
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
											opacity:
												hoveredItem === group.id
													? 1
													: 0,
										}}
										transition={{ duration: 0.3 }}
									>
										{/* Description - Left side */}
										<div className="flex-1 flex flex-col justify-center">
											<h3 className="font-azonix text-3xl">
												{group.title}
											</h3>
											<p className="text-white text-base lg:text-lg font-ubuntu-sans font-medium">
												{group.description}
											</p>
										</div>

										{/* Learn More Button - Right corner */}
										{/* <div className="flex justify-end">
											<Button
												variant="outline"
												className="text-sm font-ubuntu-sans px-4 py-2 h-auto bg-transparent border border-white/40 text-white hover:bg-transparent hover:border-white/70 transition-all duration-300"
												style={{ borderRadius: "8px" }}
												onClick={() =>
													handleLearnMore(group.id)
												}
											>
												Learn More
											</Button>
										</div> */}
									</motion.div>
								</div>
							</motion.div>
						))}
					</motion.div>

					{/* Mobile Layout */}
					<motion.div
						className="md:hidden space-y-6"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						{activityGroups.map((group) => (
							<motion.div
								key={group.id}
								className="bg-gradient-to-br from-white/8 to-white/4 rounded-md border border-white/10 p-6"
								variants={itemVariants}
							>
								{/* Placeholder background with fixed height */}
								<div
									className="w-full h-32 bg-gradient-to-br from-white/5 to-white/10 rounded mb-4"
									style={{ aspectRatio: "16/9" }}
								></div>

								{/* Description */}
								<p className="text-white text-sm font-ubuntu-sans font-medium mb-4">
									{group.description}
								</p>

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
						))}
					</motion.div>
				</div>
			</Container>

			{/* Modal */}
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
						<div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

						{/* Modal Content */}
						<motion.div
							className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-8 max-w-md w-full"
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
		</>
	);
}

export default ActivityGroups;
