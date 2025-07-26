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
      title: "title 1",
      description:
        "le place holder",
    },
    {
      id: 2,
      title: "title 2",
      description:
        "le place holder",
    },
    {
      id: 3,
      title: "title 3",
      description:
        "le place holder",
    },
  ]

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <motion.div
        className="w-full rounded-2xl p-6 sm:p-8 lg:p-12 border border-white/5 shadow-2xl shadow-black/20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{
          background: 'rgba(15, 15, 15, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Title */}
        <motion.h2 
          className="font-azonix text-hero-heading text-white mb-8 lg:mb-12" 
          variants={itemVariants}
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          What We Offer
        </motion.h2>

        {/* Three containers */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8" 
          variants={containerVariants}
        >
          {offerings.map((offering) => (
            <motion.div
              key={offering.id}
              className="relative rounded-xl p-6 lg:p-8 flex flex-col justify-between min-h-[300px] lg:min-h-[400px] overflow-hidden group"
              variants={itemVariants}
              style={{
                background: 'rgba(30, 30, 30, 0.5)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Border highlight effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/20 transition-all duration-300 pointer-events-none" />
              
              {/* Top section with title and icon */}
              <div>
                <div className="flex items-start justify-between mb-6">
                  <h3 className="font-ubuntu-sans text-xl lg:text-2xl font-semibold text-white">
                    {offering.title}
                  </h3>
                  {/* Simple icon placeholder */}
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white/80 rounded-full"></div>
                  </div>
                </div>

                {/* Description */}
                <p className="font-ubuntu-sans text-sm lg:text-base text-white/70 leading-relaxed">
                  {offering.description}
                </p>
              </div>

              {/* Learn More button - bottom right */}
              <div className="flex justify-end mt-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block"
                >
                  <Button
                    variant="outline"
                    className="text-sm font-ubuntu-sans px-6 py-2 h-auto bg-white/5 border border-white/20 text-white/90 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300"
                    style={{ 
                      borderRadius: "6px"
                    }}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default WhatWeOffer
