"use client"

import Container from "@/components/Container"
import { motion, Variants } from "framer-motion"
import ModernSlider from "./FeatureSlider"


function AboutMission() {
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Mission Text */}
        <motion.p
          className="font-ubuntu-sans text-[22px] leading-relaxed text-white/90 text-center mb-12 lg:mb-16 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          The club began with a focus on hacking and defense, but as we&apos;ve grown, so has our mission. Now, we explore a
          wide range of cybersecurity topics and ideas.
        </motion.p>

        {/* Modern Slider */}
        <motion.div variants={itemVariants}>
          <ModernSlider />
        </motion.div>
      </motion.div>
    </Container>
  )
}

export default AboutMission
