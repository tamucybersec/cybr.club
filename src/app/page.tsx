import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import AboutBlurb from "@/components/AboutBlurb";
import ImageCarousel from "@/components/ImageCarousel";
import BigThreeBlurb from "@/components/BigThreeBlurb";
import ActivityGroups from "@/components/ActivityGroups";
import HomeImageCaptions from "@/components/HomeImageCaptions";
import WhatWeOffer from "@/components/WhatWeOffer";
import BackgroundOverlay from "@/components/BackgroundOverlay";
import Sponsorship from "@/components/Sponsorship";

export default function Home() {
	return (
		<>
			<BackgroundOverlay
				desktop={{
					size: "250% 120%",
					position: "center 40%",
				}}
				tablet={{
					size: "350% 120%",
					position: "center 45%",
				}}
				mobile={{
					size: "300% 120%",
					position: "center 45%",
				}}
			/>
			<NavBar />
			<HeroSection />
			<AboutBlurb />

			<ImageCarousel />
			<BigThreeBlurb />

			<HomeImageCaptions />
			<ActivityGroups />

			<WhatWeOffer />
			<Sponsorship />

			<Footer />
		</>
	);
}
