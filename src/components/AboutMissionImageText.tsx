"use client"

import Container from "@/components/Container"
import { motion, Variants } from "framer-motion"

function AboutMissionImageText() {
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
        className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 lg:gap-12 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Image Placeholder - Left Side */}
        <motion.div
          className="flex-1 w-full max-w-2xl relative h-[400px] lg:h-[400px] xl:h-[400px]"
          variants={itemVariants}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/10"></div>
        </motion.div>

        {/* Text Content - Right Side */}
        <motion.div
          className="flex-1 max-w-2xl lg:pl-8"
          variants={itemVariants}
        >
          <p className="font-ubuntu-sans text-base sm:text-lg lg:text-[22px] leading-relaxed text-white/70 mb-4 lg:mb-6">
            Whether you&apos;re brand new or already experienced, we hope to help you discover just how broad and exciting the world of cybersecurity really is.
          </p>
          <p className="font-ubuntu-sans text-base sm:text-lg lg:text-[22px] leading-relaxed text-white/70">
            Since we were established, our top priority has been helping members grow. Along the way, students have earned respected certifications, placed in national competitions, and landed roles at both startups and major companies all through the skills and support they found here.
          </p>
        </motion.div>
      </motion.div>
    </Container>
  )
}

export default AboutMissionImageText