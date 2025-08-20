import BackgroundOverlay from "@/components/BackgroundOverlay";
import Footer from "@/components/Footer";
import JoinGuide from "@/components/JoinGuide";
import JoinLanding from "@/components/JoinLanding";
import NavBar from "@/components/NavBar";

export default function JoinPage() {
	return (
		<>
			<BackgroundOverlay
				desktop={{
					size: "300% 300%",
					position: "center 50%",
				}}
				tablet={{
					size: "250% 300%",
					position: "center 45%",
				}}
				mobile={{
					size: "200% 300%",
					position: "center 30%",
				}}
			/>
			<NavBar />
			<JoinLanding />
			<JoinGuide />
			<Footer />
		</>
	);
}
