import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CategoricalLineChart from "../Charts/CategoricalLineChart";
import { useAttendance, useEvents } from "@/hooks/useTable";
import { useEffect, useMemo, useState } from "react";
import {
	VALID_CATEGORIES,
	type CategoricalData,
	type Category,
} from "../types";
import { compareEventDates } from "@/scripts/helpers";

// TODO
// list of retention rates between meetings rather than average retention rate
function EventAttendanceOverTime() {
	const { events, eventsByCode } = useEvents();
	const { attendanceByEvent } = useAttendance(eventsByCode);

	const filteredCategories: string[] = useMemo(
		() =>
			Array.from(
				new Set(
					(events ?? [])
						.filter(
							(ev) =>
								(attendanceByEvent[ev.code] ?? []).length > 0
						)
						.map((ev) => ev.category)
				)
			).sort((a, b) => a.localeCompare(b)),
		[events]
	);

	const [selectedEvent, setSelectedEvent] =
		useState<Category>("Beginner Meeting");

	const { attendance, retention } = useMemo(() => {
		const attendance: CategoricalData[] = (events ?? [])
			.filter((ev) => ev.category === selectedEvent)
			.sort(compareEventDates)
			.map((ev) => ({
				label: ev.date,
				count: (attendanceByEvent[ev.code] ?? []).length,
			}));

		const retention =
			attendance.length <= 1
				? 100
				: (attendance[attendance.length - 1].count /
						attendance[0].count) *
				  100;

		return { attendance, retention };
	}, [events, selectedEvent, attendanceByEvent]);

	function select() {
		return (
			<Select onValueChange={(cat) => setSelectedEvent(cat as Category)}>
				<SelectTrigger>
					<SelectValue
						placeholder={selectedEvent}
						defaultValue={selectedEvent}
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{filteredCategories.map((cat, i) => (
							<SelectItem
								key={i}
								value={cat}
							>
								{cat}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		);
	}

	// FIXME display the name of the event in the tooltip
	return (
		<Card>
			<CardHeader className="flex justify-center">
				<CardTitle className="flex gap-4 items-center">
					{select()} Attendance Over Time
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CategoricalLineChart
					metric="Attendance"
					data={attendance}
				/>
			</CardContent>
			<CardFooter className="flex flex-col justify-center items-center gap-2">
				<div className="flex items-center gap-2 font-medium leading-none">
					<p>
						<span className="font-bold">
							{retention.toFixed(2)}%
						</span>{" "}
						Retention from the First Meeting
					</p>
				</div>
				<div className="leading-none text-muted-foreground">
					Over <span className="font-bold">{attendance.length}</span>{" "}
					Total Events This Semester
				</div>
			</CardFooter>
		</Card>
	);
}

export default EventAttendanceOverTime;
