import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, type Attendance } from "../types";

const definition: Definition<Attendance>[] = [
	{
		primaryKey: true,
		accessorKey: "user_id",
		header: "User ID",
		sortable: true,
		type: z.string().nonempty(),
	},
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
];

function AttendanceTable() {
	return (
		<DataTable
			prefix="attendance"
			queryKey={QUERY_KEYS.attendance}
			definition={definition}
			defaultValues={{
				user_id: "",
				code: "",
			}}
		/>
	);
}

export default AttendanceTable;
