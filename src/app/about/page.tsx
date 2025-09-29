import AboutLanding from "../../components/AboutLanding";
import AboutMissionText from "../../components/AboutMissionText";
import AboutMissionSlider from "../../components/AboutMissionSlider";
import AboutMissionImageText from "../../components/AboutMissionImageText";
import NavBar from "../../components/NavBar";
import AboutChunk from "../../components/AboutChunk";
import Leadership from "../../components/Leadership";
import Sponsorship from "../../components/Sponsorship";
import Footer from "../../components/Footer";
import { activityLeaders, officers } from "@/data/officers";

export default function AboutPage() {
	return (
		<>
			<NavBar />
			<AboutLanding />
			<AboutMissionText />
			<AboutMissionSlider />
			<AboutMissionImageText />
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
