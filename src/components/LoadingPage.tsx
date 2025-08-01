"use client";

function LoadingPage() {
	return (
		<div className="w-dvw h-dvh justify-center items-center text-center flex flex-col">
			<img
				src={"/images/white-shield-animated.gif"}
				height={300}
				width={300}
			/>
			<h1 className="font-bold text-xl">Loading</h1>
		</div>
	);
}

export default LoadingPage;
