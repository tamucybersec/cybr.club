import Accordion from "@/components/Accordion";
import Calendar from "@/components/Calendar";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import NavSpacer from "@/components/NavSpacer";
import TitleContainer from "@/components/TitleContainer";

export default function Home() {
	return (
		<>
			<NavBar />
			<NavSpacer />
			<TitleContainer>Events</TitleContainer>
			<Container>
				<div className="flex flex-col gap-4">
					<Calendar />
					<Accordion
						items={[
							{
								title: "Upcoming Events",
								content: "TODO",
							},
							{
								title: "Past Events",
								content: "TODO",
							},
							{
								title: "Accolades",
								content: "TODO",
							},
						]}
					/>
				</div>
			</Container>
			<Footer />
		</>
	);
}
