"use client";

import Container from "@/components/Container";
import { Sponsor, sponsors, Tier } from "@/data/sponsors";
import { tierAttrs } from "@/lib/constants";
import { capitalize } from "@/lib/helpers";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function Sponsorship({ description }: { description?: string }) {
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

	function Sponsor(tier: Tier, sponsor: Sponsor) {
		const content = (
			<motion.div
				className={`w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-br rounded-full flex border justify-center items-center p-4`}
				style={{
					borderColor: `${tierAttrs[tier].color}36`,
					background: `linear-gradient(to bottom right, ${tierAttrs[tier].color}24, ${tierAttrs[tier].color}12)`,
				}}
				variants={itemVariants}
				title={sponsor.name}
			>
				<Image
					src={sponsor.image}
					alt={sponsor.name}
					height={300}
					width={300}
					unoptimized
					className={sponsor.className}
				/>
			</motion.div>
		);

		return sponsor.link ? (
			<Link
				href={sponsor.link}
				key={`${tier}-${sponsor.name}`}
			>
				{content}
			</Link>
		) : (
			<div key={`${tier}-${sponsor.name}`}>{content}</div>
		);
	}

	function SponsorTier(tier: Tier, sponsors: Sponsor[]) {
		if (sponsors.length === 0) {
			return undefined;
		}

		return (
			<div key={tier}>
				<h3 className={`${tierAttrs[tier].fontSize} font-azonix mb-4`}>
					{capitalize(tier)}
				</h3>
				<motion.div
					className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-12 mb-12 lg:mb-16"
					variants={containerVariants}
				>
					{sponsors.map((s) => Sponsor(tier, s))}
				</motion.div>
			</div>
		);
	}

	return (
		<Container>
			<motion.div
				className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				{/* Title */}
				<motion.h2
					className="font-azonix text-hero-heading mb-12 lg:mb-16"
					variants={itemVariants}
				>
					Sponsors
				</motion.h2>

				{Object.entries(sponsors).map(([tier, sponsors]) =>
					SponsorTier(tier as Tier, sponsors)
				)}

				{description && (
					<motion.p
						className="font-ubuntu-sans text-hero-subtext leading-tight max-w-2xl mx-auto mb-8 lg:mb-12"
						variants={itemVariants}
					>
						{description}
					</motion.p>
				)}
			</motion.div>
		</Container>
	);
}

export default Sponsorship;
