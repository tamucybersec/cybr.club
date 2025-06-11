import { z } from "zod";
import DataTable from "./DataTable/DataTable";
import type { Definition } from "./DataTable/DataTableTypes";
import { useContext } from "react";
import { DashboardContext } from "@/scripts/context";
import { QUERY_KEYS, type Event } from "./types";
import { sortingFns } from "@tanstack/react-table";
import { compareDates, compareEventDates } from "@/scripts/helpers";

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
		accessorKey: "points",
		header: "Points",
		sortable: true,
		type: z.coerce.number().min(0),
	},
	{
		accessorKey: "date",
		header: "Date",
		sortable: true,
		type: z
			.string()
			.transform((v) => {
				const parts = v.split("/");
				return `${parts[2]}-${parts[0]}-${parts[1]}`;
			})
			.pipe(z.string().date("Date must follow format MM/DD/YYYY"))
			.transform((v) => {
				const parts = v.split("-");
				return `${parts[1]}/${parts[2]}/${parts[0]}`;
			}),
		other: {
			sortingFn: (a, b) => {
				const dateA = a.getValue<string>("date");
				const dateB = b.getValue<string>("date");
				return compareDates(dateA, dateB);
			},
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
	const { fetchPath } = useContext(DashboardContext);

	async function onGet(): Promise<Event[]> {
		return fetchPath("/events/get");
	}

	async function onCreate(event: Event) {
		await fetchPath("/events/create", { event });
	}

	async function onUpdate(from: Event, to: Event) {
		await fetchPath("/events/update", { original: from, new: to });
	}

	async function onDelete(event: Event) {
		await fetchPath("/events/delete", { event });
	}

	async function onReplace(replacement: Event[]) {
		await fetchPath("/events/replace", { replacement });
	}

	return (
		<DataTable
			queryKey={QUERY_KEYS.events}
			definition={definition}
			defaultValues={{
				name: "",
				code: "",
				points: 0,
				date: "",
				semester: "spring",
				year: 0,
			}}
			onGet={onGet}
			onCreate={onCreate}
			onUpdate={onUpdate}
			onDelete={onDelete}
			onReplace={onReplace}
		/>
	);
}

export default EventsTable;
