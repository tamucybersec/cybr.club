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
import { useContext, useEffect, useState } from "react";
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

export function DataTableCreate<T>(
	queryKey: string[],
	definition: Definition<T>[],
	defaultValues: T,
	onCreate: CreateEntry<T>
) {
	const queryClient = useQueryClient();
	const { table } = useContext(DataTableContext);
	const [open, setOpen] = useState(false);
	const schema = getSchema();
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues as { [x: string]: any },
	});

	useEffect(() => {
		form.reset();
	}, [open]);

	function getSchema() {
		function map({ primaryKey, accessorKey, type }: Definition<T>) {
			if (primaryKey === undefined) {
				return [accessorKey, type];
			} else {
				return [
					accessorKey,
					type.refine(
						(value) => uniquePrimaryKey(accessorKey, value),
						"This Primary Key conflicts with another item in the database."
					),
				];
			}
		}

		return z.object(Object.fromEntries(definition.map(map)));
	}

	function uniquePrimaryKey(pk: keyof T, value: any): boolean {
		const data = queryClient.getQueryData<T[]>(queryKey) ?? [];
		for (let i = 0; i < data.length; i++) {
			if (data[i][pk] === value) {
				return false;
			}
		}

		return true;
	}

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
		onError: (_, __, context) => {
			queryClient.setQueryData(queryKey, context?.prev);
		},
	});

	function onSubmit(to: T) {
		mutateCreate(to);
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
						Create a new entry in the database.
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
	let _pk: keyof T = "" as keyof T;
	const queryClient = useQueryClient();
	const [mode, setMode] = useState<"UPDATE" | "DELETE">("DELETE");
	const [open, setOpen] = useState(false);
	const [defaultValuesRow, setDefaultValuesRow] = useState(
		defaultValuesFromRow()
	);
	const schema = getSchema();
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValuesRow as { [x: string]: any },
	});

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

	function getSchema() {
		function map({ primaryKey, accessorKey, type }: Definition<T>) {
			if (primaryKey === undefined) {
				return [accessorKey, type];
			} else {
				_pk = accessorKey;
				return [
					accessorKey,
					type.refine(
						(value) => uniquePrimaryKey(accessorKey, value),
						"This Primary Key conflicts with another item in the database."
					),
				];
			}
		}

		return z.object(Object.fromEntries(definition.map(map)));
	}

	function uniquePrimaryKey(pk: keyof T, value: any): boolean {
		if (defaultValuesRow[pk] === value || mode === "DELETE") {
			return true;
		}

		const data = queryClient.getQueryData<T[]>(queryKey) ?? [];
		for (let i = 0; i < data.length; i++) {
			if (data[i][pk] === value) {
				return false;
			}
		}

		return true;
	}

	const { mutate: mutateUpdate } = useMutation({
		mutationFn: ({ from, to }: { from: T; to: T }) => onUpdate(from, to),
		onMutate: async ({ from, to }) => {
			await queryClient.cancelQueries({ queryKey });
			const prev = queryClient.getQueryData<T[]>(queryKey);
			queryClient.setQueryData(queryKey, (old: T[]) =>
				old?.map((o) => (o[_pk] == from[_pk] ? to : o))
			);

			return { prev };
		},
		onError: (_, __, context) => {
			queryClient.setQueryData(queryKey, context?.prev);
		},
	});

	function EditTableUpdate() {
		function onSubmit(to: T) {
			mutateUpdate({ from: defaultValuesRow, to });
			setDefaultValuesRow(to);
			setOpen(false);
		}

		return (
			<>
				<DialogHeader>
					<DialogTitle>
						Update Entry "{String(defaultValuesRow[_pk])}"
					</DialogTitle>
					<DialogDescription>
						Update the values of an entry in the database.
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
				old?.filter((o) => o[_pk] !== deleted[_pk])
			);

			return { prev };
		},
		onError: (_, __, context) => {
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
					<DialogTitle>
						Delete Entry "{String(defaultValuesRow[_pk])}"
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone. Are you sure you want to
						permanently delete this entry from the database?
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
