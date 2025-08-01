"use client";

import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import type { GetEntries, ReplaceEntries } from "./DataTableTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDownload } from "@/hooks/useDownload";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { capitalize } from "@/lib/helpers";

interface Props<T> {
	prefix: string;
	queryKey: string[];
	onGet: GetEntries<T>;
	onReplace: ReplaceEntries<T>;
}

function DataTableDownloadUpload<T>({
	prefix,
	queryKey,
	onGet,
	onReplace,
}: Props<T>) {
	const [open, setOpen] = useState(false);

	const { data } = useQuery({
		queryKey,
		queryFn: onGet,
	});

	const download = useDownload(prefix, data ?? {});

	const queryClient = useQueryClient();
	const { mutate: mutateReplace } = useMutation({
		mutationFn: onReplace,
		onMutate: async (replacement: T[]) => {
			await queryClient.cancelQueries({ queryKey });
			const prev = queryClient.getQueryData<T[]>(queryKey);
			queryClient.setQueryData(queryKey, replacement);
			return { prev };
		},
		onSuccess: () => {
			setOpen(false);
		},
		onError: (error, _, context) => {
			console.error(error);
			toast.error(error.message);
			queryClient.setQueryData(queryKey, context?.prev);
		},
	});

	function UploadForm() {
		const [downloaded, setDownloaded] = useState(false);

		const name = queryKey
			.map((k) => k.substring(0, 1).toLocaleUpperCase() + k.substring(1))
			.join(" ");
		const confirmation = `Irreversibly replace the ${name}`;

		const formSchema = z
			.object({
				replacement: z
					.instanceof(FileList)
					.refine(
						(file) => file?.length == 1,
						"Replace is required."
					),
				confirmation: z
					.string()
					.refine((value) => value === confirmation, {
						message: "Confirmation incorrect.",
					}),
			})
			.refine(() => downloaded, {
				message: "You must download a backup before submitting.",
				path: ["backupDownloaded"],
			});

		const form = useForm({
			resolver: zodResolver(formSchema),
			defaultValues: {
				confirmation: "",
			},
		});

		const replacementRef = form.register("replacement");
		const downloadError = (form.formState.errors as any).backupDownloaded;
		useEffect(() => {
			if (!open) {
				form.reset();
				setDownloaded(false);
			}
		}, [open]);

		async function onSubmit(values: z.infer<typeof formSchema>) {
			try {
				const file = values.replacement.item(0)!;
				const reader = new FileReader();
				reader.onload = () => {
					try {
						const json = JSON.parse(reader.result as string);
						if (!Array.isArray(json)) {
							toast.error(
								"Error: Input must be an array of objects."
							);
							return;
						}
						mutateReplace(json);
					} catch (error) {
						toast.error(`Error: ${(error as Error).message}`);
					}
				};
				reader.readAsText(file);
			} catch {
				form.setError(
					"replacement",
					new Error("Unable to retrieve file.")
				);
			}
		}

		return (
			<>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="replacement"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Replacement</FormLabel>
									<FormControl>
										<Input
											type="file"
											{...replacementRef}
										/>
									</FormControl>
									<FormDescription>
										A valid json document that will replace
										the current table.
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormItem>
							<FormLabel
								className={
									downloadError ? "text-destructive" : ""
								}
							>
								Create Backup
							</FormLabel>
							<FormControl>
								<Button
									variant={"outline"}
									onClick={() => {
										setDownloaded(true);
										download();
									}}
								>
									<Download />
									Download Backup
								</Button>
							</FormControl>
							<FormDescription>
								You must download a backup of the current table
								before uploading a new one.
							</FormDescription>
						</FormItem>
						{downloadError && (
							<p className="text-sm text-destructive">
								{downloadError.message}
							</p>
						)}
						<FormField
							control={form.control}
							name="confirmation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmation</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>
										Type "{confirmation}" to confirm the
										upload.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="hidden"
						>
							Submit
						</Button>
					</form>
				</Form>
				<DialogFooter>
					<Button
						variant={"destructive"}
						type="submit"
						onClick={form.handleSubmit(onSubmit)}
					>
						Submit
					</Button>
				</DialogFooter>
			</>
		);
	}

	return (
		<div className="flex gap-2">
			<Button
				variant={"outline"}
				onClick={download}
			>
				<Download />
				Download
			</Button>
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<Button variant={"outline"}>
						<Upload />
						Upload
					</Button>
				</DialogTrigger>
				<DialogContent className="border-red-400 shadow-red-950">
					<DialogHeader>
						<DialogTitle>
							Replace {capitalize(prefix)} Table
						</DialogTitle>
						<DialogDescription>
							<span className="underline font-bold">
								This action is irreversible.
							</span>{" "}
							Please download a copy of the table and type the
							confirmation message before uploading the new table.
							You will be notified if any error occurs during the
							process. An error will cancel the transaction,
							preventing any data loss.
						</DialogDescription>
					</DialogHeader>
					{UploadForm()}
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default DataTableDownloadUpload;
