import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import Image from "next/image"
import "./globals.css"

const azonix = localFont({
  src: "../../public/fonts/Azonix.otf",
  variable: "--font-azonix",
  weight: "400",
  style: "normal",
})

const ubuntuSans = localFont({
  src: "../../public/fonts/UbuntuSans-VariableFont_wdth,wght.ttf",
  variable: "--font-ubuntu-sans",
  weight: "100 900",
  style: "normal",
})

export const metadata: Metadata = {
  title: "cybr.club",
  description: "Texas A&M Cybersecurity Club",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`dark ${azonix.variable} ${ubuntuSans.variable} font-sans antialiased py-4 min-h-dvh relative overflow-x-hidden`}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-full pointer-events-none"
            style={{
              height: "max(200vh, 300vh)", 
              minHeight: "100vh",
            }}
          >
            <Image
              src="/svgs/HomeBackground.svg"
              alt="Background"
              fill
              priority
              className="pointer-events-none"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                width: "100%",
                height: "100%",
                transform: "scale(3)",
                top: "40%",
              }}
              sizes="100vw"
            />
          </div>
        </div>

        {/* Page Content */}
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  )
}
