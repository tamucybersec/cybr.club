"use client";

import Container from "@/components/Container";
import TitleContainer from "@/components/TitleContainer";
import { Tier } from "@/data/sponsors";
import { tierAttrs } from "@/lib/constants";
import { capitalize } from "@/lib/helpers";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const emph = (text: string): ReactNode => {
	return <span className="font-bold">{text}</span>;
};

interface Benefits {
	cost: string;
	points: ReactNode[];
}
export const benefits: Record<Tier, Benefits> = {
	gold: {
		cost: "$2,000 or More",
		points: [
			<>Host a {emph("Dedicated Recruitment Event")}</>,
			<>{emph("Priority Scheduling")} for all events</>,
			"All benefits from lower tiers",
		],
	},
	silver: {
		cost: "$1,500",
		points: [
			<>
				Host a {emph("Technical Workshop")} or {emph("Meet-and-Greet")}
			</>,
			<>Access our club's {emph("Curated Resume Bank")}</>,
			"All benefits from lower tiers",
		],
	},
	bronze: {
		cost: "$1,000",
		points: [
			<>Recognition on {emph("Club T-Shirts")}</>,
			<>Recognition on the {emph("Club Website")}</>,
			"Mailing List Access",
		],
	},
};

function Benefits() {
	const Benefit = (tier: Tier, benefits: Benefits) => (
		<motion.div
			key={tier}
			className={`bg-gradient-to-br rounded grid grid-cols-2 border p-4`}
			style={{
				borderColor: `${tierAttrs[tier].color}36`,
				background: `linear-gradient(to bottom right, ${tierAttrs[tier].color}24, ${tierAttrs[tier].color}12)`,
			}}
			// variants={itemVariants}
		>
			<div className="flex flex-col justify-center items-center">
				<h3
					className="font-azonix text-4xl"
					style={{ color: `${tierAttrs[tier].color}B0` }}
				>
					{capitalize(tier)}
				</h3>
				<p className="font-ubuntu-sans text-lg">{benefits.cost}</p>
			</div>
			<ul className="list-disc list-inside text-xl font-ubuntu-sans font-regular">
				{benefits.points.map((p) => (
					<li>{p}</li>
				))}
			</ul>
		</motion.div>
	);

	return (
		<>
			<TitleContainer>Benefits</TitleContainer>
			<Container>
				<div className="flex flex-col gap-4 mb-4">
					{Object.entries(benefits).map(([tier, benefits]) =>
						Benefit(tier as Tier, benefits)
					)}
				</div>
			</Container>
		</>
	);
}

export default Benefits;
