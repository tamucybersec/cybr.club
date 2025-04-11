import { z } from "zod";
import DataTable from "./DataTable/DataTable";
import type { Definition } from "./DataTable/DataTableTypes";
import { useContext } from "react";
import { DashboardContext } from "@/scripts/context";
import { QUERY_KEYS, type Flagged } from "./types";

const definition: Definition<Flagged>[] = [
	{
		primaryKey: true,
		accessorKey: "user_id",
		header: "User ID",
		sortable: true,
		type: z.coerce.number().min(0),
		other: {
			filterFn: (row, columnId, filterValue) => {
				const value = row.getValue<number>(columnId);
				return value.toString().includes(filterValue);
			},
		},
	},
	{
		accessorKey: "offences",
		header: "Offenses",
		sortable: true,
		type: z.coerce.number().min(0),
	},
];

function EditFlagged() {
	const { fetchPath } = useContext(DashboardContext);

	async function onGet(): Promise<Flagged[]> {
		return fetchPath("/flagged/get");
	}

	async function onCreate(flagged: Flagged) {
		console.log({ flagged });
		await fetchPath("/flagged/create", { flagged });
	}

	async function onUpdate(from: Flagged, to: Flagged) {
		await fetchPath("/flagged/update", { original: from, new: to });
	}

	async function onDelete(flagged: Flagged) {
		await fetchPath("/flagged/delete", { flagged });
	}

	return (
		<DataTable
			queryKey={QUERY_KEYS.flagged}
			definition={definition}
			defaultValues={{
				user_id: 0,
				offences: 0,
			}}
			onGet={onGet}
			onCreate={onCreate}
			onUpdate={onUpdate}
			onDelete={onDelete}
		/>
	);
}

export default EditFlagged;
