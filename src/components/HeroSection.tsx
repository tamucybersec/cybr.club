"use client"

import Container from "@/components/Container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

function HeroSection() {
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
    <Container className="mt-[15dvh] sm:mt-[20dvh]">
      <div className="container">
        <motion.div
          className="flex flex-col gap-3 sm:gap-4 lg:gap-5 max-w-4xl ml-0 sm:-ml-4 lg:-ml-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="font-azonix text-hero-heading leading-tight" variants={itemVariants}>
            <span className="block whitespace-nowrap">Jump-start your Journey</span>
            <span className="block">in Cybersecurity</span>
          </motion.h1>

          <motion.p className="font-ubuntu-sans text-hero-subtext leading-snug max-w-3xl" variants={itemVariants}>
            Earn Certifications, Gain real-world experience,
            <br className="hidden sm:block" />
            and Find your calling in Cybersecurity
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-1" variants={itemVariants}>
            <Button
              asChild
              className="text-hero-button font-azonix px-8 sm:px-10 py-3 sm:py-4 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ borderRadius: "10px" }}
            >
              <Link href="/join">Join Us</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="text-hero-button font-azonix px-8 sm:px-10 py-3 sm:py-4 h-auto bg-transparent border border-white/40 text-white hover:bg-transparent hover:border-white/70 transition-all duration-300"
              style={{ borderRadius: "10px" }}
            >
              <Link href="#learn">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Container>
  )
}

export default HeroSection
