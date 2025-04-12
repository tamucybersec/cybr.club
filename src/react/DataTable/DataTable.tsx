import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import DataTableRender from "./DataTableRender";
import type {
	Definition,
	CreateEntry,
	UpdateEntry,
	DeleteEntry,
	GetEntries,
	ReplaceEntries,
} from "./DataTableTypes";
import { DataTableCreate, DataTableUpdateDelete } from "./DataTableOptions";

interface Props<T> {
	queryKey: string[];
	definition: Definition<T>[];
	defaultValues: T;
	onGet: GetEntries<T>;
	onCreate: CreateEntry<T>;
	onUpdate: UpdateEntry<T>;
	onDelete: DeleteEntry<T>;
	onReplace: ReplaceEntries<T>;
}

function DataTable<T extends object>({
	queryKey,
	definition,
	defaultValues,
	onGet,
	onCreate,
	onUpdate,
	onDelete,
	onReplace,
}: Props<T>) {
	const columnDef = getColumnDef();

	function getColumnDef(): ColumnDef<T>[] {
		return definition
			.map((def): ColumnDef<T> => {
				const cd: ColumnDef<T> = {
					...def.other,
					accessorKey: def.accessorKey,
					header: def.sortable
						? ({ column }) => (
								<DataTableColumnHeader
									column={column}
									title={def.header}
								/>
						  )
						: def.header,
				};

				if (def.cell) {
					cd["cell"] = ({ row }) => def.cell!(row);
				}

				return cd;
			})
			.concat({
				id: "actions",
				header: () =>
					DataTableCreate(
						queryKey,
						definition,
						defaultValues,
						onCreate
					),
				cell: ({ row }) =>
					DataTableUpdateDelete(
						queryKey,
						definition,
						defaultValues,
						row,
						onUpdate,
						onDelete
					),
			});
	}

	return (
		<DataTableRender
			queryKey={queryKey}
			columns={columnDef}
			onGet={onGet}
			onReplace={onReplace}
		/>
	);
}

export default DataTable;
