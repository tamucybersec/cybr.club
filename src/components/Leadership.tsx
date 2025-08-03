"use client"

import Container from "@/components/Container"
import { motion } from "framer-motion"
import Link from "next/link"
import { Linkedin, Instagram } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"

interface SocialLink {
  platform: "linkedin" | "instagram" | "discord"
  url: string
}

interface LeadershipMember {
  id: number
  name: string
  title: string
  image: string // placeholder for now
  socials: SocialLink[]
}

// Sample data - fully customizable
const leadershipMembers: LeadershipMember[] = [
  {
    id: 1,
    name: "bronny",
    title: "mvp",
    image: "placeholder-1",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
  {
    id: 2,
    name: "bronny",
    title: "mvp",
    image: "placeholder-2",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
    ],
  },
  {
    id: 3,
    name: "bronny",
    title: "mvp",
    image: "placeholder-3",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
  {
    id: 4,
    name: "bronny",
    title: "mvp",
    image: "placeholder-4",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
  {
    id: 5,
    name: "bronny",
    title: "mvp",
    image: "placeholder-5",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
    ],
  },
  {
    id: 6,
    name: "bronny",
    title: "mvp",
    image: "placeholder-6",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
  {
    id: 7,
    name: "bronny",
    title: "mvp",
    image: "placeholder-7",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
  {
    id: 8,
    name: "bronny",
    title: "mvp",
    image: "placeholder-8",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
    ],
  },
  {
    id: 9,
    name: "bronny",
    title: "mvp",
    image: "placeholder-9",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
  {
    id: 10,
    name: "bronny",
    title: "mvp",
    image: "placeholder-10",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
  {
    id: 11,
    name: "bronny",
    title: "mvp",
    image: "placeholder-11",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
    ],
  },
  {
    id: 12,
    name: "bronny",
    title: "mvp",
    image: "placeholder-12",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
  {
    id: 13,
    name: "bronny",
    title: "mvp",
    image: "placeholder-13",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
  {
    id: 14,
    name: "bronny",
    title: "mvp",
    image: "placeholder-14",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
    ],
  },
  {
    id: 15,
    name: "bronny",
    title: "mvp",
    image: "placeholder-15",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
  {
    id: 16,
    name: "bronny",
    title: "mvp",
    image: "placeholder-16",
    socials: [
      { platform: "linkedin", url: "https://google.com" },
      { platform: "instagram", url: "https://google.com" },
      { platform: "discord", url: "https://google.com" },
    ],
  },
]

function SocialIcon({ platform }: { platform: "linkedin" | "instagram" | "discord" }) {
  const iconProps = {
    size: 18,
    className: "text-white/70 hover:text-white transition-colors duration-200",
  }

  switch (platform) {
    case "linkedin":
      return <Linkedin {...iconProps} />
    case "instagram":
      return <Instagram {...iconProps} />
    case "discord":
      return (
        <FontAwesomeIcon
          icon={faDiscord}
          className="w-[18px] h-[18px] text-white/70 hover:text-white transition-colors duration-200"
        />
      )
    default:
      return null
  }
}

function LeadershipCard({ member }: { member: LeadershipMember }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="bg-gradient-to-br from-white/8 to-white/4 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:shadow-xl">
        {/* Image Section - No margin, fills to border */}
        <div className="relative aspect-square overflow-hidden">
          {/* Placeholder image */}
          <div className="w-full h-full bg-gradient-to-br from-white/15 to-white/8"></div>
        </div>

        {/* Content Section - Secondary background */}
        <div className="bg-[#171717] p-4 sm:p-5 lg:p-6">
          {/* Name */}
          <h3 className="font-ubuntu-sans text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{member.name}</h3>

          {/* Title */}
          <p className="font-ubuntu-sans text-sm sm:text-base text-white/80 mb-3 sm:mb-4">{member.title}</p>

          {/* Social Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            {member.socials.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <SocialIcon platform={social.platform} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Leadership() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.h1
          className="font-azonix text-hero-heading leading-tight mb-12 sm:mb-16 lg:mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Leadership
        </motion.h1>

        {/* Leadership Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {leadershipMembers.map((member) => (
            <LeadershipCard key={member.id} member={member} />
          ))}
        </motion.div>
      </div>
    </Container>
  )
}

export default Leadership
