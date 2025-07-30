"use client"

import Container from "@/components/Container"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"

function ActivityGroupsNew() {
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

  const scaleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const committees = [
    {
      id: 1,
      title: "Committee Title 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      svg: "placeholder-svg-1",
    },
    {
      id: 2,
      title: "Committee Title 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      svg: "placeholder-svg-2",
    },
    {
      id: 3,
      title: "Committee Title 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      svg: "placeholder-svg-3",
    },
  ]

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Activity Groups Section */}
        <motion.div
          className="mb-16 sm:mb-20 lg:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Activity Groups Title - Same styling as hero */}
          <motion.h1 className="font-azonix text-hero-heading leading-tight mb-8 lg:mb-12" variants={itemVariants}>
            <span className="block whitespace-nowrap">activity groups</span>
          </motion.h1>

          {/* Large Image with scroll-triggered expansion */}
          <motion.div
            className="w-full mb-8 lg:mb-12"
            variants={scaleVariants}
            whileInView={{
              scale: [0.95, 1.05],
              transition: { duration: 1.2, ease: "easeOut" },
            }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10"></div>
          </motion.div>

          {/* Description Text */}
          <motion.p className="font-ubuntu-sans text-hero-subtext leading-tight max-w-5xl" variants={itemVariants}>
            Our activity groups are led in collaboration with student ambassadors from companies like{" "}
            <strong className="font-bold">AWS</strong>, <strong className="font-bold">Red Hat</strong>,{" "}
            <strong className="font-bold">Cisco</strong>, and <strong className="font-bold">Palo Alto Networks</strong>,
            giving members direct access to current tools and real-world expertise.
          </motion.p>
        </motion.div>

        {/* Committees Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Committees Title and Description */}
          <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 lg:gap-12 mb-12 lg:mb-16">
            {/* Left side - Title */}
            <motion.div className="flex-1 max-w-2xl lg:pr-8" variants={itemVariants}>
              <h1 className="font-azonix text-hero-heading leading-tight">
                <span className="block whitespace-nowrap">committees</span>
              </h1>
            </motion.div>

            {/* Right side - Description */}
            <motion.div className="flex-1 max-w-3xl" variants={itemVariants}>
              <p className="font-ubuntu-sans text-hero-subtext leading-tight">
                Our committees are the backbone of the club. While they&apos;re guided by officers, they&apos;re fully
                student-run, giving members the chance to take ownership and make a real impact behind the scenes.
                Whether you&apos;re organizing competitions, managing outreach, or architecting the club&apos;s backend,
                committees offer hands-on experience and are often the first step toward leadership within the club.
              </p>
            </motion.div>
          </div>

          {/* Committee Cards Stack */}
          <motion.div className="space-y-6 lg:space-y-8" variants={containerVariants}>
            {committees.map((committee, index) => (
              <motion.div
                key={committee.id}
                className="bg-gradient-to-br from-white/8 to-white/4 rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10 relative overflow-hidden"
                variants={itemVariants}
                custom={index}
              >
                <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8">
                  {/* Left side content */}
                  <div className="flex-1 space-y-4 lg:space-y-6">
                    {/* Title - Top left */}
                    <h3 className="font-azonix text-xl sm:text-2xl lg:text-3xl text-white">{committee.title}</h3>

                    {/* Description - Left area */}
                    <p className="font-ubuntu-sans text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl">
                      {committee.description}
                    </p>

                    {/* Apply Button - Bottom left area */}
                    <div className="pt-4 lg:pt-6">
                      <Button
                        className="font-azonix px-6 sm:px-8 py-2 sm:py-3 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                        style={{ borderRadius: "10px" }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  {/* Right side - SVG placeholder */}
                  <motion.div
                    className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-white/15 to-white/8 rounded-xl border border-white/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* SVG Placeholder */}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Container>
  )
}

export default ActivityGroupsNew
