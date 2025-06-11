import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { DashboardContext } from "@/scripts/context";
import {
	type Attendance,
	type Event,
	type Points,
	QUERY_KEYS,
	type User,
} from "@/react/types";
import { getCurrentSemester, getCurrentYear } from "@/scripts/helpers";

export function useUsers() {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<User[]>({
		queryKey: QUERY_KEYS.users,
		queryFn: () => fetchPath("/users/get"),
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
		queryFn: () => fetchPath("/events/get"),
	});

	const eventsByCode = useMemo<Record<string, Event>>(() => {
		return Object.fromEntries(
			(data ?? []).map((event) => [event.code, event])
		);
	}, [data]);

	return {
		events: data,
		eventsByCode,
	};
}

export function useAttendance() {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<Attendance[]>({
		queryKey: QUERY_KEYS.attendance,
		queryFn: () => fetchPath("/attendance/get"),
	});

	const { attendanceByUser, attendanceByEvent } = useMemo(() => {
		const attendanceByUser: Record<number, string[]> = {};
		const attendanceByEvent: Record<string, number[]> = {};

		if (data !== undefined) {
			for (const attendance of data) {
				const { user_id, code } = attendance;
				attendanceByUser[user_id] ??= [];
				attendanceByUser[user_id].push(code);
				attendanceByEvent[code] ??= [];
				attendanceByEvent[code].push(user_id);
			}
		}

		return {
			attendanceByUser,
			attendanceByEvent,
		};
	}, [data]);

	return {
		attendance: data,
		attendanceByUser,
		attendanceByEvent,
	};
}

export function usePoints(
	eventsByCode: Record<string, Event>,
	attendanceByUser: Record<number, string[]>
) {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<Points[]>({
		queryKey: QUERY_KEYS.points,
		queryFn: () => fetchPath("/points/get"),
	});

	const { pointsByUser } = useMemo(() => {
		const pointsByUser: Record<number, number> = {};
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
