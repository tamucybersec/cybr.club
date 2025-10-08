"use client"

import Container from "@/components/Container"
import { motion, Variants } from "framer-motion"

function AboutMissionText() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

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
  }

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <motion.div
        className="flex-1 max-w-2xl lg:pr-8 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="relative" variants={itemVariants}>
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 to-white/10"></div>
          <p className="font-ubuntu-sans text-base sm:text-lg lg:text-[22px] leading-relaxed text-white/70 mb-12 lg:mb-16 pl-6">
            The club began with a focus on hacking and defense, but as we&apos;ve grown, so has our mission. Now, we explore a
            wide range of cybersecurity topics and ideas.
          </p>
        </motion.div>
      </motion.div>
    </Container>
  )
}

export default AboutMissionText