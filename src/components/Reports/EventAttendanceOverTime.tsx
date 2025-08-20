"use client";

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
import { useMemo, useState } from "react";
import { type CategoricalData, type Category } from "../../lib/types";
import { compareEventDates } from "@/lib/helpers";

function EventAttendanceOverTime() {
	const { events, eventsByCode } = useEvents();
	const { attendanceByEvent } = useAttendance(eventsByCode);

	const filteredCategories: string[] = useMemo(() => {
		const categories = events
			.filter((ev) => (attendanceByEvent[ev.code] ?? []).length > 0)
			.map((ev) => ev.category);
		const unique = Array.from(new Set(categories));
		return unique.sort((a, b) => a.localeCompare(b));
	}, [events]);

	const [selectedEvent, setSelectedEvent] =
		useState<Category>("Beginner Meeting");

	const { attendance, totalAttendance, averageAttendance } = useMemo(() => {
		const attendance: (CategoricalData & { title: string })[] = events
			.filter((ev) => ev.category === selectedEvent)
			.sort(compareEventDates)
			.map((ev) => ({
				label: ev.date,
				title: `${ev.name} (${ev.date})`,
				count: (attendanceByEvent[ev.code] ?? []).length,
			}));

		const totalAttendance = attendance.reduce(
			(acc, att) => acc + att.count,
			0
		);

		const numAtt = Object.keys(attendance).length;
		const averageAttendance =
			numAtt === 0 ? 0 : Math.floor(totalAttendance / numAtt);

		return { attendance, totalAttendance, averageAttendance };
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
						<span className="font-bold">{totalAttendance}</span>{" "}
						Total Attendees,{" "}
						<span className="font-bold">{averageAttendance}</span>{" "}
						Average Attendees
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
