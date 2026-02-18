"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";
import EventViewer from "./EventViewer";
import { useEventViewerData } from "./EventViewerDataContext";

interface Props {
	code: string;
	className?: string;
}

function EventCodeLink({ code, className }: Props) {
	const { detail, summary } = useEventViewerData(code);

	return (
		<EventViewer
			code={code}
			asChild
			detail={detail}
		>
			<span className="inline-flex">
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							className={cn(
								"font-semibold text-blue-400 hover:text-blue-300 hover:underline underline-offset-2 transition-colors",
								className
							)}
						>
							{summary.code}
						</button>
					</TooltipTrigger>
					<TooltipContent className="max-w-[260px]">
						<div className="flex flex-col gap-1 text-left">
							<p className="font-semibold">{summary.name}</p>
							<p>
								<span className="font-medium">Attendance:</span>{" "}
								{summary.attendanceCount.toLocaleString()}
							</p>
							<p>
								<span className="font-medium">Date:</span>{" "}
								{summary.date}
							</p>
							<p>
								<span className="font-medium">Category:</span>{" "}
								{summary.category}
							</p>
						</div>
					</TooltipContent>
				</Tooltip>
			</span>
		</EventViewer>
	);
}

export default EventCodeLink;
