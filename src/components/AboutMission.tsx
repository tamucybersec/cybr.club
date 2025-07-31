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
    
        <motion.div className="relative pl-6" variants={itemVariants}>
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 to-white/10"></div>
          <p className="font-ubuntu-sans text-[22px] leading-relaxed text-white/70 mb-12 lg:mb-16 max-w-4xl">
            The club began with a focus on hacking and defense, but as we&apos;ve grown, so has our mission. Now, we explore a
            wide range of cybersecurity topics and ideas.
          </p>
        </motion.div>

        {/* Modern Slider */}
        <motion.div 
          className="w-full max-w-7xl mx-auto -ml-4"
          variants={itemVariants}
        >
          <ModernSlider />
        </motion.div>

        {/* Image and Text Section */}
        <motion.div 
          className="relative mt-12 lg:mt-16 flex flex-col lg:flex-row gap-8 items-center"
          variants={itemVariants}
        >
          {/* Image Placeholder - Left Side */}
          <div className="w-full lg:w-1/2 h-64 lg:h-[420px] bg-gradient-to-br from-white/5 to-white/10 rounded-lg overflow-hidden border border-white/10">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/40 text-sm">Image Placeholder</span>
            </div>
          </div>
          
          {/* Text Content - Right Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="font-ubuntu-sans text-[22px] leading-relaxed text-white/70 space-y-6">
              <p>
                Whether you&apos;re brand new or already experienced, we hope to help you discover just how broad and exciting the world of cybersecurity really is.
              </p>
              <p>
                Since we were established, our top priority has been helping members grow. Along the way, students have earned respected certifications, placed in national competitions, and landed roles at both startups and major companies all through the skills and support they found here.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  )
}

export default AboutMission
