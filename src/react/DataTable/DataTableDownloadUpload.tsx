import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import type { GetEntries, ReplaceEntries } from "./DataTableTypes";
import { useQuery } from "@tanstack/react-query";
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
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "@/scripts/context";

interface Props<T> {
	queryKey: string[];
	onGet: GetEntries<T>;
	onReplace: ReplaceEntries<T>;
}

function DataTableDownloadUpload<T>({ queryKey, onGet, onReplace }: Props<T>) {
	const { validatePassword } = useContext(DashboardContext);
	const [open, setOpen] = useState(false);

	const { data } = useQuery({
		queryKey,
		queryFn: onGet,
	});

	const download = useDownload(data ?? {});

	function UploadForm() {
		const [downloaded, setDownloaded] = useState(false);

		const name = queryKey
			.map((k) => k.substring(0, 1).toLocaleUpperCase() + k.substring(1))
			.join(" ");
		const confirmation = `Irreversibly Replace ${name} Database`;

		const formSchema = z
			.object({
				replacement: z
					.instanceof(FileList)
					.refine(
						(file) => file?.length == 1,
						"Replace is required."
					),
				password: z.string().refine(validatePassword, {
					message: "Password does not match password used to log in.",
				}),
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
				password: "",
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
					const json = JSON.parse(reader.result as string);
					onReplace(json);
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
										the current database.
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
								You must download a backup of the current
								database before uploading a new one.
							</FormDescription>
						</FormItem>
						{downloadError && (
							<p className="text-sm text-destructive">
								{downloadError.message}
							</p>
						)}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Re-enter your password for verification.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<DialogTitle>Upload Database</DialogTitle>
						<DialogDescription>
							<span className="underline font-bold">
								This action is irreversible.
							</span>{" "}
							Please download a copy of the database, re-enter
							your password, and type the confirmation message
							before uploading the new database.
						</DialogDescription>
					</DialogHeader>
					{UploadForm()}
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default DataTableDownloadUpload;
