import Accordion from "@/components/Accordion";
import Calendar from "@/components/Calendar";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import NavSpacer from "@/components/NavSpacer";
import TitleContainer from "@/components/TitleContainer";
import EventCard from "@/components/EventCard";
import AccoladeCard from "@/components/AccoladeCard";
import { events, accolades } from "@/data/events";
import { compareDates, getCurrentDatestr } from "@/lib/helpers";
import { Event } from "@/data/eventPageTypes";

export default function Home() {
	function filterPast(event: Event, includePast: boolean = false): boolean {
		const comp = compareDates(event.date, getCurrentDatestr());
		if (includePast) {
			return comp < 0;
		} else {
			return comp >= 0;
		}
	}

	function sortByDate<T extends { date: string }>(a: T, b: T) {
		return -compareDates(a.date, b.date);
	}

	const upcoming = events.filter((ev) => filterPast(ev)).toSorted(sortByDate);
	const past = events
		.filter((ev) => filterPast(ev, true))
		.toSorted(sortByDate);

	const items = [
		{
			title: "Upcoming Events",
			content: (
				<div className="space-y-5">
					{upcoming.length === 0 ? (
						<p className="text-center">No Upcoming Events</p>
					) : (
						upcoming.map((event: any, index: any) => (
							<EventCard
								key={index}
								date={event.date}
								time={event.time}
								title={event.title}
								location={event.location}
								description={event.description}
							/>
						))
					)}
				</div>
			),
		},
		{
			title: "Past Events",
			content: (
				<div className="space-y-5">
					<div className="space-y-6">
						{past.length === 0 ? (
							<p className="text-center">No Past Events</p>
						) : (
							past.map((event: any, index: any) => (
								<EventCard
									key={index}
									date={event.date}
									time={event.time}
									title={event.title}
									location={event.location}
									description={event.description}
									isPast
								/>
							))
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
						{accolades
							.toSorted(sortByDate)
							.map((accolade: any, index: any) => (
								<AccoladeCard
									key={index}
									date={accolade.date}
									name={accolade.name}
									certification={accolade.certification}
									link={accolade.link}
								/>
							))}
					</div>
				</div>
			),
		},
	];

	return (
		<>
			<NavBar />
			<NavSpacer />
			<TitleContainer>Events</TitleContainer>
			<Container>
				<div className="flex flex-col gap-4">
					<Calendar />
					<div className="px-4">
						<Accordion items={items} />
					</div>
				</div>
			</Container>
			<Footer />
		</>
	);
}
