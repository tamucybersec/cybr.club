import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import GradYearPie from "./GradYearPie";
import MajorPie from "./MajorPie";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { getCurrentYear, getCurrentSemester } from "@/scripts/helpers";
import EventCumulativeBar from "./EventCumulativeBar";
import EventAverageBar from "./EventAverageBar";

function EventBarsSelect() {
	type Bars = "Cumulative" | "Average";
	const types: Bars[] = ["Cumulative", "Average"];
	const [selected, setSelected] = useState<Bars>("Cumulative");
	const currentSemester = getCurrentSemester();
	const currentYear = getCurrentYear();

	function select() {
		return (
			<Select onValueChange={(v) => setSelected(v as Bars)}>
				<SelectTrigger>
					<SelectValue
						placeholder={selected}
						defaultValue={selected}
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{types.map((t, i) => (
							<SelectItem
								key={i}
								value={t}
							>
								{t}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		);
	}

	return (
		<Card className="grow-4">
			<CardHeader className="flex flex-col justify-center items-center">
				<CardTitle className="flex gap-2 items-center">
					Events by {select()} Attendance
				</CardTitle>
				<CardDescription>
					{currentSemester} {currentYear}
				</CardDescription>
			</CardHeader>
			{selected === "Cumulative" ? (
				<EventCumulativeBar />
			) : (
				<EventAverageBar />
			)}
		</Card>
	);
}

export default EventBarsSelect;
