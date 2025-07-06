import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAttendance, useEvents } from "@/hooks/useTable";
import { useMemo } from "react";
import type { Event } from "../types";
import TooltipText from "../TooltipText";

function TopEventsList() {
	const { events, eventsByCode } = useEvents();
	const { attendanceByEvent } = useAttendance(eventsByCode);

	const numberOfEvents = 10;
	const top: Event[] = useMemo(() => {
		return events
			.toSorted(
				(a, b) =>
					(attendanceByEvent[b.code] ?? []).length -
					(attendanceByEvent[a.code] ?? []).length
			)
			.slice(0, numberOfEvents);
	}, [events, attendanceByEvent]);

	return (
		<Card className="grow">
			<CardHeader>
				<CardTitle className="text-center">
					<TooltipText
						tooltip={
							"Top events are calculated by the number of attendees they had."
						}
					>
						Top Events
					</TooltipText>
				</CardTitle>
			</CardHeader>
			<CardContent className="overflow-hidden">
				<ScrollArea className="flex flex-col max-h-[490px] -mx-4 px-4">
					<div className="flex flex-col gap-4">
						{top.map(({ code, name, date, category }, index) => (
							<Card
								key={index}
								className="bg-background"
							>
								<CardHeader>
									<CardTitle>{name}</CardTitle>
									<CardDescription>
										{category} held on {date}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<span className="font-bold">
										{(
											attendanceByEvent[code] ?? []
										).length.toLocaleString()}
									</span>{" "}
									members attended
								</CardContent>
							</Card>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}

export default TopEventsList;
