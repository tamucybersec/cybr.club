"use client";

import Container from "@/components/Container";
import TitleContainer from "@/components/TitleContainer";
import { benefits, Benefits as BenefitsType } from "@/data/benefits";
import { Tier } from "@/data/sponsors";
import { tierAttrs } from "@/lib/constants";
import { capitalize } from "@/lib/helpers";
import { motion, Variants } from "framer-motion";

function Benefits() {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
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

	const Benefit = (tier: Tier, benefits: BenefitsType) => (
		<motion.div
			key={tier}
			className={`bg-gradient-to-br rounded sm:grid sm:grid-cols-2 border p-4`}
			style={{
				borderColor: `${tierAttrs[tier].color}36`,
				background: `linear-gradient(to bottom right, ${tierAttrs[tier].color}24, ${tierAttrs[tier].color}12)`,
			}}
			variants={itemVariants}
		>
			<div className="flex flex-col mb-2 justify-center sm:items-center">
				<h3
					className="font-azonix text-hero-subtitle"
					style={{ color: `${tierAttrs[tier].color}B0` }}
				>
					{capitalize(tier)}
				</h3>
				<p className="font-ubuntu-sans text-hero-button">
					{benefits.cost}
				</p>
			</div>
			<ul className="list-disc list-inside text-hero-button font-ubuntu-sans">
				{benefits.points.map((p, index) => (
					<li key={index}>{p}</li>
				))}
			</ul>
		</motion.div>
	);

	return (
		<>
			<motion.div
				variants={titleVariants}
				viewport={{
					amount: 0.3,
					once: true,
					margin: "0px 0px -200px 0px",
				}}
				initial="hidden"
				whileInView="visible"
			>
				<TitleContainer className="text-hero-heading">
					Benefits
				</TitleContainer>
			</motion.div>
			<Container>
				<motion.div
					className="flex flex-col gap-4 mb-4"
					variants={containerVariants}
					viewport={{ amount: 0.4, once: true }}
					initial="hidden"
					whileInView="visible"
				>
					{Object.entries(benefits).map(([tier, benefits]) =>
						Benefit(tier as Tier, benefits)
					)}
				</motion.div>
			</Container>
		</>
	);
}

export default Benefits;
