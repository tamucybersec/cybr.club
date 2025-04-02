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
import { useEvents } from "@/hooks/useTable";
import { useEffect, useMemo, useState } from "react";
import type { CategoricalData } from "../types";

// TODO
// list of retention rates between meetings rather than average retention rate
function EventAttendanceOverTime() {
	const events = useEvents();

	const eventTypes: string[] = useMemo(
		() =>
			Array.from(new Set((events ?? []).map((ev) => ev.name))).sort(
				(a, b) => a.localeCompare(b)
			),
		[events]
	);

	const [selectedEvent, setSelectedEvent] = useState<string | undefined>();

	useEffect(() => {
		if (eventTypes.length > 0 && selectedEvent === undefined) {
			setSelectedEvent(eventTypes[0]);
		}
	}, [eventTypes, selectedEvent]);

	const { attendance, retention } = useMemo(() => {
		const attendance: CategoricalData[] = (events ?? [])
			.filter((ev) => ev.name === selectedEvent)
			.sort((a, b) => a.date.localeCompare(b.date))
			.map((ev) => ({
				label: ev.date,
				count: ev.attended_users.length,
			}));

		const retention =
			attendance.length <= 1
				? 100
				: (attendance[attendance.length - 1].count /
						attendance[0].count) *
				  100;

		return { attendance, retention };
	}, [events, selectedEvent]);

	function select() {
		return (
			<Select onValueChange={setSelectedEvent}>
				<SelectTrigger>
					<SelectValue
						placeholder={selectedEvent}
						defaultValue={selectedEvent}
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{eventTypes.map((ev) => (
							<SelectItem value={ev}>{ev}</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		);
	}

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
