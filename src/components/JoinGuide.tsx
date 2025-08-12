"use client";

import Container from "@/components/Container";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

	const Anchor = (href: string, text: string) => (
		<Link
			href={href}
			className="font-bold hover:underline text-blue-400 hover:text-blue-300 visited:text-purple-400"
		>
			{text}
		</Link>
	);

	const Pre = (text: string) => (
		<pre className="inline-block bg-border mx-1 px-2 rounded">{text}</pre>
	);

	return (
		<Container>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<Card className="mt-8 from-white/10 to-white/5 rounded-lg border border-white/10">
					<CardContent className="flex justify-between item-center gap-4">
						<motion.ol
							className="list-disc list-inside font-ubuntu-sans text-xl"
							variants={itemVariants}
						>
							<li>
								Join our{" "}
								{Anchor(
									"https://discord.gg/nCpZzbB",
									"Discord"
								)}
							</li>
							<li>Follow the onboarding instructions</li>
							<li>
								Head to the{" "}
								{Anchor(
									"https://discord.com/channels/631254092332662805/1009108768639946783",
									"#attendance channel"
								)}
							</li>
							<li>Use the command {Pre("/register")}</li>
							<li>
								Fill out the short form from the link provided
							</li>
						</motion.ol>
						<motion.div
							className="w-[400px] relative"
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
					</CardContent>
					<CardFooter>
						<motion.div className="flex items-center" variants={itemVariants}>
							<p className="font-ubuntu-sans text-xl">
								Need to update your info later? Just run the
								command again.
							</p>
							{Pre("/register")}
							<p className="font-ubuntu-sans text-xl">
								It&apos;s that easy.
							</p>
						</motion.div>
					</CardFooter>
				</Card>
			</motion.div>
		</Container>
	);
}

export default JoinGuide;
