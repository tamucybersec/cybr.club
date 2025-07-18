"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useAnimation, useInView, useMotionValue } from "framer-motion"

// Manual entries for each carousel item
const carouselItems = [
  {
    id: 1,
    description: "Description 1",
  },
  {
    id: 2,
    description: "Description 2",
  },
  {
    id: 3,
    description: "Description 3",
  },
  {
    id: 4,
    description: "Description 4",
  },
  {
    id: 5,
    description: "Description 5",
  },
  {
    id: 6,
    description: "Description 6",
  },
]

export default function ImageCarousel() {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(carouselRef, { once: true, amount: 0.1 })
  const x = useMotionValue(0)

  // Duplicate items for seamless looping
  const items = [...carouselItems, ...carouselItems]

  const startAnimation = useCallback(() => {
    if (!carouselRef.current) return

    const totalWidth = carouselRef.current.scrollWidth / 2 // Half because we duplicated items
    const currentX = x.get()

    controls.start({
      x: -totalWidth,
      transition: {
        duration: 30 * ((totalWidth + currentX) / totalWidth), // Adjust duration based on remaining distance
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    })
  }, [controls, x])

  useEffect(() => {
    if (isInView && !isHovered) {
      startAnimation()
    }
  }, [isInView, isHovered, startAnimation])

  const handleCarouselHoverStart = () => {
    setIsHovered(true)
    controls.stop()
  }

  const handleCarouselHoverEnd = () => {
    setIsHovered(false)
    setHoveredItem(null)
    // Resume animation from current position
    startAnimation()
  }

  const handleItemHover = (itemId: number) => {
    setHoveredItem(itemId)
  }

  const handleItemHoverEnd = () => {
    setHoveredItem(null)
  }

  return (
    <div className="w-full overflow-hidden mt-4 px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={carouselRef}
        className="flex py-8 items-stretch"
        animate={controls}
        style={{ x }}
        onHoverStart={handleCarouselHoverStart}
        onHoverEnd={handleCarouselHoverEnd}
      >
        {items.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            className="relative flex-shrink-0 mx-2 sm:mx-3 group cursor-pointer"
            style={{
              width: "clamp(300px, 25vw, 600px)",
              minWidth: "300px",
              aspectRatio: "4/3",
              flex: "0 0 auto",
              margin: "0 0.5rem",
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
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 group-hover:border-white/20">
              {/* Blank placeholder for image */}
              <div className="w-full h-full bg-gradient-to-br from-white/3 to-white/8"></div>

              {/* Hover overlay with clean glass effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent flex items-end pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredItem === item.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full p-6">
                  <p className="text-[#AAAAAA] text-lg font-ubuntu-sans text-center font-medium">{item.description}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
