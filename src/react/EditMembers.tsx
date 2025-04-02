import { z } from "zod";
import DataTable from "./DataTable/DataTable";
import type { Definition } from "./DataTable/DataTableTypes";
import { useContext } from "react";
import { DashboardContext } from "@/scripts/context";
import { QUERY_KEYS, type User } from "./types";

const definition: Definition<User>[] = [
	{
		primaryKey: true,
		accessorKey: "user_id",
		header: "User ID",
		sortable: true,
		type: z.coerce.number().min(0),
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
		cell: (row) => {
			const points = row.getValue<number>("points");
			return <div>{points.toLocaleString()}</div>;
		},
		type: z.coerce.number().min(0),
	},
	{
		accessorKey: "attended",
		header: "Attended",
		sortable: true,
		cell: (row) => {
			const points = row.getValue<number>("points");
			return <div>{points.toLocaleString()}</div>;
		},
		type: z.coerce.number().min(0),
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
];

function EditMembers() {
	const { fetchPath } = useContext(DashboardContext);

	async function onGet(): Promise<User[]> {
		return fetchPath("/edit/users/get");
	}

	async function onCreate(user: User) {
		await fetchPath("/edit/users/create", { user });
	}

	async function onUpdate(from: User, to: User) {
		await fetchPath("/edit/users/update", { original: from, new: to });
	}

	async function onDelete(user: User) {
		await fetchPath("/edit/users/delete", { user });
	}

	return (
		<>
			<DataTable
				queryKey={QUERY_KEYS.users}
				definition={definition}
				defaultValues={{
					user_id: 0,
					name: "New User",
					points: 0,
					attended: 0,
					grad_year: 0,
					email: "example@tamu.edu",
				}}
				onGet={onGet}
				onCreate={onCreate}
				onUpdate={onUpdate}
				onDelete={onDelete}
			/>
		</>
	);
}

export default EditMembers;
