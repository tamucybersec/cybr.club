import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";

// automatically reset page index
interface Props<T> {
	table: Table<T>;
}

function DataTableFilter<T>({ table }: Props<T>) {
	const allColumns = useMemo(
		() =>
			table
				.getAllColumns()
				.filter(
					(column) =>
						typeof column.accessorFn !== "undefined" &&
						column.getCanFilter()
				)
				.map((column) => column.id),
		[]
	);

	const [filterColumn, setFilterColumn] = useState<string>(allColumns[0]);

	function changeFilter(value: string) {
		table.resetColumnFilters();
		setFilterColumn(value);
	}

	function readable(id: string): string {
		return id
			.split("_")
			.map((s) => s.substring(0, 1).toUpperCase() + s.substring(1))
			.join(" ");
	}

	function select() {
		return table
			.getAllColumns()
			.filter(
				(column) =>
					typeof column.accessorFn !== "undefined" &&
					column.getCanFilter()
			)
			.map((column) => (
				<SelectItem
					key={column.id}
					value={column.id}
				>
					{readable(column.id)}
				</SelectItem>
			));
	}

	return (
		<div className="flex gap-4">
			<Select onValueChange={changeFilter}>
				<SelectTrigger>
					<SelectValue
						placeholder={readable(filterColumn)}
						defaultValue={readable(filterColumn)}
					/>
				</SelectTrigger>
				<SelectContent>{select()}</SelectContent>
			</Select>
			<Input
				placeholder={`Filter ${readable(filterColumn)}...`}
				value={
					(table
						.getColumn(filterColumn)
						?.getFilterValue() as string) ?? ""
				}
				onChange={(event) => {
					table
						.getColumn(filterColumn)
						?.setFilterValue(event.target.value);
				}}
				className="max-w-sm"
			/>
		</div>
	);
}

export default DataTableFilter;
