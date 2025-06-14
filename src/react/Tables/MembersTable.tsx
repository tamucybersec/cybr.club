import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, type User } from "../types";
import { zodBoolean } from "@/scripts/helpers";

const definition: Definition<User>[] = [
	{
		primaryKey: true,
		accessorKey: "user_id",
		header: "User ID",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "name",
		header: "Name",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "grad_year",
		header: "Grad Year",
		sortable: true,
		type: z.coerce.number().min(0),
	},
	{
		accessorKey: "email",
		header: "Email",
		sortable: true,
		type: z
			.string()
			.email({ message: "Invalid email address" })
			.endsWith(
				"tamu.edu",
				"Email must be a valid TAMU email and end with 'tamu.edu'"
			),
	},
	{
		accessorKey: "verified",
		header: "Verified",
		sortable: true,
		type: zodBoolean,
	},
];

function MembersTable() {
	return (
		<DataTable
			prefix="users"
			queryKey={QUERY_KEYS.users}
			definition={definition}
			defaultValues={{
				user_id: "",
				name: "",
				grad_year: 0,
				email: "",
				verified: false,
			}}
		/>
	);
}

export default MembersTable;
