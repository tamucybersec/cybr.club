"use client"

interface BackgroundOverlayProps {
  desktopSize?: string
  desktopPosition?: string
  tabletSize?: string
  tabletPosition?: string
  mobileSize?: string
  mobilePosition?: string
  height?: string
  minHeight?: string
}

export default function BackgroundOverlay({
  desktopSize = "300% 300%",
  desktopPosition = "center 40%",
  tabletSize = "350% 350%",
  tabletPosition = "center 35%",
  mobileSize = "400% 400%",
  mobilePosition = "center 30%",
  height = "max(500vh, 100%)",
  minHeight = "500vh",
}: BackgroundOverlayProps) {
  return (
    <>
      {/* Desktop Background */}
      <div
        className="hidden lg:block absolute -z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/svgs/app/HomeBackground.svg')",
          backgroundSize: desktopSize,
          backgroundPosition: desktopPosition,
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: height,
          minHeight: minHeight,
          top: "0",
          left: "0",
          imageRendering: "-webkit-optimize-contrast",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />

      {/* Tablet Background */}
      <div
        className="hidden md:block lg:hidden absolute -z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/svgs/app/HomeBackground.svg')",
          backgroundSize: tabletSize,
          backgroundPosition: tabletPosition,
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "max(550vh, 100%)",
          minHeight: "550vh",
          top: "0",
          left: "0",
          imageRendering: "-webkit-optimize-contrast",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />

      {/* Mobile Background */}
      <div
        className="block md:hidden absolute -z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/svgs/app/HomeBackground.svg')",
          backgroundSize: mobileSize,
          backgroundPosition: mobilePosition,
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "max(600vh, 100%)",
          minHeight: "600vh",
          top: "0",
          left: "0",
          imageRendering: "-webkit-optimize-contrast",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />
    </>
  )
}
