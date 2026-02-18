"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { EventViewerDetail } from "@/lib/types";
import React, { type ReactNode, useEffect, useState } from "react";
import EventViewerContents from "./EventViewerContents";
import { useEventViewerData } from "./EventViewerDataContext";

interface Props {
	code: string;
	asChild?: boolean;
	children: ReactNode;
	detail?: EventViewerDetail;
}

function EventViewer({ code, asChild, children, detail }: Props) {
	const [open, setOpen] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const resolved = useEventViewerData(code);
	const eventDetail = detail ?? resolved.detail;

	useEffect(() => {
		if (open) {
			setLoaded(true);
		}
	}, [open]);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-3xl">
				{loaded ? (
					<EventViewerContents detail={eventDetail} />
				) : (
					<>
						<DialogTitle>Loading...</DialogTitle>
						<DialogDescription>
							Calculating statistics for event {eventDetail.code}.
						</DialogDescription>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default EventViewer;
