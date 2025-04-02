import type { Row } from "@tanstack/react-table";
import type { JSX } from "react";
import type { UseFormReturn } from "react-hook-form";
import { z, type ZodTypeAny } from "zod";

// TODO - default hidden
export interface Definition<T> {
	primaryKey?: boolean;
	accessorKey: keyof T;
	header: string;
	sortable?: boolean;
	cell?: (row: Row<T>) => JSX.Element;
	type: ZodTypeAny;
}

export type GetEntries<T> = () => Promise<T[]>;
export type CreateEntry<T> = (entry: T) => Promise<void>;
export type UpdateEntry<T> = (from: T, to: T) => Promise<void>;
export type DeleteEntry<T> = (entry: T) => Promise<void>;
export type OnSubmit<T> = (to: T) => void;

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
