"use client";

import { useContext, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { DashboardContext } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Campaign = {
	name: string;
	slug: string;
	source: string;
	url: string;
	created_at: string;
	archived: boolean;
};
const tagPattern = "[a-z0-9_-]{1,80}";
const suggestedTag = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9_-]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80);

function downloadFile(url: string, filename: string) {
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	link.remove();
}

export default function CampaignManager() {
	const { fetchPath } = useContext(DashboardContext);
	const queryClient = useQueryClient();
	const [name, setName] = useState("");
	const [slug, setSlug] = useState("");
	const [source, setSource] = useState("");
	const [tagEdited, setTagEdited] = useState(false);
	const [search, setSearch] = useState("");
	const [showArchived, setShowArchived] = useState(false);
	const [selectedSlug, setSelectedSlug] = useState<string>();
	const [feedback, setFeedback] = useState("");
	const [actionError, setActionError] = useState("");
	const svgRef = useRef<SVGSVGElement>(null);
	const {
		data: campaigns = [],
		isPending,
		error,
		refetch,
	} = useQuery<Campaign[]>({
		queryKey: ["outreach-campaigns"],
		queryFn: () => fetchPath("/analytics/campaigns", { method: "GET" }),
		retry: false,
	});
	const create = useMutation<
		Campaign,
		Error,
		{ name: string; slug: string; source: string }
	>({
		mutationFn: (params) => fetchPath("/analytics/campaigns", { params }),
		onSuccess: (campaign) => {
			queryClient.setQueryData<Campaign[]>(
				["outreach-campaigns"],
				(old) => [campaign, ...(old ?? [])]
			);
			setSelectedSlug(campaign.slug);
			setName("");
			setSlug("");
			setSource("");
			setTagEdited(false);
			setFeedback("Campaign created. Your QR code is ready to download.");
		},
	});
	const archive = useMutation<Campaign, Error, Campaign>({
		mutationFn: (campaign) =>
			fetchPath(
				`/analytics/campaigns/${encodeURIComponent(campaign.slug)}/archive`,
				{ params: { archived: !campaign.archived } }
			),
		onSuccess: (campaign) => {
			queryClient.setQueryData<Campaign[]>(
				["outreach-campaigns"],
				(old) =>
					(old ?? []).map((row) =>
						row.slug === campaign.slug ? campaign : row
					)
			);
			setFeedback(
				campaign.archived
					? "Campaign archived. Existing QR codes still work."
					: "Campaign restored."
			);
		},
	});
	const selected = campaigns.find((c) => c.slug === selectedSlug);
	const visible = campaigns.filter(
		(c) =>
			(showArchived || !c.archived) &&
			`${c.name} ${c.slug} ${c.source}`
				.toLowerCase()
				.includes(search.toLowerCase())
	);

	async function copyLink() {
		if (!selected) return;
		setActionError("");
		setFeedback("");
		try {
			await navigator.clipboard.writeText(selected.url);
			setFeedback("Campaign link copied.");
		} catch {
			setActionError(
				"Could not copy automatically. Select and copy the link below."
			);
		}
	}

	async function download(format: "svg" | "png") {
		if (!svgRef.current || !selected) return;
		setActionError("");
		const svg = new XMLSerializer().serializeToString(svgRef.current);
		const url = URL.createObjectURL(
			new Blob([svg], { type: "image/svg+xml;charset=utf-8" })
		);
		try {
			if (format === "svg") downloadFile(url, `${selected.slug}-qr.svg`);
			else {
				const img = new window.Image();
				await new Promise<void>((resolve, reject) => {
					img.onload = () => resolve();
					img.onerror = () =>
						reject(new Error("QR image could not load."));
					img.src = url;
				});
				const canvas = document.createElement("canvas");
				canvas.width = canvas.height = 1024;
				const context = canvas.getContext("2d");
				if (!context) throw new Error("Image download is unavailable.");
				context.drawImage(img, 0, 0, 1024, 1024);
				downloadFile(
					canvas.toDataURL("image/png"),
					`${selected.slug}-qr.png`
				);
			}
			setFeedback(`${format.toUpperCase()} QR code downloaded.`);
		} catch {
			setActionError("Could not download the QR code. Please try again.");
		} finally {
			setTimeout(() => URL.revokeObjectURL(url), 1000);
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<h2>Campaign manager</h2>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<p className="text-sm text-muted-foreground">
					Create a unique QR link for each poster or placement.
					Campaigns are shared with other officers. Use sources such
					as msc, zachry, or instagram to group traffic.
				</p>
				<form
					className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-end"
					onSubmit={(event) => {
						event.preventDefault();
						setFeedback("");
						setActionError("");
						create.mutate({ name: name.trim(), slug, source });
					}}
				>
					<label className="space-y-1 text-sm">
						Campaign name
						<Input
							required
							maxLength={100}
							value={name}
							placeholder="MSC entrance poster"
							onChange={(e) => {
								setName(e.target.value);
								if (!tagEdited)
									setSlug(suggestedTag(e.target.value));
							}}
						/>
					</label>
					<label className="space-y-1 text-sm">
						Campaign tag
						<Input
							required
							pattern={tagPattern}
							maxLength={80}
							title="Use lowercase letters, numbers, hyphens, or underscores."
							value={slug}
							placeholder="msc-entrance-poster"
							onChange={(e) => {
								setTagEdited(true);
								setSlug(e.target.value.toLowerCase());
							}}
						/>
					</label>
					<label className="space-y-1 text-sm">
						Source
						<Input
							required
							pattern={tagPattern}
							maxLength={80}
							title="Use lowercase letters, numbers, hyphens, or underscores."
							value={source}
							placeholder="msc"
							onChange={(e) =>
								setSource(e.target.value.toLowerCase())
							}
						/>
					</label>
					<Button
						type="submit"
						disabled={create.isPending}
					>
						{create.isPending ? "Creating…" : "Create campaign"}
					</Button>
				</form>
				<p className="text-xs text-muted-foreground">
					Tags and sources appear in public links. Keep them free of
					personal information. Tags are fixed after creation; archive
					old campaigns instead of reusing their tags.
				</p>
				{create.error && (
					<p
						role="alert"
						className="text-destructive"
					>
						{create.error.message}
					</p>
				)}
				{archive.error && (
					<p
						role="alert"
						className="text-destructive"
					>
						{archive.error.message}
					</p>
				)}
				{actionError && (
					<p
						role="alert"
						className="text-destructive"
					>
						{actionError}
					</p>
				)}
				{feedback && <p role="status">{feedback}</p>}
				{selected && (
					<div
						className="flex flex-col sm:flex-row gap-6 rounded-lg border p-4 items-start"
						aria-label="Selected campaign QR code"
					>
						<div className="shrink-0 rounded bg-white p-2">
							<QRCodeSVG
								ref={svgRef}
								value={selected.url}
								size={200}
								level="M"
								marginSize={4}
								title={`QR code for ${selected.name}`}
							/>
						</div>
						<div className="space-y-3 min-w-0 flex-1">
							<h3 className="text-lg font-semibold">
								{selected.name}
								{selected.archived ? " (archived)" : ""}
							</h3>
							<p className="text-sm">
								Campaign: {selected.slug} · Source:{" "}
								{selected.source}
							</p>
							<label className="block text-sm">
								Campaign link
								<Input
									readOnly
									value={selected.url}
									onFocus={(e) => e.target.select()}
								/>
							</label>
							{/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/)/.test(
								selected.url
							) && (
								<p className="text-sm text-amber-600 dark:text-amber-400">
									Local test link: this QR code opens only on
									this computer. Create production codes from
									the deployed dashboard before printing
									posters.
								</p>
							)}
							<div className="flex flex-wrap gap-2">
								<Button
									type="button"
									variant="outline"
									onClick={copyLink}
								>
									Copy link
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => download("png")}
								>
									Download PNG
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => download("svg")}
								>
									Download SVG
								</Button>
								<Button
									asChild
									variant="outline"
								>
									<a
										href={selected.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										Open link
									</a>
								</Button>
							</div>
							<p className="text-xs text-muted-foreground">
								SVG scales cleanly for posters. Traffic appears
								in the QR campaigns report after the first
								visit. Archiving hides the campaign from the
								active list; printed codes and reports keep
								working.
							</p>
						</div>
					</div>
				)}
				<div className="flex flex-wrap gap-4 items-center">
					<label className="flex-1 min-w-[180px] text-sm">
						Find campaigns
						<Input
							type="search"
							value={search}
							placeholder="Search names, tags, or sources"
							onChange={(e) => setSearch(e.target.value)}
						/>
					</label>
					<label className="flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={showArchived}
							onChange={(e) => setShowArchived(e.target.checked)}
						/>
						Include archived
					</label>
					<Button
						type="button"
						variant="outline"
						onClick={() => refetch()}
					>
						Reload campaigns
					</Button>
				</div>
				{error ? (
					<p role="alert">{error.message}</p>
				) : isPending ? (
					<p role="status">Loading campaigns…</p>
				) : visible.length ? (
					<div className="overflow-x-auto">
						<table className="w-full text-left text-sm">
							<thead>
								<tr>
									{[
										"Campaign",
										"Source",
										"Status",
										"Actions",
									].map((label) => (
										<th
											className="p-2"
											key={label}
										>
											{label}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{visible.map((c) => (
									<tr
										className="border-t"
										key={c.slug}
									>
										<td className="p-2">
											<div className="font-medium">
												{c.name}
											</div>
											<div className="text-muted-foreground break-all">
												{c.slug}
											</div>
										</td>
										<td className="p-2 break-all">
											{c.source}
										</td>
										<td className="p-2">
											{c.archived ? "Archived" : "Active"}
										</td>
										<td className="p-2">
											<div className="flex gap-2">
												<Button
													type="button"
													variant="outline"
													onClick={() => {
														setSelectedSlug(c.slug);
														setFeedback("");
														setActionError("");
													}}
												>
													View QR
												</Button>
												<Button
													type="button"
													variant="ghost"
													disabled={archive.isPending}
													onClick={() =>
														archive.mutate(c)
													}
												>
													{c.archived
														? "Restore"
														: "Archive"}
												</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p className="text-sm text-muted-foreground">
						{campaigns.length
							? "No campaigns match these filters."
							: "No saved campaigns yet. Create your first campaign above."}
					</p>
				)}
			</CardContent>
		</Card>
	);
}
