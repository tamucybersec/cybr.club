"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { useAttendance, useEvents } from "@/hooks/useTable";
import type { CategoricalData } from "../../lib/types";
import { useMemo } from "react";
import CategoricalBarChart from "../Charts/CategoricalBarChart";

// make label a complete dissection of each date and attendance
// also make line chart of an event (x: date, y: attendees)
function EventCumulativeBar() {
	const { events, eventsByCode } = useEvents();
	const { attendanceByEvent } = useAttendance(eventsByCode);

	const { data, totalAttendees, totalEvents } = useMemo(() => {
		let totalEvents = 0;
		let totalAttendees = 0;
		const counts: Record<string, number> = {};

		for (const event of events) {
			const attendees = (attendanceByEvent[event.code] ?? []).length;
			totalEvents += 1;
			totalAttendees += attendees;
			if (attendees > 0) {
				counts[event.category] ??= 0;
				counts[event.category] += attendees;
			}
		}

		const data: CategoricalData[] = Object.entries(counts)
			.map(([year, count]) => ({
				label: year,
				count: count,
			}))
			.sort((a, b) => b.count - a.count);

		return { data, totalAttendees, totalEvents };
	}, [events, attendanceByEvent]);

	return (
		<>
			<CardContent className="flex flex-col justify-center grow">
				<CategoricalBarChart
					metric={"Attendees"}
					data={data}
				/>
			</CardContent>
			<CardFooter className="flex flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					<p>
						<span className="font-bold">
							{totalAttendees.toLocaleString()}
						</span>{" "}
						Total Attendees
					</p>
				</div>
				<div className="leading-none text-muted-foreground">
					Over{" "}
					<span className="font-bold">
						{totalEvents.toLocaleString()}
					</span>{" "}
					Total Events This Semester
				</div>
			</CardFooter>
		</>
	);
}

export default EventCumulativeBar;
