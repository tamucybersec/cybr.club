import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, type Attendance } from "../types";
import { filterUserID } from "@/scripts/helpers";

// FIXME multiple keys for primary key
const definition: Definition<Attendance>[] = [
	{
		primaryKey: true,
		accessorKey: "user_id",
		header: "User ID",
		sortable: true,
		type: z.coerce.number().min(0),
		other: { filterFn: filterUserID },
	},
	{
		accessorKey: "code",
		header: "Code",
		sortable: true,
		type: z
			.string()
			.nonempty()
			.length(5, "An event code must be 5 characters long."),
	},
];

function AttendanceTable() {
	return (
		<DataTable
			prefix="attendance"
			queryKey={QUERY_KEYS.attendance}
			definition={definition}
			defaultValues={{
				user_id: 0,
				code: "",
			}}
		/>
	);
}

export default AttendanceTable;
