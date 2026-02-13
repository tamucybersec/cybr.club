import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import AboutBlurb from "@/components/AboutBlurb";
import ImageCarousel from "@/components/ImageCarousel";
import BigThreeBlurb from "@/components/BigThreeBlurb";
import ActivityGroups from "@/components/Home/ActivityGroups/ActivityGroups";
import HomeImageCaptions from "@/components/HomeImageCaptions";
import WhatWeOffer from "@/components/WhatWeOffer";
import BackgroundOverlay from "@/components/BackgroundOverlay";
import Sponsorship from "@/components/Sponsorship";
import Watermark from "@/components/Watermark";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
	return (
		<SmoothScroll>
			<BackgroundOverlay
				desktop={{
					size: "250% 120%",
					position: "center 25%",
				}}
				tablet={{
					size: "350% 120%",
					position: "center 30%",
				}}
				mobile={{
					size: "300% 120%",
					position: "center 30%",
				}}
				opacity={0.6}
				flip={false}
			/>
			<Watermark />
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
		</SmoothScroll>
	);
}
