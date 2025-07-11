import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";

export default function Home() {
	return (
		<div>
			<NavBar />
			<HeroSection />
			<div className="h-[2000px]"></div>
			<Footer />
		</div>
	);
}
