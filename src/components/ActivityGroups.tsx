"use client"

import Container from "@/components/Container"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Manual entries for each activity group
const activityGroups = [
  {
    id: 1,
    description: "Activity Group Description 1",
  },
  {
    id: 2,
    description: "Activity Group Description 2",
  },
  {
    id: 3,
    description: "Activity Group Description 3",
  },
  {
    id: 4,
    description: "Activity Group Description 4",
  },
  {
    id: 5,
    description: "Activity Group Description 5",
  },
  {
    id: 6,
    description: "Activity Group Description 6",
  },
  {
    id: 7,
    description: "Activity Group Description 7",
  },
  {
    id: 8,
    description: "Activity Group Description 8",
  },
]

function ActivityGroups() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const titleVariants: Variants = {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          className="font-azonix text-hero-heading text-center mb-12 lg:mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          activity groups
        </motion.h2>

        {/* Grid of activity groups */}
        <motion.div
          className="grid grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {activityGroups.map((group) => (
            <motion.div
              key={group.id}
              className="relative aspect-square group cursor-pointer"
              variants={itemVariants}
              onHoverStart={() => setHoveredItem(group.id)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <div className="w-full h-full bg-gradient-to-br from-white/8 to-white/4 rounded-md border border-white/10 transition-all duration-300 group-hover:border-white/20 overflow-hidden">
                {/* Placeholder background */}
                <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10"></div>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col p-6"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredItem === group.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-1"></div> {/* This pushes content to bottom */}
                  
                  {/* Description - Bottom left */}
                  <div className="mt-auto">
                    <p className="text-[#AAAAAA] text-base lg:text-lg font-ubuntu-sans font-medium max-w-[80%]">
                      {group.description}
                    </p>
                    
                    {/* Learn More Button - Right corner */}
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="outline"
                        className="text-sm font-ubuntu-sans px-4 py-2 h-auto bg-transparent border border-white/40 text-white hover:bg-transparent hover:border-white/70 transition-all duration-300"
                        style={{ borderRadius: "8px" }}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Container>
  )
}

export default ActivityGroups
