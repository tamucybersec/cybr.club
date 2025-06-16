import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { DashboardContext } from "@/scripts/context";
import {
	type Attendance,
	type Event,
	type Points,
	QUERY_KEYS,
	type Tokens,
	type User,
} from "@/react/types";
import { getCurrentSemester, getCurrentYear } from "@/scripts/helpers";

export function useUsers() {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<User[]>({
		queryKey: QUERY_KEYS.users,
		queryFn: () => fetchPath("/users", { method: "GET" }),
	});

	const usersById = useMemo<Record<number, User>>(() => {
		return Object.fromEntries(
			(data ?? []).map((user) => [user.user_id, user])
		);
	}, [data]);

	return {
		users: data,
		usersById,
	};
}

export function useEvents() {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<Event[]>({
		queryKey: QUERY_KEYS.events,
		queryFn: () => fetchPath("/events", { method: "GET" }),
	});

	const { filteredEvents, eventsByCode } = useMemo(() => {
		const semester = getCurrentSemester();
		const year = getCurrentYear();

		const filteredEvents = (data ?? []).filter(
			(event) => event.semester === semester && event.year === year
		);
		const eventsByCode = Object.fromEntries(
			filteredEvents.map((event) => [event.code, event])
		);

		return {
			filteredEvents,
			eventsByCode,
		};
	}, [data]);

	return {
		events: filteredEvents,
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

			if (data !== undefined) {
				for (const attendance of filteredAttendance) {
					const { user_id, code } = attendance;
					attendanceByUser[user_id] ??= [];
					attendanceByUser[user_id].push(code);
					attendanceByEvent[code] ??= [];
					attendanceByEvent[code].push(user_id);
				}
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

export function usePoints(
	eventsByCode: Record<string, Event>,
	attendanceByUser: Record<string, string[]>
) {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<Points[]>({
		queryKey: QUERY_KEYS.points,
		queryFn: () => fetchPath("/points", { method: "GET" }),
	});

	const { pointsByUser } = useMemo(() => {
		const pointsByUser: Record<string, number> = {};
		const semester = getCurrentSemester();
		const year = getCurrentYear();

		if (data !== undefined) {
			for (const point of data) {
				if (point.semester === semester && point.year === year) {
					pointsByUser[point.user_id] ??= 0;
					pointsByUser[point.user_id] += point.points;
				}
			}

			for (const [user_idStr, codes] of Object.entries(
				attendanceByUser
			)) {
				for (const code of codes) {
					const event = eventsByCode[code];
					if (
						event !== undefined &&
						event.semester === semester &&
						event.year === year
					) {
						const user_id = parseInt(user_idStr);
						pointsByUser[user_id] ??= 0;
						pointsByUser[user_id] += event.points;
					}
				}
			}
		}

		return {
			pointsByUser,
		};
	}, [data, eventsByCode, attendanceByUser]);

	return {
		points: data,
		pointsByUser,
	};
}

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
