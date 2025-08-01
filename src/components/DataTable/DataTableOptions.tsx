"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import type { Row } from "@tanstack/react-table";
import type {
	CreateEntry,
	Definition,
	DeleteEntry,
	UpdateEntry,
} from "./DataTableTypes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DataTableForm from "./DataTableForm";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTableContext } from "./DataTableContext";
import { toast } from "sonner";

function getPrimaryKeys<T>(definition: Definition<T>[]): (keyof T)[] {
	return definition
		.filter((def) => def.primaryKey)
		.map((def) => def.accessorKey);
}

function getSchema<T>(definition: Definition<T>[]) {
	return z.object(
		Object.fromEntries(definition.map((def) => [def.accessorKey, def.type]))
	);
}

function uniquePrimaryKey<T>(data: T[], obj: T, pks: (keyof T)[]): boolean {
	return !data.some((entry) => pks.every((pk) => entry[pk] === obj[pk]));
}

export function DataTableCreate<T>(
	queryKey: string[],
	definition: Definition<T>[],
	defaultValues: T,
	onCreate: CreateEntry<T>
) {
	const pks = getPrimaryKeys(definition);
	const queryClient = useQueryClient();
	const { table } = useContext(DataTableContext);
	const [open, setOpen] = useState(false);
	const schema = getSchema(definition);
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues as { [x: string]: any },
	});
	const { setError } = form;

	useEffect(() => {
		form.reset();
	}, [open]);

	const { mutate: mutateCreate } = useMutation({
		mutationFn: onCreate,
		onMutate: async (created: T) => {
			await queryClient.cancelQueries({ queryKey });
			const prev = queryClient.getQueryData<T[]>(queryKey);
			queryClient.setQueryData(queryKey, (old: T[]) => [
				...(old || []),
				created,
			]);

			return { prev };
		},
		onError: (error, _, context) => {
			console.error(error);
			toast.error(error.message);
			queryClient.setQueryData(queryKey, context?.prev);
		},
	});

	function onSubmit(updated: T) {
		const data = queryClient.getQueryData<T[]>(queryKey) ?? [];
		if (!uniquePrimaryKey(data, updated, pks)) {
			const plural = pks.length > 1 ? "s are" : " is";
			setError("root.pk", {
				message: `Primary key${plural} not unique`,
			});
			return;
		}

		mutateCreate(updated);
		setOpen(false);
		table.resetSorting();
		table.lastPage();
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="h-8 data-[state=open]:bg-accent"
				>
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Entry</DialogTitle>
					<DialogDescription>
						Create a new entry in the table.
					</DialogDescription>
				</DialogHeader>
				<DataTableForm
					definition={definition}
					form={form}
					onSubmit={onSubmit}
				/>
			</DialogContent>
		</Dialog>
	);
}

export function DataTableUpdateDelete<T extends object>(
	queryKey: string[],
	definition: Definition<T>[],
	defaultValues: T,
	row: Row<T>,
	onUpdate: UpdateEntry<T>,
	onDelete: DeleteEntry<T>
) {
	const pks = getPrimaryKeys(definition);
	const queryClient = useQueryClient();
	const [mode, setMode] = useState<"UPDATE" | "DELETE">("DELETE");
	const [open, setOpen] = useState(false);
	const [defaultValuesRow, setDefaultValuesRow] = useState(
		defaultValuesFromRow()
	);
	const schema = getSchema(definition);
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValuesRow as { [x: string]: any },
	});
	const { setError } = form;

	useEffect(() => {
		form.reset(defaultValuesRow);
	}, [open]);

	function defaultValuesFromRow(): T {
		let t: any = {};

		for (const key of Object.keys(defaultValues)) {
			t[key] = row.getValue(key) ?? "";
		}

		return t;
	}

	const entryName = useMemo(() => {
		return `(${pks.map((pk) => defaultValuesRow[pk]).join(", ")})`;
	}, [defaultValuesRow]);

	function skipPrimaryKeyCheck(updated: T): boolean {
		// if the keys haven't changed
		return pks.every((pk) => defaultValuesRow[pk] === updated[pk]);
	}

	const { mutate: mutateUpdate } = useMutation({
		mutationFn: ({ original, updated }: { original: T; updated: T }) =>
			onUpdate(original, updated),
		onMutate: async ({ original, updated }) => {
			await queryClient.cancelQueries({ queryKey });
			const prev = queryClient.getQueryData<T[]>(queryKey);
			queryClient.setQueryData(queryKey, (old: T[]) =>
				old?.map((o) =>
					pks.every((pk) => o[pk] === original[pk]) ? updated : o
				)
			);

			return { prev };
		},
		onError: (error, { original }, context) => {
			console.error(error);
			toast.error(error.message);
			setDefaultValuesRow(original);
			queryClient.setQueryData(queryKey, context?.prev);
		},
	});

	function EditTableUpdate() {
		function onSubmit(updated: T) {
			if (!skipPrimaryKeyCheck(updated)) {
				const data = queryClient.getQueryData<T[]>(queryKey) ?? [];
				if (!uniquePrimaryKey(data, updated, pks)) {
					const plural = pks.length > 1 ? "s are" : " is";
					setError("root.pk", {
						message: `Primary key${plural} not unique`,
					});
					return;
				}
			}

			mutateUpdate({ original: defaultValuesRow, updated });
			setDefaultValuesRow(updated);
			setOpen(false);
		}

		return (
			<>
				<DialogHeader>
					<DialogTitle>Update Entry {entryName}</DialogTitle>
					<DialogDescription>
						Update the values of an entry in the table.
					</DialogDescription>
				</DialogHeader>
				<DataTableForm
					definition={definition}
					form={form}
					onSubmit={onSubmit}
				/>
			</>
		);
	}

	const { mutate: mutateDelete } = useMutation({
		mutationFn: onDelete,
		onMutate: async (deleted) => {
			await queryClient.cancelQueries({ queryKey });
			const prev = queryClient.getQueryData<T[]>(queryKey);
			queryClient.setQueryData(queryKey, (old: T[]) =>
				old?.filter((o) => !pks.every((pk) => o[pk] === deleted[pk]))
			);

			return { prev };
		},
		onError: (error, _, context) => {
			console.error(error);
			toast.error(error.message);
			queryClient.setQueryData(queryKey, context?.prev);
		},
	});

	function EditTableDelete() {
		function onSubmit() {
			mutateDelete(defaultValuesRow);
			setOpen(false);
		}

		return (
			<>
				<DialogHeader>
					<DialogTitle>Delete Entry {entryName}</DialogTitle>
					<DialogDescription>
						This action cannot be undone. Are you sure you want to
						permanently delete this entry from the table?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						type="submit"
						onClick={onSubmit}
					>
						Confirm
					</Button>
				</DialogFooter>
			</>
		);
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="h-8 w-8 p-0"
					>
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DialogTrigger asChild>
						<DropdownMenuItem onClick={() => setMode("UPDATE")}>
							Edit Entry
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogTrigger asChild>
						<DropdownMenuItem onClick={() => setMode("DELETE")}>
							Delete Entry
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				{mode === "UPDATE" ? EditTableUpdate() : EditTableDelete()}
			</DialogContent>
		</Dialog>
	);
}
