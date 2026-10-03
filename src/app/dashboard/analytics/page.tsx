"use client";

import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardContext } from "@/lib/context";
import { Permissions } from "@/lib/types";
import { fetchPath } from "@/lib/fetchUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoricalLineChart from "@/components/Charts/CategoricalLineChart";
import CategoricalBarChart from "@/components/Charts/CategoricalBarChart";

type Report = {
	page_visits: number;
	qr_visits: number;
	clicks: { join: number; learn_more: number };
	trend: { label: string; title: string; count: number }[];
	campaigns: {
		name: string;
		visits: number;
		join: number;
		learn_more: number;
	}[];
	referrers: { label: string; count: number }[];
};
const dateString = (daysAgo: number) =>
	new Date(Date.now() - daysAgo * 86400000).toISOString().slice(0, 10);

export default function AnalyticsPage() {
	const { token, permission } = useContext(DashboardContext);
	const canView = permission >= Permissions.COMMITTEE;
	const [start, setStart] = useState(() => dateString(29));
	const [end, setEnd] = useState(() => dateString(0));
	const [range, setRange] = useState({ start, end });
	const valid = Boolean(
		start &&
			end &&
			start <= end &&
			end <= dateString(0) &&
			(Date.parse(end) - Date.parse(start)) / 86400000 < 90
	);
	const { data, isPending, isFetching, error, refetch } = useQuery<Report>({
		queryKey: ["analytics", token, range],
		queryFn: () =>
			fetchPath<Report>(
				token,
				`/analytics?${new URLSearchParams(range)}`,
				{ method: "GET" }
			),
		enabled: canView && Boolean(token),
		retry: false,
	});
	if (!canView)
		return (
			<p>You need committee or admin access to view website analytics.</p>
		);
	return (
		<>
			<h1 className="text-3xl font-bold">Website Analytics</h1>
			<p className="text-muted-foreground">
				Public website traffic and QR outreach. Counts use GoatCounter’s
				session-based visitor and event counting; clicks indicate
				interest, not completed memberships. Dates are in UTC.
			</p>
			<form
				className="flex flex-wrap items-end gap-4"
				onSubmit={(event) => {
					event.preventDefault();
					if (valid) setRange({ start, end });
				}}
			>
				<label className="flex flex-col gap-1">
					Start date
					<input
						className="rounded border p-2"
						type="date"
						value={start}
						max={end}
						onChange={(e) => setStart(e.target.value)}
						required
					/>
				</label>
				<label className="flex flex-col gap-1">
					End date
					<input
						className="rounded border p-2"
						type="date"
						value={end}
						min={start}
						max={dateString(0)}
						onChange={(e) => setEnd(e.target.value)}
						required
					/>
				</label>
				<Button
					type="submit"
					disabled={!valid || isFetching}
				>
					Apply dates
				</Button>
				<Button
					type="button"
					variant="outline"
					disabled={isFetching}
					onClick={() => refetch()}
				>
					Refresh
				</Button>
			</form>
			{!valid && (
				<p role="alert">
					Choose a range of up to 90 days ending today or earlier.
				</p>
			)}
			{error ? (
				<p role="alert">{error.message}</p>
			) : isPending ? (
				<p role="status">Loading website analytics…</p>
			) : (
				data && (
					<>
						<p className="text-sm text-muted-foreground">
							Showing {range.start} through {range.end} (UTC).
						</p>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{[
								["Page visits", data.page_visits],
								["QR visits", data.qr_visits],
								["QR Join clicks", data.clicks.join],
								[
									"QR Learn More clicks",
									data.clicks.learn_more,
								],
							].map(([title, count]) => (
								<Card key={title}>
									<CardHeader>
										<CardTitle>{title}</CardTitle>
									</CardHeader>
									<CardContent className="text-3xl font-bold">
										{count.toLocaleString()}
									</CardContent>
								</Card>
							))}
						</div>
						{data.page_visits === 0 && (
							<p>
								No public page visits recorded for this period.
							</p>
						)}
						<Card>
							<CardHeader>
								<CardTitle>Daily page visits</CardTitle>
							</CardHeader>
							<CardContent className="[&_[data-chart]]:h-[300px] [&_[data-chart]]:w-full">
								<CategoricalLineChart
									metric="visits"
									data={data.trend}
								/>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>QR campaigns</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="mb-4 text-sm text-muted-foreground">
									Give each poster or location its own
									campaign, for example
									/qr?utm_campaign=msc-poster&amp;utm_source=msc.
									Untagged visits are included in QR totals
									only.
								</p>
								{data.campaigns.length ? (
									<div className="overflow-x-auto">
										<table className="w-full text-left">
											<thead>
												<tr>
													{[
														"Campaign",
														"QR visits",
														"Join clicks",
														"Learn More clicks",
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
												{data.campaigns.map((row) => (
													<tr
														key={row.name}
														className="border-t"
													>
														<td className="p-2 break-all">
															{row.name}
														</td>
														<td className="p-2">
															{row.visits}
														</td>
														<td className="p-2">
															{row.join}
														</td>
														<td className="p-2">
															{row.learn_more}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								) : (
									<p>
										No tagged QR campaigns recorded for this
										period.
									</p>
								)}
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>QR referral sources</CardTitle>
							</CardHeader>
							<CardContent>
								{data.referrers.length ? (
									<>
										<CategoricalBarChart
											metric="visits"
											data={data.referrers.slice(0, 10)}
										/>
										<p className="text-sm text-muted-foreground">
											Top 10 sources.
										</p>
									</>
								) : (
									<p>
										No referral sources recorded for this
										period.
									</p>
								)}
							</CardContent>
						</Card>
					</>
				)
			)}
		</>
	);
}
