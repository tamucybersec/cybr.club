import { EventInfo } from "./ProfileViewer";
import React from "react";
import { Event, Semester } from "@/lib/types";
import { capitalize, compareDates, compareSemesters } from "@/lib/helpers";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import EventCodeLink from "../Event/EventCodeLink";

interface Props {
	eventInfo: EventInfo;
}

function EventList({ eventInfo }: Props) {
	const EventTable = ({ events }: { events: Event[] }) => (
		<ScrollArea>
			<Table className="mb-1">
				<TableHeader>
					<TableRow>
						<TableHead>Code</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{events
						.sort((a, b) => compareDates(b.date, a.date))
						.map((ev) => (
							<TableRow
								key={ev.code}
								className="max-w-full"
							>
								<TableCell>
									<EventCodeLink code={ev.code} />
								</TableCell>
								<TableCell>{ev.name}</TableCell>
								<TableCell>{ev.date}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</ScrollArea>
	);

	const TermEvents = (
		year: string,
		semester: string,
		categoryInfo: Record<string, Event[]>
	) => (
		<AccordionItem
			key={`${semester}-${year}`}
			value={`${semester}-${year}`}
			className="flex flex-col gap-4"
		>
			<AccordionTrigger className="text-xl font-bold">
				{capitalize(semester)} {year} (
				{Object.values(categoryInfo)
					.reduce((total, evs) => total + evs.length, 0)
					.toLocaleString()}
				)
			</AccordionTrigger>
			{Object.entries(categoryInfo).map(([category, events]) => {
				return (
					<AccordionContent
						key={category}
						className="flex flex-col gap-2"
					>
						<h4>
							{category} ({events.length})
						</h4>
						<EventTable events={events} />
					</AccordionContent>
				);
			})}
		</AccordionItem>
	);

	return (
		<Accordion type="multiple">
			{Object.entries(eventInfo)
				.sort(([yearA], [yearB]) => yearB.localeCompare(yearA))
				.map(([year, semesterInfo]) =>
					Object.entries(semesterInfo)
						.sort(([semA], [semB]) =>
							compareSemesters(semB as Semester, semA as Semester)
						)
						.map(([semester, categoryInfo]) =>
							TermEvents(year, semester, categoryInfo)
						)
				)}
		</Accordion>
	);
}

export default EventList;
