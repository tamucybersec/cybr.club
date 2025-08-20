"use client";

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
import { useContext } from "react";
import { DashboardContext } from "@/lib/context";

interface Props<T> {
	prefix: string;
	queryKey: string[];
	definition: Definition<T>[];
	defaultValues: T;
	onGet?: GetEntries<T>;
	onCreate?: CreateEntry<T>;
	onUpdate?: UpdateEntry<T>;
	onDelete?: DeleteEntry<T>;
	onReplace?: ReplaceEntries<T>;
}

function DataTable<T extends object>({
	prefix,
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
	const { fetchPath } = useContext(DashboardContext);

	const _onGet =
		onGet ??
		async function (): Promise<T[]> {
			return fetchPath(`/${prefix}`, { method: "GET" });
		};

	const _onCreate =
		onCreate ??
		async function (item: T) {
			await fetchPath(`/${prefix}/create`, { params: { item } });
		};

	const _onUpdate =
		onUpdate ??
		async function (original: T, updated: T) {
			await fetchPath(`/${prefix}/update`, {
				params: { original, updated },
			});
		};

	const _onDelete =
		onDelete ??
		async function (item: T) {
			await fetchPath(`/${prefix}/delete`, { params: { item } });
		};

	const _onReplace =
		onReplace ??
		async function (replacement: T[]) {
			await fetchPath(`/${prefix}/replace`, { params: { replacement } });
		};

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
						_onCreate
					),
				cell: ({ row }) =>
					DataTableUpdateDelete(
						queryKey,
						definition,
						defaultValues,
						row,
						_onUpdate,
						_onDelete
					),
			});
	}

	return (
		<DataTableRender
			prefix={prefix}
			queryKey={queryKey}
			columns={columnDef}
			onGet={_onGet}
			onReplace={_onReplace}
		/>
	);
}

export default DataTable;
