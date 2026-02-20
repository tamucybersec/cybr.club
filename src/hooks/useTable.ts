import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { DashboardContext } from "@/lib/context";
import {
	type Attendance,
	type Event,
	type Events as GroupedEvents,
	QUERY_KEYS,
	type Term,
	type Tokens,
	type User,
	type Resume,
} from "@/lib/types";
import { flattenEvents } from "@/lib/helpers";

export function useUsers() {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<User[]>({
		queryKey: QUERY_KEYS.users,
		queryFn: () => fetchPath("/users", { method: "GET" }),
	});

	const usersById = useMemo<Record<string, User>>(() => {
		return Object.fromEntries(
			(data ?? []).map((user) => [user.user_id, user])
		);
	}, [data]);

	return {
		users: data ?? [],
		usersById,
	};
}

export function useResumes() {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<Resume[]>({
		queryKey: QUERY_KEYS.resumes,
		queryFn: () => fetchPath("/resumes", { method: "GET" }),
	});

	const resumesByUserID = useMemo<Record<string, Resume>>(() => {
		return Object.fromEntries(
			(data ?? []).map((resume) => [resume.user_id, resume])
		);
	}, [data]);

	return {
		resumes: data ?? [],
		resumesByUserID,
	};
}

export function useEvents({
	terms: _terms,
	unfiltered,
}: {
	terms?: [Term, Term];
	unfiltered?: boolean;
} = {}) {
	const { fetchPath, terms } = useContext(DashboardContext);
	const { data } = useQuery<Event[]>({
		queryKey: QUERY_KEYS.events,
		queryFn: () => fetchPath("/events", { method: "GET" }),
	});

	const { groupedEvents, filteredEvents, eventsByCode } = useMemo(() => {
		const groupedEvents: GroupedEvents = {};
		for (const event of data ?? []) {
			groupedEvents[event.year] ??= {};
			groupedEvents[event.year][event.semester] ??= [];
			groupedEvents[event.year][event.semester].push(event);
		}

		const t = unfiltered ? undefined : (_terms ?? terms);
		const filteredEvents = flattenEvents(groupedEvents, t);
		const eventsByCode = Object.fromEntries(
			filteredEvents.map((event) => [event.code, event])
		);

		return {
			groupedEvents,
			filteredEvents,
			eventsByCode,
		};
	}, [data, terms]);

	return {
		events: filteredEvents,
		groupedEvents,
		eventsByCode,
	};
}

export function useAttendance(eventsByCode: Record<string, Event>) {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<Attendance[]>({
		queryKey: QUERY_KEYS.attendance,
		queryFn: () => fetchPath("/attendance", { method: "GET" }),
	});

	const { filteredAttendance, attendanceByUser, attendanceByEvent } =
		useMemo(() => {
			const filteredAttendance = (data ?? []).filter(
				(att) => !!eventsByCode[att.code]
			);

			const attendanceByUser: Record<string, string[]> = {};
			const attendanceByEvent: Record<string, string[]> = {};

			for (const attendance of filteredAttendance) {
				const { user_id, code } = attendance;
				attendanceByUser[user_id] ??= [];
				attendanceByUser[user_id].push(code);
				attendanceByEvent[code] ??= [];
				attendanceByEvent[code].push(user_id);
			}

			return {
				filteredAttendance,
				attendanceByUser,
				attendanceByEvent,
			};
		}, [data, eventsByCode]);

	return {
		attendance: filteredAttendance,
		attendanceByUser,
		attendanceByEvent,
	};
}

// export function usePoints(
// 	eventsByCode: Record<string, Event>,
// 	attendanceByUser: Record<string, string[]>
// ) {
// 	const { fetchPath } = useContext(DashboardContext);
// 	const { data } = useQuery<Points[]>({
// 		queryKey: QUERY_KEYS.points,
// 		queryFn: () => fetchPath("/points", { method: "GET" }),
// 	});

// 	const { pointsByUser } = useMemo(() => {
// 		const pointsByUser: Record<string, number> = {};
// 		const semester = getCurrentSemester();
// 		const year = getCurrentYear();

// 		if (data !== undefined) {
// 			for (const point of data) {
// 				if (point.semester === semester && point.year === year) {
// 					pointsByUser[point.user_id] ??= 0;
// 					pointsByUser[point.user_id] += point.points;
// 				}
// 			}

// 			for (const [user_idStr, codes] of Object.entries(
// 				attendanceByUser
// 			)) {
// 				for (const code of codes) {
// 					const event = eventsByCode[code];
// 					if (
// 						event !== undefined &&
// 						event.semester === semester &&
// 						event.year === year
// 					) {
// 						const user_id = parseInt(user_idStr);
// 						pointsByUser[user_id] ??= 0;
// 						pointsByUser[user_id] += event.points;
// 					}
// 				}
// 			}
// 		}

// 		return {
// 			pointsByUser,
// 		};
// 	}, [data, eventsByCode, attendanceByUser]);

// 	return {
// 		points: data ?? [],
// 		pointsByUser,
// 	};
// }

export function useTokens() {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<Tokens[]>({
		queryKey: QUERY_KEYS.tokens,
		queryFn: () => fetchPath("/tokens", { method: "GET" }),
	});

	const tokensByToken: Record<string, Tokens> = useMemo(() => {
		return Object.fromEntries(
			(data ?? []).map((token) => [token.token, token])
		);
	}, [data]);

	return {
		tokens: data,
		tokensByToken,
	};
}

export function useActiveUsers(terms: [Term, Term]): User[] {
	const { usersById } = useUsers();
	const { eventsByCode } = useEvents();
	const { attendanceByUser } = useAttendance(eventsByCode);

	return useMemo(() => {
		const active: User[] = [];

		for (const [user_id, codes] of Object.entries(attendanceByUser)) {
			const user = usersById[user_id];
			if (!user) continue;

			for (const code of codes) {
				const event = eventsByCode[code];
				if (
					!event ||
					event.category === "Bannering" ||
					event.category === "Informational"
				)
					continue;

				active.push(user);
				break;
			}
		}

		return active;
	}, [usersById, eventsByCode, attendanceByUser, terms]);
}
