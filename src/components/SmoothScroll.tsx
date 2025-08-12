"use client"

import type React from "react"

import Lenis from "lenis"
import { useEffect, useRef } from "react"

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const scrollPosition = useRef(0)

  useEffect(() => {
    // Save scroll position before unload
    const handleBeforeUnload = () => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("scrollPosition", window.scrollY.toString())
      }
    }

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2,
    })

    // Store the Lenis instance in the ref and globally
    lenisRef.current = lenis

    // Make Lenis available globally for other components
    if (typeof window !== "undefined") {
      ;(window as any).lenis = lenis
    }

    // Restore scroll position if available
    const savedPosition = sessionStorage.getItem("scrollPosition")
    if (savedPosition) {
      lenis.scrollTo(Number.parseInt(savedPosition, 10), { immediate: true })
      sessionStorage.removeItem("scrollPosition")
    }

    // Animation frame for smooth scrolling
    function raf(time: number) {
      lenis.raf(time)
      scrollPosition.current = window.scrollY
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    requestAnimationFrame(raf)

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Cleanup function
    return () => {
      lenis.destroy()
      lenisRef.current = null
      if (typeof window !== "undefined") {
        delete (window as any).lenis
      }
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return <>{children}</>
}
