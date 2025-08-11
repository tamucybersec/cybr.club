import Image from "next/image";
import Container from "./Container";
import { motion } from "framer-motion";
import { photos } from "@/data/photos";

function PartnerLanding() {
	return (
		<Container className="mt-[15dvh] sm:mt-[20dvh] px-4 sm:px-6 lg:px-8 mb-8">
			<div className="max-w-7xl mx-auto">
				<motion.div
					className="relative"
					initial="hidden"
					animate="visible"
				>
					{/* Floating image */}
					<motion.div
						className="float-left mr-6 mb-4 w-[300px] h-[300px] lg:w-[500px] relative"
						custom={1}
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
					<motion.div className="mb-4">
						<h1 className="font-azonix text-5xl">
							Back Tomorrow&apos;s Cyber Leaders
						</h1>
					</motion.div>

					<motion.p className="font-ubuntu-sans text-[22px] leading-relaxed text-white/70">
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

					{/* Clear the float after content */}
					<div className="clear-left"></div>
				</motion.div>
			</div>
		</Container>
	);
}

export default PartnerLanding;
