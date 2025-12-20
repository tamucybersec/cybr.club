import Accordion from "@/components/Accordion";
import Calendar from "@/components/Calendar";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import NavSpacer from "@/components/NavSpacer";
import TitleContainer from "@/components/TitleContainer";
import EventCard from "@/components/EventCard";
import AccoladeCard from "@/components/AccoladeCard";
import { upcomingEvents, pastEvents, accolades } from "@/data/events";

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
								content: (
									<div className="space-y-5">
										{upcomingEvents.map(
											(event: any, index: any) => (
												<EventCard
													key={index}
													date={event.date}
													time={event.time}
													title={event.title}
													location={event.location}
													description={
														event.description
													}
												/>
											)
										)}
									</div>
								),
							},
							{
								title: "Past Events",
								content: (
									<div className="space-y-5">
										<div className="space-y-6">
											{pastEvents.map(
												(event: any, index: any) => (
													<EventCard
														key={index}
														date={event.date}
														time={event.time}
														title={event.title}
														location={
															event.location
														}
														description={
															event.description
														}
														isPast
													/>
												)
											)}
										</div>
									</div>
								),
							},
							{
								title: "Accolades",
								content: (
									<div className="space-y-4">
										<div className="space-y-4">
											{accolades.map(
												(accolade: any, index: any) => (
													<AccoladeCard
														key={index}
														date={accolade.date}
														name={accolade.name}
														certification={
															accolade.certification
														}
														link={accolade.link}
													/>
												)
											)}
										</div>
									</div>
								),
							},
						]}
					/>
				</div>
			</Container>
			<Footer />
		</>
	);
}
