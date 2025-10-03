import React from "react";
import { useAttendance, useEvents, useUsers } from "@/hooks/useTable";
import { EventInfo } from "./ProfileViewer";
import {
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import PersonalInfo from "./PersonalInfo";
import { Separator } from "../ui/separator";
import EventList from "./EventList";

interface Props {
	user_id: string;
}

function ProfileContents({ user_id }: Props) {
	const { usersById } = useUsers();
	const { eventsByCode } = useEvents({ unfiltered: true });
	const { attendanceByUser } = useAttendance(eventsByCode);

	const userInfo = usersById[user_id];
	const attendance = attendanceByUser[user_id] ?? [];
	const eventInfo: EventInfo = {};
	let totalAttendance = 0;

	for (const code of attendance) {
		const ev = eventsByCode[code];
		if (!ev) continue;
		eventInfo[ev.year] ??= {};
		eventInfo[ev.year][ev.semester] ??= {};
		eventInfo[ev.year][ev.semester][ev.category] ??= [];
		eventInfo[ev.year][ev.semester][ev.category].push(ev);
		totalAttendance += 1;
	}

	return (
		<>
			<DialogHeader>
				{userInfo && (
					<>
						<DialogTitle>{userInfo.name}</DialogTitle>
						<DialogDescription>
							Member since {userInfo.join_date}, attended{" "}
							{totalAttendance} events so far.
						</DialogDescription>
					</>
				)}
			</DialogHeader>
			<ScrollArea className="max-h-[calc(100dvh-300px)] min-w-0 -mx-4 p-4 py-0">
				{userInfo && eventInfo && (
					<div className="flex flex-col gap-4">
						<PersonalInfo userInfo={userInfo} />
						<Separator />
						<EventList eventInfo={eventInfo} />
					</div>
				)}
			</ScrollArea>
		</>
	);
}

export default ProfileContents;
