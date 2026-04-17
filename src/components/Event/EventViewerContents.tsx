import {
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { EventViewerCount, EventViewerDetail } from "@/lib/types";
import React from "react";

interface Props {
	detail: EventViewerDetail;
}

function GroupedCounts({
	title,
	counts,
	emptyLabel,
}: {
	title: string;
	counts: EventViewerCount[];
	emptyLabel: string;
}) {
	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-base font-semibold">{title}</h3>
			{counts.length > 0 ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Group</TableHead>
							<TableHead className="text-right">Count</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{counts.map((group) => (
							<TableRow key={group.label}>
								<TableCell>{group.label}</TableCell>
								<TableCell className="text-right">
									{group.count.toLocaleString()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<p className="text-sm text-muted-foreground">{emptyLabel}</p>
			)}
		</div>
	);
}

function EventViewerContents({ detail }: Props) {
	const summary = detail.event
		? `${detail.event.category} on ${detail.event.date}`
		: `Event ${detail.code} was not found in the events table.`;

	return (
		<>
			<DialogHeader>
				<DialogTitle>
					{detail.event
						? detail.event.name
						: `Unknown Event (${detail.code})`}
				</DialogTitle>
				<DialogDescription>
					{summary} Attended by{" "}
					{detail.attendanceCount.toLocaleString()} member
					{detail.attendanceCount === 1 ? "" : "s"}.
				</DialogDescription>
				{detail.unknownUserCount > 0 && (
					<DialogDescription>
						{detail.unknownUserCount.toLocaleString()} attendance
						entr
						{detail.unknownUserCount === 1
							? "y has"
							: "ies have"}{" "}
						missing user records.
					</DialogDescription>
				)}
			</DialogHeader>
			<ScrollArea className="max-h-[calc(100dvh-280px)] min-w-0 -mx-4 px-4 pb-2">
				<div className="flex flex-col gap-4">
					<GroupedCounts
						title="By Major"
						counts={detail.majorCounts}
						emptyLabel="No attendee major data available."
					/>
					<GroupedCounts
						title="By Graduation Year"
						counts={detail.gradYearCounts}
						emptyLabel="No attendee graduation year data available."
					/>
					<Separator />
					<div className="flex flex-col gap-2">
						<h3 className="text-base font-semibold">
							Attendee Roster
						</h3>
						{detail.attendees.length > 0 ? (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>User ID</TableHead>
										<TableHead>Major</TableHead>
										<TableHead>Class</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{detail.attendees.map((attendee) => (
										<TableRow
											key={`${attendee.user_id}-${attendee.name}`}
										>
											<TableCell>
												{attendee.name}
											</TableCell>
											<TableCell>
												{attendee.user_id}
											</TableCell>
											<TableCell>
												{attendee.major}
											</TableCell>
											<TableCell>
												{attendee.gradClass}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<p className="text-sm text-muted-foreground">
								No attendees found for this event.
							</p>
						)}
					</div>
				</div>
			</ScrollArea>
		</>
	);
}

export default EventViewerContents;
