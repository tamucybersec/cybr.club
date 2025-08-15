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
				desktopSize="300% 300%"
				desktopPosition="center 45%"
				tabletSize="350% 350%"
				tabletPosition="center 45%"
				mobileSize="400% 400%"
				mobilePosition="center 50%"
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
