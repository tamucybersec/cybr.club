"use client"

import Container from "@/components/Container"
import { motion, Variants } from "framer-motion"

function NoBarriersSection() {
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
        ease: [0.25, 0.1, 0.25, 1]
      },
    },
  }

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left side - No payment, no prereqs, no pressure */}
        <motion.div className="flex items-center gap-6 lg:gap-8" variants={itemVariants}>
          {/* Vertical line */}
          <div className="w-0.5 h-24 sm:h-28 lg:h-32 bg-white/40"></div>

          {/* Text content */}
          <div className="font-azonix text-hero-heading leading-[0.85]">
            <div className="block">No payment,</div>
            <div className="block">no prereqs,</div>
            <div className="block">no pressure.</div>
          </div>
        </motion.div>

        {/* Right side - Description */}
        <motion.div className="flex-1 max-w-3xl" variants={itemVariants}>
          <p className="font-ubuntu-sans pb-5 text-[#AAAAAA] text-hero-subtext leading-tight">
            <span className="block">Come to any meetings you want, whenever it works for you.</span>
            <span className="block">There are no fees, no prerequisites, and absolutely no pressure.</span>
            <span className="block">Just show up when you're interested.</span>
          </p>
        </motion.div>
      </motion.div>
    </Container>
  )
}

export default NoBarriersSection
