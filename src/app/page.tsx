import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import AboutBlurb from "@/components/AboutBlurb";
import ImageCarousel from "@/components/ImageCarousel";
import BigThreeBlurb from "@/components/BigThreeBlurb";
import ActivityGroups from "@/components/ActivityGroups";
import HomeImageCaptions from "@/components/HomeImageCaptions";
import WhatWeOffer from "@/components/WhatWeOffer";
import Sponsorship from "@/components/Sponsorship";
import BackgroundOverlay from "@/components/BackgroundOverlay";

export default function Home() {
	return (
		<>
			<BackgroundOverlay
				desktopSize="300% 300%"
				desktopPosition="center 55%"
				tabletSize="350% 350%"
				tabletPosition="center 25%"
				mobileSize="400% 400%"
				mobilePosition="center 20%"
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
			
			<div className="h-[200px]"></div>
			<Footer />
		</>
	);
}
