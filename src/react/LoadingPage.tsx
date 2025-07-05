import logo from "@/images/club-logos/white-shield-animated.gif";

function LoadingPage() {
	return (
		<div className="w-dvw h-dvh flex justify-center items-center text-center flex flex-col">
			<img
				src={logo.src}
				height={300}
				width={300}
			/>
			<h1 className="font-bold text-xl">Loading</h1>
		</div>
	);
}

export default LoadingPage;
