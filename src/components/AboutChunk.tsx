"use client"

import Container from "@/components/Container"
import { motion, type Variants, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"

function ActivityGroupsNew() {
  const imageRef = useRef<HTMLDivElement>(null)
  const [maxScale, setMaxScale] = useState(0.9)

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  })

  // Create a smooth scaling transform
  const rawScale = useTransform(scrollYProgress, [0, 0.6], [0.9, 1.1])

  // Use effect to track and update max scale
  useEffect(() => {
    const unsubscribe = rawScale.on("change", (value) => {
      if (value > maxScale) {
        setMaxScale(value)
      }
    })

    return unsubscribe
  }, [rawScale, maxScale])

  // Final scale that never goes below the max reached
  const finalScale = useTransform(rawScale, (value) => Math.max(value, maxScale))

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

  const certifications = [
    {
      id: 1,
      title: "Certification 1",
      description: "Placeholder description for certification 1",
    },
    {
      id: 2,
      title: "Certification 2",
      description: "Placeholder description for certification 2",
    },
    {
      id: 3,
      title: "Certification 3",
      description: "Placeholder description for certification 3",
    },
    {
      id: 4,
      title: "Certification 4",
      description: "Placeholder description for certification 4",
    },
  ]

  const networkOrgs = [
    {
      id: 1,
      title: "Organization 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      title: "Organization 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
          {/* Activity Groups Title */}
          <motion.h1 className="font-azonix text-hero-heading leading-tight mb-8 lg:mb-12" variants={itemVariants}>
            <span className="block whitespace-nowrap">activity groups</span>
          </motion.h1>

          {/* Large Image with improved one-way scaling */}
          <div ref={imageRef} className="w-full mb-8 lg:mb-12">
            <motion.div
              className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]"
              style={{
                scale: finalScale,
                transition: "scale 0.3s ease-out",
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10"></div>
            </motion.div>
          </div>

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

            {/* Right side - Description - moved more to the left */}
            <motion.div className="flex-1 max-w-3xl lg:-ml-8" variants={itemVariants}>
              <p className="font-ubuntu-sans text-hero-subtext leading-tight">
                Our committees are the backbone of the club. While they&apos;re guided by officers, they&apos;re fully
                student-run, giving members the chance to take ownership and make a real impact behind the scenes.
              </p>
            </motion.div>
          </div>

          {/* Committee Cards Stack */}
          <motion.div className="space-y-6 lg:space-y-8 mb-12 lg:mb-16" variants={containerVariants}>
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
                  <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-white/15 to-white/8 rounded-xl border border-white/20">
                    {/* SVG Placeholder */}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Subtle off-tone section for calm transition */}
          <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-16 sm:mb-20 lg:mb-24 py-12 lg:py-16 bg-[#101010]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="w-full"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="font-ubuntu-sans text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/90 text-center max-w-6xl mx-auto">
                  Whether you&apos;re organizing competitions, managing outreach, or architecting the club&apos;s backend,
                  committees offer hands-on experience and are often the first step toward leadership within the club.
                  If you&apos;re interested in joining a committee you can...
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          className="mb-16 sm:mb-20 lg:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Certification Title */}
          <motion.h1 className="font-azonix text-hero-heading leading-tight mb-6 lg:mb-8" variants={itemVariants}>
            <span className="block whitespace-nowrap">certification</span>
          </motion.h1>

          {/* Certification Description */}
          <motion.p
            className="font-ubuntu-sans text-hero-subtext leading-tight max-w-4xl mb-12 lg:mb-16"
            variants={itemVariants}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </motion.p>

          {/* Certification Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" variants={containerVariants}>
            {certifications.map((cert, index) => (
              <motion.div key={cert.id} className="relative aspect-square group cursor-pointer" variants={itemVariants}>
                <div className="w-full h-full bg-gradient-to-br from-white/8 to-white/4 rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-white/20 overflow-hidden">
                  {/* Placeholder background */}
                  <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10"></div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white text-lg lg:text-xl font-ubuntu-sans font-medium mb-2">{cert.title}</h3>
                    <p className="text-white/90 text-sm lg:text-base font-ubuntu-sans leading-relaxed mb-4">
                      {cert.description}
                    </p>
                    <Button
                      className="font-azonix px-4 py-2 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow-lg transition-all duration-300 self-start"
                      style={{ borderRadius: "8px" }}
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Network Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Network Title */}
          <motion.h1 className="font-azonix text-hero-heading leading-tight mb-6 lg:mb-8" variants={itemVariants}>
            <span className="block whitespace-nowrap">Network</span>
          </motion.h1>

          {/* Network Description */}
          <motion.p
            className="font-ubuntu-sans text-hero-subtext leading-tight max-w-5xl mb-12 lg:mb-16"
            variants={itemVariants}
          >
            We work closely with the Texas A&M Cybersecurity Center, the home of programs like Viceroy and CLDP, to
            offer lessons that are practical, high quality, and backed by industry insight.
          </motion.p>

          {/* Network Organizations Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16"
            variants={containerVariants}
          >
            {networkOrgs.map((org, index) => (
              <motion.div
                key={org.id}
                className="bg-gradient-to-br from-white/8 to-white/4 rounded-2xl border border-white/10 overflow-hidden"
                variants={itemVariants}
              >
                {/* Fixed organization image - properly aligned with container */}
                <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-white/10 to-white/5"></div>

                {/* Content section */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="space-y-4">
                    <h3 className="font-azonix text-xl sm:text-2xl lg:text-3xl text-white">{org.title}</h3>
                    <p className="font-ubuntu-sans text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed">
                      {org.description}
                    </p>
                  </div>

                  {/* Learn More Button - Bottom right */}
                  <div className="flex justify-end mt-6">
                    <Button
                      className="font-azonix px-6 sm:px-8 py-2 sm:py-3 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ borderRadius: "10px" }}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Network Bottom Description */}
          <motion.p
            className="font-ubuntu-sans text-hero-subtext leading-tight max-w-4xl mx-auto text-center text-white/80"
            variants={itemVariants}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </motion.p>
        </motion.div>
      </div>
    </Container>
  )
}

export default ActivityGroupsNew
