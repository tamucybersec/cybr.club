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
import PageLoadOverlay from "@/components/PageLoadOverlay";

export default function Home() {
	return (
		<>
			<PageLoadOverlay />
			<BackgroundOverlay
				desktop={{
					size: "300% 120%",
					position: "center 57%",
				}}
				tablet={{
					size: "250% 120%",
					position: "center 25%",
				}}
				mobile={{
					size: "200% 120%",
					position: "center 20%",
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
