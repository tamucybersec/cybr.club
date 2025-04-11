import { z } from "zod";
import DataTable from "./DataTable/DataTable";
import type { Definition } from "./DataTable/DataTableTypes";
import { useContext } from "react";
import { DashboardContext } from "@/scripts/context";
import { QUERY_KEYS, type Event } from "./types";

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
	},
	{
		accessorKey: "resources",
		header: "Resources",
		type: z.string(),
	},
	{
		accessorKey: "attended_users",
		header: "Attended Users",
		sortable: true,
		type: z.preprocess((v): string[] => {
			if (Array.isArray(v)) {
				return v;
			} else if (typeof v === "string") {
				return [v];
			} else {
				return [];
			}
		}, z.array(z.coerce.number())),
		other: {
			sortingFn: (rowA, rowB, columnId: string) => {
				const attA = rowA.getValue<string[]>(columnId);
				const attB = rowB.getValue<string[]>(columnId);
				return attA.length - attB.length;
			},
			filterFn: (row, columnId, filterValue) => {
				const values = row.getValue<string[]>(columnId);
				const filters = filterValue.split(",");

				return filters.every((filter: string) =>
					values.some((value) => value.includes(filter))
				);
			},
		},
	},
];

function EditEvents() {
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

	return (
		<DataTable
			queryKey={QUERY_KEYS.events}
			definition={definition}
			defaultValues={{
				name: "",
				code: "",
				points: 0,
				date: "",
				resources: "",
				attended_users: [],
			}}
			onGet={onGet}
			onCreate={onCreate}
			onUpdate={onUpdate}
			onDelete={onDelete}
		/>
	);
}

export default EditEvents;
