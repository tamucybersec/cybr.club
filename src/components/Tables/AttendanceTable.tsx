"use client";

import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, type Attendance } from "../../lib/types";
import EventCodeLink from "../Event/EventCodeLink";

const definition: Definition<Attendance>[] = [
	{
		primaryKey: true,
		accessorKey: "username",
		header: "Username",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		primaryKey: true,
		accessorKey: "code",
		header: "Code",
		sortable: true,
		cell: (row) => <EventCodeLink code={row.getValue<string>("code")} />,
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
				username: "",
				code: "",
			}}
		/>
	);
}

export default AttendanceTable;
