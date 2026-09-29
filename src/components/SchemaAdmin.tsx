"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Copy, Download, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DashboardContext } from "@/lib/context";
import { sufficientPermissions } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import { Permissions, QUERY_KEYS } from "@/lib/types";
import { schemaGuide } from "@/data/schema-guide";

const SCHEMA_URL =
	"https://raw.githubusercontent.com/tamucybersec/CyberHam/main/cyberham/database/schema.sql";

function SchemaAdmin() {
	const { token, permission } = useContext(DashboardContext);
	const [downloading, setDownloading] = useState(false);
	const canView = sufficientPermissions(permission, Permissions.COMMITTEE);
	const canDownload = sufficientPermissions(
		permission,
		Permissions.SUPER_ADMIN
	);

	const { data, status, error, refetch, isFetching } = useQuery<string>({
		queryKey: QUERY_KEYS.schema,
		queryFn: async () => {
			const response = await fetch(SCHEMA_URL);
			if (!response.ok) {
				throw new Error(
					"The SQL schema could not be loaded. Please try again."
				);
			}
			return response.text();
		},
		enabled: canView,
	});

	async function copySchema() {
		if (!data) return;

		try {
			await navigator.clipboard.writeText(data);
			toast.success("SQL schema copied.");
		} catch {
			toast.error(
				"Could not copy the schema. Select the SQL below and copy it manually."
			);
		}
	}

	async function downloadDatabase() {
		if (!canDownload || downloading) return;

		if (!token) {
			toast.error("No dashboard token is available for download.");
			return;
		}

		setDownloading(true);
		try {
			const response = await fetch(`${API_URL}/database/export`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				let message = "Database download failed.";
				try {
					const json = await response.json();
					message = json.detail ?? json.details ?? message;
				} catch {}
				throw new Error(message);
			}

			const blob = await response.blob();
			const filename = "cyberham.db";
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (err) {
			toast.error((err as Error).message);
		} finally {
			setDownloading(false);
		}
	}

	if (!canView) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Schema Admin</CardTitle>
					<CardDescription>
						This page is only available to committee members and
						higher.
					</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	if (status === "pending") {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Schema Admin</CardTitle>
					<CardDescription>Loading the SQL schema.</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center gap-2 text-muted-foreground">
					<LoaderCircle className="animate-spin" />
					<span>Loading schema...</span>
				</CardContent>
			</Card>
		);
	}

	if (status === "error") {
		return (
			<Card className="border-destructive/50">
				<CardHeader>
					<CardTitle>Schema Admin</CardTitle>
					<CardDescription>
						The database schema could not be loaded.
					</CardDescription>
				</CardHeader>
				<CardContent className="text-sm text-destructive">
					{error.message}
					<Button
						className="ml-3"
						variant="outline"
						onClick={() => refetch()}
					>
						Try Again
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="min-w-0">
			<CardHeader className="gap-3">
				<CardTitle className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<span>Database Schema</span>
					<div className="flex flex-wrap gap-2">
						<Button
							onClick={copySchema}
							disabled={!data}
						>
							<Copy />
							Copy SQL
						</Button>
						<Button
							variant="outline"
							onClick={() => refetch()}
							disabled={isFetching}
						>
							{isFetching ? "Refreshing..." : "Refresh"}
						</Button>
						{canDownload && (
							<Button
								variant="outline"
								onClick={downloadDatabase}
								disabled={downloading}
							>
								<Download />
								{downloading
									? "Downloading..."
									: "Download Database"}
							</Button>
						)}
					</div>
				</CardTitle>
				<CardDescription>
					Copy this SQL into your AI prompt to help write a query.
					This is CyberHam&apos;s canonical schema from{" "}
					<a
						href="https://github.com/tamucybersec/CyberHam/blob/main/cyberham/database/schema.sql"
						className="underline underline-offset-4"
					>
						schema.sql
					</a>
					; the deployed database may differ.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<details className="mb-4 rounded-md border p-4">
					<summary className="cursor-pointer font-medium">
						Table guide: purposes, relationships, and editors
					</summary>
					<dl className="mt-3 divide-y text-sm">
						{schemaGuide.map(
							({ name, purpose, relationships, editor }) => (
								<div
									key={name}
									className="grid gap-2 py-3 sm:grid-cols-[7rem_minmax(0,1fr)]"
								>
									<dt className="font-mono font-semibold">
										{name}
									</dt>
									<dd className="space-y-2">
										<p>{purpose}</p>
										<p className="text-muted-foreground">
											{relationships}
										</p>
										<p>
											{!editor ? (
												"No dashboard editor."
											) : sufficientPermissions(
													permission,
													editor.viewPermission
											  ) ? (
												<>
													<Link
														href={editor.path}
														className="underline underline-offset-4"
													>
														{editor.label}
													</Link>
													{sufficientPermissions(
														permission,
														editor.editPermission
													)
														? " — you can edit this table."
														: " — view only; editing requires Admin."}
												</>
											) : (
												`${editor.label} editor — requires Super Admin.`
											)}
										</p>
									</dd>
								</div>
							)
						)}
					</dl>
				</details>
				<pre
					tabIndex={0}
					aria-label="SQL database schema"
					className="max-h-[70vh] overflow-auto rounded-md border bg-muted p-4 text-sm"
				>
					<code>{data}</code>
				</pre>
				{canDownload && (
					<p className="mt-3 text-sm text-muted-foreground">
						Database downloads include member records and access
						tokens.
					</p>
				)}
			</CardContent>
		</Card>
	);
}

export default SchemaAdmin;
