"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Download, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DashboardContext } from "@/lib/context";
import { sufficientPermissions } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import {
	Permissions,
	QUERY_KEYS,
	type SchemaDrift,
	type SchemaResponse,
	type SchemaTable,
} from "@/lib/types";

const permissionLabels: Record<Permissions, string> = {
	[Permissions.NONE]: "None",
	[Permissions.SPONSOR]: "Sponsor",
	[Permissions.COMMITTEE]: "Committee",
	[Permissions.ADMIN]: "Admin",
	[Permissions.SUPER_ADMIN]: "Super Admin",
};

function PermissionPill({
	permission,
	emptyLabel = "No dashboard API",
}: {
	permission: Permissions | null;
	emptyLabel?: string;
}) {
	if (permission === null) {
		return (
			<span className="rounded-full border border-dashed px-2 py-1 text-xs text-muted-foreground">
				{emptyLabel}
			</span>
		);
	}

	return (
		<span className="rounded-full border bg-muted px-2 py-1 text-xs font-medium">
			{permissionLabels[permission]}
		</span>
	);
}

function DriftSummary({ drift }: { drift: SchemaDrift[] }) {
	return (
		<Card
			className={
				drift.length ? "border-amber-500/50" : "border-emerald-500/40"
			}
		>
			<CardHeader>
				<CardTitle>
					{drift.length ? "Schema Differences" : "Schema Status"}
				</CardTitle>
				<CardDescription>
					{drift.length
						? "The live database differs from the expected schema. The tables below show the live structure."
						: "The live tables, columns, primary keys, defaults, and relationships match the expected schema."}
				</CardDescription>
			</CardHeader>
			{drift.length > 0 && (
				<CardContent className="flex flex-col gap-3">
					{drift.map((item) => (
						<div
							key={item.table}
							className="rounded-lg border border-amber-500/30 p-4 text-sm"
						>
							<p className="font-mono font-medium">
								{item.table}
							</p>
							{item.missing_columns.length > 0 && (
								<p>
									Missing columns:{" "}
									{item.missing_columns.join(", ")}
								</p>
							)}
							{item.extra_columns.length > 0 && (
								<p>
									Extra columns:{" "}
									{item.extra_columns.join(", ")}
								</p>
							)}
							{item.changed_columns.length > 0 && (
								<p>
									Changed column definitions:{" "}
									{item.changed_columns.join(", ")}
								</p>
							)}
							{item.relationships_changed && (
								<p>
									Relationships differ from the expected
									schema.
								</p>
							)}
						</div>
					))}
				</CardContent>
			)}
		</Card>
	);
}

