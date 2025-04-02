import {
	type Column,
	type ColumnDef,
	type ColumnPinningState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { type CSSProperties, useState } from "react";
import { DataTableViewOptions } from "./DataTableView";
import { DataTablePagination } from "./DataTablePagination";
import { useQuery } from "@tanstack/react-query";
import { type GetEntries } from "./DataTableTypes";
import { DataTableContext } from "./DataTableContext";

interface Props<T, V> {
	queryKey: any[];
	columns: ColumnDef<T, V>[];
	onGet: GetEntries<T>;
}

function DataTableRender<T, V>({ queryKey, columns, onGet }: Props<T, V>) {
	const { status, data, error } = useQuery({
		queryKey,
		queryFn: onGet,
	});

	function emptyDisplay() {
		if (status === "pending") {
			return "Fetching data...";
		} else if (status === "error") {
			return `There was an error when loading the data.`;
		} else {
			return "No results.";
		}
	}

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
		left: [],
		right: ["actions"],
	});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);

	const table = useReactTable({
		data: data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		autoResetPageIndex: false,
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnPinningChange: setColumnPinning,
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnPinning,
			columnVisibility,
		},
	});

	const pinStyle = (column: Column<T>): CSSProperties => {
		const isPinned = column.getIsPinned();

		if (isPinned) {
			return {
				left:
					isPinned === "left"
						? `${column.getStart("left")}px`
						: undefined,
				right:
					isPinned === "right"
						? `${column.getAfter("right")}px`
						: undefined,
				position: "sticky",
				backgroundColor: "var(--background)",
				zIndex: 1,
			};
		} else {
			return {};
		}
	};

	function TableContent() {
		return (
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										style={pinStyle(header.column)}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										style={pinStyle(cell.column)}
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
							>
								{emptyDisplay()}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		);
	}

	// TODO - filtering by columns (automatically resets page index)
	return (
		<DataTableContext.Provider value={{ table }}>
			<div className="flex flex-col gap-4">
				<div className="flex items-center">
					<DataTableViewOptions table={table} />
				</div>
				<div className="rounded-md border">{TableContent()}</div>
				<DataTablePagination table={table} />
			</div>
		</DataTableContext.Provider>
	);
}

export default DataTableRender;
