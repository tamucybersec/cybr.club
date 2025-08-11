"use client";

import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import PartnerGuide from "@/components/PartnerGuide";
import PartnerLanding from "@/components/PartnerLanding";
import Sponsorship from "@/components/Sponsorship";

export default function Partnership() {
	return (
		<>
			<NavBar />
			<PartnerLanding />
			<Benefits />
			<PartnerGuide />
			<Sponsorship description="Your company could be listed here! Back the biggest cybersecurity-centric community at Texas A&M. Every dollar raised goes straight into the very community we foster." />
			<Footer />
		</>
	);
}
