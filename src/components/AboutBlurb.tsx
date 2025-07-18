"use client"

import Container from "@/components/Container"
import { motion } from "framer-motion"

function AboutBlurb() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
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
        viewport={{ once: true, amount: 0.3 }}
      >
    
        <div className="pt-36"></div>
        <motion.h2
          className="font-azonix text-hero-heading mb-6 sm:mb-8"
          variants={itemVariants}
        >
          <span className="block leading-[0.9]">we do things a little</span>
          <span className="block bg-gradient-to-r from-white to-[#321E1E] bg-clip-text text-transparent leading-[0.9] mt-1">
            differently here
          </span>
        </motion.h2>

        <motion.p
          className="font-ubuntu-sans text-hero-subtext text-[#AAAAAA] leading-tight max-w-5xl mx-auto px-4"
          variants={itemVariants}
        >
          Our expert student instructors lead hands-on classes throughout the week, covering everything from{" "}
          <strong className="font-bold">Hacking</strong>, <strong className="font-bold">Cloud Computing</strong>, and{" "}
          <strong className="font-bold">Networking</strong> to <strong className="font-bold">Linux</strong>,{" "}
          <strong className="font-bold">Hardware</strong>, <strong className="font-bold">Cyber Policy</strong>, and
          more.
        </motion.p>
      </motion.div>
    </Container>
  )
}

export default AboutBlurb
