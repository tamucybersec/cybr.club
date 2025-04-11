import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { DashboardContext } from "@/scripts/context";
import { type Event, QUERY_KEYS, type User } from "@/react/types";

export function useUsers() {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<User[]>({
		queryKey: QUERY_KEYS.users,
		queryFn: () => fetchPath("/users/get"),
	});

	return data;
}

export function useEvents() {
	const { fetchPath } = useContext(DashboardContext);
	const { data } = useQuery<Event[]>({
		queryKey: QUERY_KEYS.events,
		queryFn: () => fetchPath("/events/get"),
	});

	return data;
}
