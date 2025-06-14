import { type Column } from "@tanstack/react-table";
import {
	ArrowDown,
	ArrowUp,
	ChevronDown,
	ChevronsUpDown,
	ChevronUp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useState } from "react";
import { DataTableContext } from "./DataTableContext";

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	const [sortDirection, setSortDirection] = useState(false);
	const { table } = useContext(DataTableContext);

	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	function toggleSorting() {
		column.toggleSorting(sortDirection);
		table.resetPageIndex();
		setSortDirection((prev) => !prev);
	}

	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<Button
				variant="ghost"
				size="sm"
				className="-ml-3 h-8 data-[state=open]:bg-accent"
				onClick={toggleSorting}
			>
				<span>{title}</span>
				{column.getIsSorted() === "desc" ? (
					<ChevronDown />
				) : column.getIsSorted() === "asc" ? (
					<ChevronUp />
				) : (
					<ChevronsUpDown />
				)}
			</Button>
		</div>
	);
}
