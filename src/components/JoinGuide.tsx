"use client";

import Container from "@/components/Container";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Anchor from "./Anchor";

function JoinGuide() {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delay: 0.5,
				staggerChildren: 0.1,
				delayChildren: 0.7,
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

	const Pre = (text: string) => (
		<span className="inline-block bg-border mx-1 px-2 rounded font-mono">
			{text}
		</span>
	);

	return (
		<Container>
			<motion.div
				className="flex flex-col justify-between item-center gap-4 mt-8 from-white/10 to-white/5 rounded-lg border border-white/10 p-4"
				style={{ backgroundColor: "rgba(15, 15, 15, 0.7)" }}
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
					<motion.ol
						className="list-disc list-inside font-ubuntu-sans text-hero-button"
						variants={itemVariants}
					>
						<li>
							Join our{" "}
							<Anchor href="https://discord.gg/nCpZzbB">
								Discord
							</Anchor>
						</li>
						<li>Follow the onboarding instructions</li>
						<li>
							Head to the{" "}
							<Anchor href="https://discord.com/channels/631254092332662805/1009108768639946783">
								#attendance channel
							</Anchor>
						</li>
						<li>Use the command {Pre("/register")}</li>
						<li>Fill out the short form from the link provided</li>
					</motion.ol>
					<motion.div
						className="h-[100px] w-full md:w-[300px] lg:w-[400px] relative"
						variants={itemVariants}
					>
						<Image
							className="object-contain"
							src={"/images/general/register.png"}
							alt={"register command"}
							fill
							unoptimized
						/>
					</motion.div>
				</div>
				<motion.div
					className="flex text-wrap lg:items-center"
					variants={itemVariants}
				>
					<p className="font-ubuntu-sans text-hero-button">
						Need to update your info later? Just run the{" "}
						{Pre("/register")}
						command again. It&apos;s that easy.
					</p>
				</motion.div>
			</motion.div>
		</Container>
	);
}

export default JoinGuide;
