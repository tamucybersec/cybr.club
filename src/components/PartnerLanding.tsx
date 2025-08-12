import Image from "next/image";
import Container from "./Container";
import { motion, Variants } from "framer-motion";
import { photos } from "@/data/photos";

function PartnerLanding() {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
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
				duration: 0.6,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	};

	return (
		<Container className="mt-[15dvh] sm:mt-[20dvh] px-4 sm:px-6 lg:px-8 mb-8">
			<div className="max-w-7xl mx-auto">
				<motion.div
					className="relative"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* Floating image */}
					<motion.div
						className="float-left mr-6 mb-4 w-[300px] h-[300px] lg:w-[500px] relative"
						custom={1}
						variants={itemVariants}
						initial="hidden"
						animate="visible"
					>
						<div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/10">
							<Image
								className="rounded-lg object-cover"
								src={photos.paloWomenPanelists.path}
								alt={photos.paloWomenPanelists.title}
								fill
								unoptimized
							/>
						</div>
					</motion.div>

					{/* Content that wraps around the image */}
					<motion.div
						className="mb-4"
						variants={itemVariants}
					>
						<h1 className="font-azonix text-5xl">
							Back Tomorrow&apos;s Cyber Leaders
						</h1>
					</motion.div>

					<motion.p
						className="font-ubuntu-sans text-[22px] leading-relaxed text-white/70"
						variants={itemVariants}
					>
						{/* Your text content here */}
						Support the next generation of cybersecurity
						professionals by sponsoring the Texas A&M Cybersecurity
						Club. Our passionate and driven members depend on the
						generosity of sponsors to access career-launching
						opportunities. Your support makes it possible for
						students to compete in national competitions, attend
						industry conferences, earn respected certifications, and
						host hands-on technical workshops that build real-world
						skills.
					</motion.p>
				</motion.div>
			</div>
		</Container>
	);
}

export default PartnerLanding;
