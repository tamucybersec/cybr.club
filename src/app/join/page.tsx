import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import NavSpacer from "@/components/NavSpacer";
import TitleContainer from "@/components/TitleContainer";

export default function JoinPage() {
	return (
		<>
			<NavBar />
			<NavSpacer />
			<TitleContainer>Join Us!</TitleContainer>
			<p>
				Everyone is welcome here, no matter your experience level or how
				much time you can commit. There are no dues, no required
				meetings, and plenty of groups tailored to different skill
				levels and interests. Joining is simple:
			</p>
			<ol>
				<li>Join our Discord (link)</li>
				<li>Follow the onboarding instructions</li>
				<li>Head to the #attendance channel (link)</li>
				<li>Use the command /register</li>
				<li>Fill out the short form from the link provided</li>
			</ol>
			<p>
				Need to update your info later? Just run the /register command
				again. It&apos;s that easy.
			</p>
			<Footer />
		</>
	);
}
