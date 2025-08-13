"use client";

interface BackgroundOverlayProps {
	desktop: Sizes;
	tablet: Sizes;
	mobile: Sizes;
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
}: BackgroundOverlayProps) {
	return (
		<>
			{/* Desktop Background */}
			<div
				className="hidden lg:block absolute -z-10 pointer-events-none"
				style={{
					backgroundImage: "url('/images/app/HomeBackground.avif')",
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
					transform: "translateZ(0)",
				}}
			/>

			{/* Tablet Background */}
			<div
				className="hidden md:block lg:hidden absolute -z-10 pointer-events-none"
				style={{
					backgroundImage: "url('/images/app/HomeBackground.avif')",
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
					transform: "translateZ(0)",
				}}
			/>

			{/* Mobile Background */}
			<div
				className="block md:hidden absolute -z-10 pointer-events-none"
				style={{
					backgroundImage: "url('/images/app/HomeBackground.avif')",
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
					transform: "translateZ(0)",
				}}
			/>
		</>
	);
}
