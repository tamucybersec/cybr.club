"use client"

import Container from "@/components/Container"
import { motion, Variants } from "framer-motion"
import ModernSlider from "./FeatureSlider"

function AboutMissionSlider() {
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
    <Container className="py-8 sm:py-12 lg:py-16">
      <motion.div
        className="w-full max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="w-full"
          variants={itemVariants}
        >
          <ModernSlider />
        </motion.div>
      </motion.div>
    </Container>
  )
}

export default AboutMissionSlider