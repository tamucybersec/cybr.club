"use client";

import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, type User } from "../../lib/types";
import { sortDates, zodBoolean, zodTamuEmail } from "@/lib/helpers";

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
		accessorKey: "grad_semester",
		header: "Grad Semester",
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
		accessorKey: "major",
		header: "Major",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "email",
		header: "Email",
		sortable: true,
		type: zodTamuEmail,
	},
	{
		accessorKey: "verified",
		header: "Verified",
		sortable: true,
		type: zodBoolean,
	},
	{
		accessorKey: "join_date",
		header: "Join Date",
		sortable: true,
		type: z.string().nonempty(),
		other: {
			sortingFn: sortDates<User>("join_date"),
		},
	},
	{
		accessorKey: "notes",
		header: "Notes",
		sortable: true,
		type: z.string(),
	},
	{
		accessorKey: "resume_format",
		header: "Resume Format",
		sortable: true,
		type: z.string(),
	},
];

function MembersTable() {
	return (
		<DataTable<User>
			prefix="users"
			queryKey={QUERY_KEYS.users}
			definition={definition}
			defaultValues={{
				user_id: "",
				name: "",
				grad_semester: "spring",
				grad_year: 0,
				major: "",
				email: "",
				verified: false,
				join_date: "",
				notes: "",
				resume_format: "",
			}}
		/>
	);
}

export default MembersTable;
