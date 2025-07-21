"use client"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"

function WhatWeOffer() {
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

  const offerings = [
    {
      id: 1,
      title: "Offering 1",
      description:
        "This is a placeholder description for the first offering. It will be replaced with actual content later.",
    },
    {
      id: 2,
      title: "Offering 2",
      description:
        "This is a placeholder description for the second offering. It will be replaced with actual content later.",
    },
    {
      id: 3,
      title: "Offering 3",
      description:
        "This is a placeholder description for the third offering. It will be replaced with actual content later.",
    },
  ]

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <motion.div
        className="w-full bg-[#1e1c1c] rounded-2xl p-6 sm:p-8 lg:p-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Title */}
        <motion.h2 className="font-azonix text-hero-heading text-white mb-8 lg:mb-12" variants={itemVariants}>
          What We Offer
        </motion.h2>

        {/* Three containers */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6" variants={containerVariants}>
          {offerings.map((offering) => (
            <motion.div
              key={offering.id}
              className="bg-[#171717] rounded-lg p-6 lg:p-8 flex flex-col justify-between min-h-[300px] lg:min-h-[400px]"
              variants={itemVariants}
            >
              {/* Top section with title and SVG */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-ubuntu-sans text-lg lg:text-xl text-[#9C9C9C] font-medium">{offering.title}</h3>
                  {/* Placeholder SVG */}
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#9C9C9C] rounded opacity-50"></div>
                </div>

                {/* Description */}
                <p className="font-ubuntu-sans text-sm lg:text-base text-[#9C9C9C] leading-relaxed">
                  {offering.description}
                </p>
              </div>

              {/* Learn More button - bottom right */}
              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  className="text-sm font-ubuntu-sans px-4 py-2 h-auto bg-transparent border border-[#9C9C9C]/40 text-[#9C9C9C] hover:bg-transparent hover:border-[#9C9C9C]/70 transition-all duration-300"
                  style={{ borderRadius: "6px" }}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default WhatWeOffer
