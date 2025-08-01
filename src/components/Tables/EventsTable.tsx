"use client";

import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, VALID_CATEGORIES, type Event } from "../../lib/types";
import {
	getCurrentDatestr,
	getCurrentSemester,
	getCurrentYear,
	sortDates,
	zodDate,
} from "@/lib/helpers";
import { useEvents } from "@/hooks/useTable";
import { useMemo } from "react";

const definition: Definition<Event>[] = [
	{
		primaryKey: true,
		accessorKey: "code",
		header: "Code",
		sortable: true,
		type: z
			.string()
			.nonempty()
			.length(5, "An event code must be 5 characters long."),
	},
	{
		accessorKey: "name",
		header: "Name",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "category",
		header: "Category",
		sortable: true,
		type: z.enum(VALID_CATEGORIES),
	},
	{
		accessorKey: "points",
		header: "Points",
		sortable: true,
		type: z.coerce.number().min(0),
	},
	{
		accessorKey: "date",
		header: "Date",
		sortable: true,
		type: zodDate,
		other: {
			sortingFn: sortDates<Event>("date"),
		},
	},
	{
		accessorKey: "semester",
		header: "Semester",
		sortable: true,
		type: z.enum(["spring", "fall"]),
	},
	{
		accessorKey: "year",
		header: "Year",
		sortable: true,
		type: z.coerce.number().min(0),
	},
];

function EventsTable() {
	const { eventsByCode } = useEvents();

	const newCode = useMemo(() => {
		function generateCode(): string {
			const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			let result = "";
			for (let i = 0; i < 5; i++) {
				const index = Math.floor(Math.random() * letters.length);
				result += letters[index];
			}
			return result;
		}

		let code: string;
		do {
			code = generateCode();
		} while (eventsByCode[code]);

		return code;
	}, [eventsByCode]);

	return (
		<DataTable<Event>
			prefix="events"
			queryKey={QUERY_KEYS.events}
			definition={definition}
			defaultValues={{
				name: "",
				code: newCode,
				category: "Informational",
				points: 0,
				date: getCurrentDatestr(),
				semester: getCurrentSemester(),
				year: getCurrentYear(),
			}}
		/>
	);
}

export default EventsTable;
