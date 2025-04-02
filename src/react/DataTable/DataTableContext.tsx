import { type Table } from "@tanstack/react-table";
import { createContext } from "react";

interface ContextType {
	table: Table<any>;
}

export const DataTableContext = createContext<ContextType>({
	table: {} as Table<any>,
});

