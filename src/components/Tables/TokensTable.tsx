"use client";

import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, type Tokens, Permissions } from "../../lib/types";
import {
	getCurrentDatestr,
	sortDates,
	zodBoolean,
	zodDate,
} from "@/lib/helpers";
import { Info } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTokens } from "@/hooks/useTable";
import { useMemo } from "react";

const definition: Definition<Tokens>[] = [
	{
		accessorKey: "name",
		header: "Name",
		sortable: true,
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
		type: zodBoolean,
	},
	{
		accessorKey: "permission",
		header: "Permission",
		sortable: true,
		type: z.coerce
			.number()
			.min(Permissions.NONE)
			.max(Permissions.SUPER_ADMIN),
	},
];

function TokensTable() {
	const { tokensByToken } = useTokens();

	const newToken = useMemo(() => {
		function generateToken(): string {
			return crypto
				.getRandomValues(new Uint8Array(16)) // 16 bytes = 128 bits
				.reduce(
					(str, byte) => str + byte.toString(16).padStart(2, "0"),
					""
				);
		}

		let token: string;
		do {
			token = generateToken();
		} while (tokensByToken[token]);

		return token;
	}, [tokensByToken]);

	return (
		<>
			<div className="flex gap-2">
				<p>
					Permissions: 0=NONE, 1=SPONSOR, 2=COMMITTEE, 3=ADMIN,
					4=SUPER_ADMIN
				</p>
				<Tooltip>
					<TooltipTrigger>
						<Info size={16} />
					</TooltipTrigger>
					<TooltipContent>
						<ul>
							<li>
								0) <strong>NONE</strong>: Cannot access the
								dashboard
							</li>
							<li>
								1) <strong>SPONSOR</strong>: Can only access the
								sponsor page
							</li>
							<li>
								2) <strong>COMMITTEE</strong>: Does all of the
								above but can also view the admin tables (but
								cannot modify data)
							</li>
							<li>
								3) <strong>ADMIN</strong>: Does all of the above
								and can view and edit the admin tables
							</li>
							<li>
								4) <strong>SUPER_ADMIN</strong>: Does all of the
								above and can view and edit tokens (grant
								access)
							</li>
						</ul>
					</TooltipContent>
				</Tooltip>
			</div>
			<DataTable
				prefix="tokens"
				queryKey={QUERY_KEYS.tokens}
				definition={definition}
				defaultValues={{
					name: "",
					token: newToken,
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
