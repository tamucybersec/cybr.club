"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function Watermark() {
	const imageVariants = {
		hidden: {
			opacity: 0,
			y: 30,
			scale: 0.98,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 1.2,
				ease: [0.215, 0.61, 0.355, 1],
			},
		},
	} as const;

	return (
		<motion.div
			className="w-full top-0 absolute h-screen overflow-x-hidden pointer-events-none"
			variants={imageVariants}
			initial="hidden"
			animate="visible"
		>
			<div
				className={`relative w-full 
                   h-[50vh]    translate-x-30    translate-y-20
                sm:h-[60vh] sm:translate-x-40 sm:translate-y-20
                md:h-[70vh] md:translate-x-60 md:translate-y-20
                lg:h-[80vh] lg:translate-x-80 lg:translate-y-10`}
			>
				<Image
					src="/images/club-logos/white-shield.svg"
					alt="Cybersecurity Club Shield Logo"
					fill
					sizes="(max-width: 1024px) 100vw, 50vw"
					priority
					unoptimized
					className="object-contain object-center pointer-events-none"
					style={{
						filter: "opacity(.03)",
					}}
				/>
			</div>
		</motion.div>
	);
}

export default Watermark;
