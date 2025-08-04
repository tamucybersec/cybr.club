"use client"

import Container from "@/components/Container"
import { motion, Variants } from "framer-motion"

function SponsorshipNew() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
        className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Title */}
        <motion.h2 className="font-azonix text-hero-heading mb-12 lg:mb-16" variants={itemVariants}>
          sponsors
        </motion.h2>

        {/* Two sponsor circles - MOVED TO TOP */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-12 mb-12 lg:mb-16"
          variants={containerVariants}
        >
          <motion.div
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-white/10 to-white/5 rounded-full border border-white/10"
            variants={itemVariants}
          ></motion.div>

          <motion.div
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-white/10 to-white/5 rounded-full border border-white/10"
            variants={itemVariants}
          ></motion.div>
        </motion.div>

        {/* Description - First Part - MOVED AFTER IMAGES */}
        <motion.p
          className="font-ubuntu-sans text-hero-subtext leading-tight max-w-5xl mx-auto mb-8 lg:mb-12"
          variants={itemVariants}
        >
          Thanks to the support of our generous sponsors, we&apos;re able to reinvest in our members and the broader community, creating opportunities that make
          a real difference in students&apos; growth, confidence, and career paths.
        </motion.p>
      </motion.div>
    </Container>
  )
}

export default SponsorshipNew
