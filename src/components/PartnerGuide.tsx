"use client";

import Container from "@/components/Container";
import TitleContainer from "@/components/TitleContainer";
import { ExternalLink } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

function PartnerGuide() {
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

	return (
		<>
			<motion.div
				variants={titleVariants}
				initial="hidden"
				whileInView={"visible"}
				viewport={{ amount: 0.3, once: true }}
			>
				<Link href={"/pdfs/Sponsorship Packet 2025-2026.pdf"}>
					<TitleContainer className="mt-8 flex gap-6">
						Partnership Guide
						<ExternalLink size={36} />
					</TitleContainer>
				</Link>
			</motion.div>
			<Container>
				<motion.div
					className="w-full h-screen"
					variants={containerVariants}
					initial="hidden"
					whileInView={"visible"}
					viewport={{ amount: 0.2, once: true }}
				>
					<motion.object
						variants={itemVariants}
						data="/pdfs/Sponsorship Packet 2025-2026.pdf"
						type="application/pdf"
						width="100%"
						style={{ height: "calc(100% - 6.5rem)" }}
					>
						<p>
							<a href="/pdfs/Sponsorship Packet 2025-2026.pdf">
								Sponsorship Packet
							</a>
						</p>
					</motion.object>
				</motion.div>
			</Container>
		</>
	);
}

export default PartnerGuide;
