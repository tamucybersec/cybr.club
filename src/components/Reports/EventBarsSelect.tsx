"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import EventCumulativeBar from "./EventCumulativeBar";
import EventAverageBar from "./EventAverageBar";

function EventBarsSelect() {
	type Bars = "Cumulative" | "Average";
	const types: Bars[] = ["Cumulative", "Average"];
	const [selected, setSelected] = useState<Bars>("Cumulative");

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
