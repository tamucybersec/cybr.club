"use client";

import BackgroundOverlay from "@/components/BackgroundOverlay";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import PartnerGuide from "@/components/PartnerGuide";
import PartnerLanding from "@/components/PartnerLanding";
import Sponsorship from "@/components/Sponsorship";

export default function Partnership() {
	return (
		<>
			<BackgroundOverlay
				desktop={{
					size: "300% 150%",
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
				opacity={0.6}
			/>
			<NavBar />
			<PartnerLanding />
			<Benefits />
			<PartnerGuide />
			<Sponsorship description="Your company could be listed here! Back the biggest cybersecurity-centric community at Texas A&M. Every dollar raised goes straight into the very community we foster." />
			<Footer />
		</>
	);
}
