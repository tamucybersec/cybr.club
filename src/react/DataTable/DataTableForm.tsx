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
import type { Definition, FormType, OnSubmit, SchemaType } from "./DataTableTypes";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogFooter } from "@/components/ui/dialog";

interface Props<T> {
	definition: Definition<T>[];
	form: FormType;
	onSubmit: OnSubmit<T>;
}

function DataTableForm<T>({ definition, form, onSubmit }: Props<T>) {
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
							({ accessorKey: id, header: name }, index) => (
								<FormField
									key={`${name}-${index}`}
									control={form.control}
									name={id as string}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{name}</FormLabel>
											<FormControl>
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
			<DialogFooter>
				<Button
					onClick={form.handleSubmit(_onSubmit)}
					type="submit"
				>
					Submit
				</Button>
			</DialogFooter>
		</>
	);
}

export default DataTableForm;
