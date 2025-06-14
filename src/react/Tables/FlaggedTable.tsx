import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, type Flagged } from "../types";

const definition: Definition<Flagged>[] = [
	{
		primaryKey: true,
		accessorKey: "user_id",
		header: "User ID",
		sortable: true,
		type: z.string().nonempty(),
		other: {
			filterFn: (row, columnId, filterValue) => {
				const value = row.getValue<number>(columnId);
				return value.toString().includes(filterValue);
			},
		},
	},
	{
		accessorKey: "offenses",
		header: "Offenses",
		sortable: true,
		type: z.coerce.number().min(0),
	},
];

function FlaggedTable() {
	return (
		<DataTable
			prefix="flagged"
			queryKey={QUERY_KEYS.flagged}
			definition={definition}
			defaultValues={{
				user_id: "",
				offenses: 0,
			}}
		/>
	);
}

export default FlaggedTable;