function SchemaTableCard({ table }: { table: SchemaTable }) {
	const { permission } = useContext(DashboardContext);
	const canOpen =
		table.view_permission !== null &&
		sufficientPermissions(permission, table.view_permission);
	const canEdit =
		table.modify_permission !== null &&
		sufficientPermissions(permission, table.modify_permission);
	return (
		<Card
			id={`table-${table.name}`}
			className="min-w-0 scroll-mt-4"
		>
			<CardHeader>
				<CardTitle className="flex flex-wrap items-center justify-between gap-4">
					<span className="text-2xl">{table.name}</span>
					<code className="rounded bg-muted px-2 py-1 text-sm">
						Primary key: {table.primary_key.join(", ") || "None"}
					</code>
				</CardTitle>
				<CardDescription>{table.purpose}</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-6">
				<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
					<div className="rounded-lg border p-4">
						<p className="text-xs uppercase tracking-wide text-muted-foreground">
							Dashboard Page
						</p>
						{table.dashboard_path && canOpen ? (
							<Link
								href={table.dashboard_path}
								className="mt-2 inline-block text-sm font-medium underline underline-offset-4"
							>
								{table.dashboard_path}
							</Link>
						) : (
							<p className="mt-2 text-sm text-muted-foreground">
								{table.dashboard_path
									? "Requires a higher permission level"
									: "No dashboard editor"}
							</p>
						)}
						{table.dashboard_path && canOpen && (
							<p className="mt-2 text-sm text-muted-foreground">
								{canEdit
									? "You can edit this table."
									: "View only for your role."}
							</p>
						)}
					</div>
					<div className="rounded-lg border p-4">
						<p className="text-xs uppercase tracking-wide text-muted-foreground">
							Data View Permission
						</p>
						<div className="mt-2">
							<PermissionPill
								permission={table.view_permission}
							/>
						</div>
					</div>
					<div className="rounded-lg border p-4">
						<p className="text-xs uppercase tracking-wide text-muted-foreground">
							Data Edit Permission
						</p>
						<div className="mt-2">
							<PermissionPill
								permission={table.modify_permission}
							/>
						</div>
					</div>
					<div className="rounded-lg border p-4">
						<p className="text-xs uppercase tracking-wide text-muted-foreground">
							Relationships
						</p>
						<p className="mt-2 text-sm text-muted-foreground">
							{table.foreign_keys.length === 0
								? "No foreign keys"
								: `${table.foreign_keys.length} foreign key${
										table.foreign_keys.length === 1
											? ""
											: "s"
									}`}
						</p>
					</div>
				</div>

				<div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
					<div className="space-y-3">
						<h3 className="font-semibold">Columns</h3>
						<div className="overflow-hidden rounded-lg border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Not Null</TableHead>
										<TableHead>Default</TableHead>
										<TableHead>PK</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{table.columns.map((column) => (
										<TableRow key={column.name}>
											<TableCell className="font-mono">
												{column.name}
											</TableCell>
											<TableCell>{column.type}</TableCell>
											<TableCell>
												{column.not_null ? "Yes" : "No"}
											</TableCell>
											<TableCell className="font-mono text-xs">
												{column.default_value ?? "None"}
											</TableCell>
											<TableCell>
												{column.is_primary_key
													? "Yes"
													: "No"}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>

					<div className="space-y-3">
						<h3 className="font-semibold">Foreign Keys</h3>
						<div className="rounded-lg border">
							{table.foreign_keys.length === 0 ? (
								<div className="p-4 text-sm text-muted-foreground">
									This table does not reference another table.
								</div>
							) : (
								<div className="flex flex-col divide-y">
									{table.foreign_keys.map((foreignKey) => (
										<div
											key={`${foreignKey.column}-${foreignKey.references_table}`}
											className="p-4 text-sm"
										>
											<p className="font-mono">
												{foreignKey.column}{" "}
												<span className="text-muted-foreground">
													-&gt;
												</span>{" "}
												<a
													href={`#table-${foreignKey.references_table}`}
													className="underline underline-offset-4"
												>
													{
														foreignKey.references_table
													}
													.
													{
														foreignKey.references_column
													}
												</a>
											</p>
											<p className="mt-2 text-muted-foreground">
												On update:{" "}
												{foreignKey.on_update}
											</p>
											<p className="text-muted-foreground">
												On delete:{" "}
												{foreignKey.on_delete}
											</p>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function SchemaAdmin() {
	const { token, fetchPath, permission } = useContext(DashboardContext);
	const [downloading, setDownloading] = useState(false);
	const canView = sufficientPermissions(permission, Permissions.COMMITTEE);
	const canDownload = sufficientPermissions(
		permission,
		Permissions.SUPER_ADMIN
	);

	const { data, status, error, refetch, isFetching } =
		useQuery<SchemaResponse>({
			queryKey: QUERY_KEYS.schema,
			queryFn: () => fetchPath("/schema", { method: "GET" }),
			enabled: canView,
		});

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
					<CardDescription>
						Loading the database tables and relationships.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center gap-2 text-muted-foreground">
					<LoaderCircle className="animate-spin" />
					<span>Loading schema metadata...</span>
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
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader className="gap-3">
					<CardTitle className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
						<span>Schema Admin</span>
						<div className="flex flex-wrap gap-2">
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
						Explore what each table stores, how tables connect, and
						where you can edit them. A primary key identifies a row;
						a foreign key connects it to a row in another table.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-3 md:grid-cols-3">
					<div className="rounded-lg border p-4">
						<p className="text-xs uppercase tracking-wide text-muted-foreground">
							Tables
						</p>
						<p className="mt-2 text-2xl font-semibold">
							{data.tables.length}
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<p className="text-xs uppercase tracking-wide text-muted-foreground">
							Visible To
						</p>
						<div className="mt-2">
							<PermissionPill
								permission={Permissions.COMMITTEE}
							/>
						</div>
					</div>
					<div className="rounded-lg border p-4">
						<p className="text-xs uppercase tracking-wide text-muted-foreground">
							Export Access
						</p>
						<div className="mt-2">
							<PermissionPill
								permission={Permissions.SUPER_ADMIN}
							/>
						</div>
						<p className="mt-2 text-sm text-muted-foreground">
							Downloads include member records and access tokens.
						</p>
					</div>
				</CardContent>
			</Card>

			<DriftSummary drift={data.drift} />

			<nav
				aria-label="Database tables"
				className="flex flex-wrap gap-2"
			>
				{data.tables.map((table) => (
					<a
						key={table.name}
						href={`#table-${table.name}`}
						className="rounded-md border px-3 py-2 font-mono text-sm hover:bg-muted"
					>
						{table.name}
					</a>
				))}
			</nav>

			<div className="flex flex-col gap-6">
				{data.tables.map((table) => (
					<SchemaTableCard
						key={table.name}
						table={table}
					/>
				))}
			</div>
		</div>
	);
}

export default SchemaAdmin;
