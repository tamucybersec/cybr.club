import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAttendance, useEvents } from "@/hooks/useTable";
import { getCurrentSemester, getCurrentYear } from "@/scripts/helpers";
import type { CategoricalData } from "../types";
import { useMemo } from "react";
import CategoricalBarChart from "../Charts/CategoricalBarChart";

// make label a complete dissection of each date and attendance
// also make line chart of an event (x: date, y: attendees)
function EventAverageBar() {
	const { events } = useEvents();
	const { attendanceByEvent } = useAttendance();
	const currentSemester = getCurrentSemester();
	const currentYear = getCurrentYear();

	const { data, totalAttendees, totalEvents } = useMemo(() => {
		let totalEvents = 0;
		let totalAttendees = 0;
		const counts: Record<string, { events: number; attendees: number }> =
			{};

		for (const event of Object.values(events ?? [])) {
			totalEvents += 1;
			totalAttendees += (attendanceByEvent[event.code] ?? []).length;
			counts[event.name] ??= {
				events: 0,
				attendees: 0,
			};
			counts[event.name].events += 1;
			counts[event.name].attendees += (
				attendanceByEvent[event.code] ?? []
			).length;
		}

		const data: CategoricalData[] = Object.entries(counts)
			.map(([year, count]) => ({
				label: year,
				count: Math.floor(count.attendees / count.events),
			}))
			.sort((a, b) => b.count - a.count);

		return { data, totalAttendees, totalEvents };
	}, [events, attendanceByEvent]);

	return (
		<>
			<CardContent className="flex flex-col justify-center grow">
				<CategoricalBarChart
					metric={"Average Attendees"}
					data={data}
				/>
			</CardContent>
			<CardFooter className="flex flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					<p>
						<span className="font-bold">
							{Math.floor(
								totalAttendees / totalEvents
							).toLocaleString()}
						</span>{" "}
						Attendees Per Event on Average
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

export default EventAverageBar;
