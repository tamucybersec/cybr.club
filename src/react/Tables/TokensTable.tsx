import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, type Tokens, Permissions } from "../types";
import { getCurrentDatestr, sortDates, zodDate } from "@/scripts/helpers";
import { Info } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * export interface Tokens {
    token: string;
    name: string;
    created: string;
    last_accessed: string;
    expires_after: string;
    revoked: boolean;
    permission: Permissions;
 }
 */

const definition: Definition<Tokens>[] = [
	{
		accessorKey: "name",
		header: "Name",
		type: z.string().nonempty(),
	},
	{
		primaryKey: true,
		accessorKey: "token",
		header: "Token",
		cell: () => <div>*****</div>,
		type: z
			.string()
			.min(
				32,
				"Token should be at least 32 characters long for security."
			),
	},
	{
		accessorKey: "created",
		header: "Created",
		sortable: true,
		type: zodDate,
		other: {
			sortingFn: sortDates<Tokens>("created"),
		},
	},
	{
		accessorKey: "expires_after",
		header: "Expires After",
		sortable: true,
		type: zodDate,
		other: {
			sortingFn: sortDates<Tokens>("expires_after"),
		},
	},
	{
		accessorKey: "last_accessed",
		header: "Last Accessed",
		sortable: true,
		type: zodDate,
		other: {
			sortingFn: sortDates<Tokens>("last_accessed"),
		},
	},
	{
		accessorKey: "revoked",
		header: "Revoked",
		sortable: true,
		type: z.coerce.boolean(),
	},
	{
		accessorKey: "permission",
		header: "Permission",
		sortable: true,
		type: z.coerce.number().min(0).max(4),
	},
];

function TokensTable() {
	return (
		<>
			<div className="flex gap-2">
				<p>
					Permissions Key: 0=NONE, 1=SPONSOR, 2=COMMITTEE, 3=ADMIN,
					4=SUPER_ADMIN
				</p>
				<Tooltip>
					<TooltipTrigger>
						<Info />
					</TooltipTrigger>
					<TooltipContent>
						0) NONE cannot access the dashboard.
						<br />
						1) SPONSOR can only access the sponsor page and only get
						data.
						<br />
						2) COMMITTEE does all of the above but can also view the
						admin tables (cannot modify data).
						<br />
						3) ADMIN does all of the above and can view and edit the
						admin tables.
						<br />
						4) SUPER_ADMIN does all of the above and can view and
						edit tokens (grant access).
					</TooltipContent>
				</Tooltip>
			</div>
			{/* TODO Tooltip with info: 
                
            */}
			<DataTable
				prefix="tokens"
				queryKey={QUERY_KEYS.tokens}
				definition={definition}
				defaultValues={{
					name: "",
					token: "", // TODO autogenerate valid
					created: getCurrentDatestr(),
					expires_after: getCurrentDatestr(),
					last_accessed: getCurrentDatestr(),
					revoked: false,
					permission: Permissions.NONE,
				}}
			/>
		</>
	);
}

export default TokensTable;
