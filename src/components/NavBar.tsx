"use client"

import type React from "react"

import Link from "next/link"
import Container from "./Container"
import { Button } from "./ui/button"
import Logo from "./Logo"
import { motion } from "framer-motion"

function NavBar() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-4 sm:top-8 left-0 right-0 z-50"
    >
      <Container>
        <div className="mx-4 sm:mx-12 lg:mx-20 xl:mx-24">
          <div className="flex justify-between items-center rounded-2xl px-4 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-[20px] border border-white/10 shadow-2xl">
            <Link href="/">
              <Logo />
            </Link>

            <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/events">Events</NavLink>
              <NavLink href="/partnership">Partnership</NavLink>

              <Button
                asChild
                className="font-azonix px-6 lg:px-8 py-2 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ borderRadius: "10px" }}
              >
                <Link href="/join">Join Us</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                asChild
                className="font-azonix px-4 py-2 h-auto bg-white text-black hover:bg-gray-100 border-0 shadow-lg transition-all duration-300 text-sm"
                style={{ borderRadius: "10px" }}
              >
                <Link href="/join">Join Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group">
      <span className="text-white/80 hover:text-white transition-colors duration-300 font-medium">{children}</span>
      <motion.div
        className="absolute -bottom-1 left-0 h-0.5 bg-white"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </Link>
  )
}

export default NavBar
