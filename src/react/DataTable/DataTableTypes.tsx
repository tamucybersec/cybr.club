import type { ColumnDef, Row } from "@tanstack/react-table";
import type { JSX } from "react";
import type { UseFormReturn } from "react-hook-form";
import { z, type ZodTypeAny } from "zod";

export interface Definition<T> {
	primaryKey?: boolean;
	accessorKey: keyof T;
	header: string;
	sortable?: boolean;
	cell?: (row: Row<T>) => JSX.Element;
	type: ZodTypeAny;
	other?: Partial<ColumnDef<T>>;
}

export type GetEntries<T> = () => Promise<T[]>;
export type ReplaceEntries<T> = (entries: T[]) => Promise<void>;
export type CreateEntry<T> = (item: T) => Promise<void>;
export type UpdateEntry<T> = (original: T, updated: T) => Promise<void>;
export type DeleteEntry<T> = (item: T) => Promise<void>;
export type OnSubmit<T> = (updated: T) => void;

export type SchemaType = z.ZodObject<
	any,
	"strip",
	z.ZodTypeAny,
	{
		[x: string]: any;
	},
	{
		[x: string]: any;
	}
>;
export type FormType = UseFormReturn<
	{
		[x: string]: any;
	},
	any,
	undefined
>;
