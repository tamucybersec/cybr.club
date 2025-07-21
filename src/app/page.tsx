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

export default function Home() {
	return (
		<div>
			<NavBar />
			<HeroSection />
			<AboutBlurb />
			
			<ImageCarousel />	
			<BigThreeBlurb />
			
			<HomeImageCaptions />
			<ActivityGroups />	
			
			<WhatWeOffer />
			<Sponsorship />
			
			<div className="h-[2000px]"></div>
			<Footer />
		</div>
	);
}
