"use client"

import Container from "@/components/Container"
import { motion, type Variants } from "framer-motion"

function AboutBlurb() {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      },
    },
  }

  return (
		<Container className="py-16 sm:py-20 lg:py-24">
			<motion.div
				className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1, margin: "100px" }}
			>
				<div className="pt-36"></div>
				<motion.h2
					className="font-azonix text-hero-heading mb-6 sm:mb-8"
					variants={itemVariants}
				>
					<span className="block bg-gradient-to-r from-white to-[#321E1E] bg-clip-text text-transparent leading-[0.9] mt-1">
						Explore your interests
					</span>
				</motion.h2>

				<motion.p
					className="font-ubuntu-sans text-hero-subtext text-[#AAAAAA] leading-tight max-w-5xl mx-auto px-4"
					variants={itemVariants}
				>
					Our expert student instructors lead hands-on activity groups
					throughout the week, covering everything from{" "}
					<strong className="font-bold">Hacking</strong>,{" "}
					<strong className="font-bold">Cloud Computing</strong>, and{" "}
					<strong className="font-bold">Networking</strong> to{" "}
					<strong className="font-bold">Linux</strong>,{" "}
					<strong className="font-bold">Hardware</strong>,{" "}
					<strong className="font-bold">Cyber Policy</strong>, and
					more.
				</motion.p>
			</motion.div>
		</Container>
  );
}

export default AboutBlurb
