"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface BackgroundOverlayProps {
	desktop: Sizes;
	tablet: Sizes;
	mobile: Sizes;
	opacity?: number;
	flip?: boolean;
}

interface Sizes {
	size: string;
	position: string;
	height?: string;
	minHeight?: string;
}

// desktopSize = "300% 300%",
// desktopPosition = "center 40%",
// desktopHeight = "max(500vh, 100%)",
// desktopMinHeight = "500vh",
// tabletSize = "350% 350%",
// tabletPosition = "center 35%",
// tabletHeight = "max(550vh, 100%)",
// tabletMinHeight = "550vh",
// mobileSize = "400% 400%",
// mobilePosition = "center 30%",
// mobileHeight = "max(600vh, 100%)",
// mobileMinHeight = "600vh",

export default function BackgroundOverlay({
	desktop,
	tablet,
	mobile,
	opacity = 1,
	flip = false,
}: BackgroundOverlayProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<>
			<Image
				className="hidden"
				src="/images/app/HomeBackground.png"
				alt=""
				priority
				loading="eager"
				onLoadingComplete={() => setLoaded(true)}
				unoptimized
				width={0}
				height={0}
			/>
			{/* Desktop Background */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={loaded ? { opacity: opacity } : { opacity: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="hidden lg:block absolute -z-10 pointer-events-none"
				style={{
					backgroundImage: "url('/images/app/HomeBackground.png')",
					backgroundSize: desktop.size,
					backgroundPosition: desktop.position,
					backgroundRepeat: "no-repeat",
					width: "100%",
					height: desktop.height ?? "100%",
					minHeight: desktop.minHeight ?? "100%",
					top: "0",
					left: "0",
					imageRendering: "-webkit-optimize-contrast",
					backfaceVisibility: "hidden",
					transform: flip
						? "translateZ(0) scaleX(-1)"
						: "translateZ(0)",
				}}
			/>

			{/* Tablet Background */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: opacity }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="hidden md:block lg:hidden absolute -z-10 pointer-events-none"
				style={{
					backgroundImage: "url('/images/app/HomeBackground.png')",
					backgroundSize: tablet.size,
					backgroundPosition: tablet.position,
					backgroundRepeat: "no-repeat",
					width: "100%",
					height: tablet.height ?? "100%",
					minHeight: tablet.minHeight ?? "100%",
					top: "0",
					left: "0",
					imageRendering: "-webkit-optimize-contrast",
					backfaceVisibility: "hidden",
					transform: flip
						? "translateZ(0) scaleX(-1)"
						: "translateZ(0)",
				}}
			/>

			{/* Mobile Background */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: opacity }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="block md:hidden absolute -z-10 pointer-events-none"
				style={{
					backgroundImage: "url('/images/app/HomeBackground.png')",
					backgroundSize: mobile.size,
					backgroundPosition: mobile.position,
					backgroundRepeat: "no-repeat",
					width: "100%",
					height: mobile.height ?? "100%",
					minHeight: mobile.minHeight ?? "100%",
					top: "0",
					left: "0",
					imageRendering: "-webkit-optimize-contrast",
					backfaceVisibility: "hidden",
					transform: flip
						? "translateZ(0) scaleX(-1)"
						: "translateZ(0)",
				}}
			/>
		</>
	);
}
