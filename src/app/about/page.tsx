import AboutLanding from "../../components/AboutLanding";
import AboutMission from "../../components/AboutMission";
import NavBar from "../../components/NavBar";
import AboutChunk from "../../components/AboutChunk";
import Leadership from "../../components/Leadership";
import Sponsorship from "../../components/Sponsorship";
import Footer from "../../components/Footer";
import { activityLeaders, officers } from "@/data/leadership";

export default function AboutPage() {
	return (
		<>
			<NavBar />
			<AboutLanding />
			<AboutMission />
			<AboutChunk />
			<Leadership
				name={"Officers"}
				group={officers}
			/>
			<Leadership
				name={"Activity Leaders"}
				group={Object.values(activityLeaders).flat()}
			/>
			<Sponsorship
				description="Thanks to the support of our generous sponsors, we're
					able to reinvest in our members and the broader community,
					creating opportunities that make a real difference in
					students' growth, confidence, and career paths."
			/>

			<div className="h-32"></div>
			<Footer />
		</>
	);
}
