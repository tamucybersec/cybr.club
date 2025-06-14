import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, type Points } from "../types";
import {
	filterUserID,
	getCurrentSemester,
	getCurrentYear,
} from "@/scripts/helpers";

// FIXME multiple keys for primary key
const definition: Definition<Points>[] = [
	{
		primaryKey: true,
		accessorKey: "user_id",
		header: "User ID",
		sortable: true,
		type: z.coerce.number().min(0),
		other: { filterFn: filterUserID },
	},
	{
		accessorKey: "points",
		header: "Points",
		sortable: true,
		cell: (row) => {
			const points = row.getValue<number>("points");
			return <span>{points.toLocaleString()}</span>;
		},
		type: z.coerce.number().min(0),
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

function PointsTable() {
	return (
		<DataTable<Points>
			prefix="points"
			queryKey={QUERY_KEYS.points}
			definition={definition}
			defaultValues={{
				user_id: 0,
				points: 0,
				semester: getCurrentSemester(),
				year: getCurrentYear(),
			}}
		/>
	);
}

export default PointsTable;
