import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type {
	Definition,
	FormType,
	OnSubmit,
	SchemaType,
} from "./DataTableTypes";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogFooter } from "@/components/ui/dialog";
import { KeyRound } from "lucide-react";
import { useEffect } from "react";

interface Props<T> {
	definition: Definition<T>[];
	form: FormType;
	onSubmit: OnSubmit<T>;
}

type FormInputs = {
	firstName: string;
	lastName: string;
};

function DataTableForm<T>({ definition, form, onSubmit }: Props<T>) {
	const {
		watch,
		clearErrors,
		formState: { errors },
	} = form;

	const pks = definition
		.filter((def) => def.primaryKey)
		.map((def) => def.accessorKey);
	const watchPks = watch(pks as string[]);

	useEffect(() => {
		clearErrors("root.pk");
	}, watchPks);

	function _onSubmit(values: z.infer<SchemaType>) {
		onSubmit(values as T);
	}

	return (
		<>
			<ScrollArea className="max-h-[calc(100dvh-300px)] -mx-4 p-4">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(_onSubmit)}
						className="space-y-8"
					>
						{definition.map(
							(
								{
									primaryKey: pk,
									accessorKey: id,
									header: name,
								},
								index
							) => (
								<FormField
									key={`${name}-${index}`}
									control={form.control}
									name={id as string}
									render={({ field }) => (
										<FormItem>
											<FormLabel
												className={
													pk && errors.root?.pk
														? "text-destructive"
														: ""
												}
											>
												{name}
												{pk && <KeyRound size={16} />}
											</FormLabel>
											<FormControl
												aria-invalid={
													pk && !!errors.root?.pk
												}
											>
												<Input
													placeholder={name}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)
						)}
						<Button
							className="hidden"
							type="submit"
						>
							Hidden
						</Button>
					</form>
				</Form>
			</ScrollArea>
			<DialogFooter className="!flex-row-reverse !justify-between items-center">
				<Button
					onClick={form.handleSubmit(_onSubmit)}
					type="submit"
				>
					Submit
				</Button>
				{errors.root?.pk && (
					<p className="text-destructive">
						{errors.root?.pk?.message}
					</p>
				)}
			</DialogFooter>
		</>
	);
}

export default DataTableForm;
