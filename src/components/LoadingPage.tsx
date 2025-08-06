"use client";

import Image from "next/image";

function LoadingPage() {
	return (
		<div className="w-dvw h-dvh justify-center items-center text-center flex flex-col">
			<Image
				src={"/images/club-logos/white-shield-animated.gif"}
				alt="Animated Club Logo"
				height={300}
				width={300}
			/>
			<h1 className="font-bold text-xl">Loading</h1>
		</div>
	);
}

export default LoadingPage;
