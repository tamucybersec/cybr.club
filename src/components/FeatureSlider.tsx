"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import { photos } from "@/data/photos"

// title: title of the item
// description: description of the item
// image: image of the item || placeholder
const carouselItems = [
  {
    id: 1,
    ...photos.redHatReturns
  },
  {
    id: 2,
    ...photos.makingWires
  },
  {
    id: 3,
    ...photos.allthenticate
  },
  {
    id: 4,
    ...photos.badApple
  },
  {
    id: 5,
    ...photos.paloSpeaker
  },
  {
    id: 6,
    ...photos.topGolf
  },
]

export default function ModernSlider() {
  const controls = useAnimation()
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  // change totalwidth if any items are added or removed
  const items = [...carouselItems, ...carouselItems]

  const startAnimation = useCallback(() => {
    if (!carouselRef.current) return

    const totalWidth = carouselRef.current.scrollWidth / 2 // distance to travel
    const currentX = x.get()

    controls.start({
      x: -totalWidth,
      transition: {
        duration: 30 * ((totalWidth + currentX) / totalWidth), // speed
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    })
  }, [controls, x])

  // Start animation immediately when component mounts
  useEffect(() => {
    startAnimation()
  }, [startAnimation])

  const handleItemHover = (itemId: number) => {
    setHoveredItem(itemId)
  }

  const handleItemHoverEnd = () => {
    setHoveredItem(null)
  }

  return (
    <div className="w-full">
      {/* Glassy Container - similar to WhatWeOffer but wider */}
      <div className="w-full bg-[#0B0B0B] rounded-2xl p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Carousel Container - inscribed within the glassy container */}
        <div className="relative overflow-hidden rounded-xl">
          <motion.div ref={carouselRef} className="flex py-4 sm:py-6 items-stretch" animate={controls} style={{ x }}>
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                className="relative flex-shrink-0 mx-2 sm:mx-3 group cursor-pointer"
                style={{
                  width: "clamp(280px, 25vw, 450px)", // Made wider
                  minWidth: "280px",
                  aspectRatio: "16/10", // Slightly taller aspect ratio
                  flex: "0 0 auto",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                }}
                onHoverStart={() => handleItemHover(item.id)}
                onHoverEnd={handleItemHoverEnd}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#171717] border border-white/10 transition-all duration-300 group-hover:border-white/20">
                  {/* Placeholder background */}
                  <div className="w-full h-full bg-gradient-to-br from-white/3 to-white/8"></div>

                  {/* Hover overlay with information */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-6 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white text-base sm:text-lg lg:text-xl font-ubuntu-sans font-medium mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm lg:text-base font-ubuntu-sans leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
