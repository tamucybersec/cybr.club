"use client";

import { useAttendance, useEvents, useUsers } from "@/hooks/useTable";
import {
	buildEventViewerDetail,
	buildEventViewerSummary,
	normalizeEventCode,
} from "@/lib/eventViewer";
import type { EventViewerDetail, EventViewerSummary } from "@/lib/types";
import React, {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
} from "react";

interface EventViewerData {
	resolve: (code: string) => {
		detail: EventViewerDetail;
		summary: EventViewerSummary;
	};
}

const EventViewerDataContext = createContext<EventViewerData | null>(null);

function buildUnknown(code: string) {
	const detail = buildEventViewerDetail(code, {}, {}, {});
	return {
		detail,
		summary: buildEventViewerSummary(code, detail),
	};
}

export function EventViewerDataProvider({ children }: { children: ReactNode }) {
	const { eventsByCode } = useEvents({ unfiltered: true });
	const { attendanceByEvent } = useAttendance(eventsByCode);
	const { usersById } = useUsers();

	const detailsByCode = useMemo<Record<string, EventViewerDetail>>(() => {
		return Object.fromEntries(
			Object.keys(eventsByCode).map((code) => [
				code,
				buildEventViewerDetail(
					code,
					eventsByCode,
					attendanceByEvent,
					usersById
				),
			])
		);
	}, [eventsByCode, attendanceByEvent, usersById]);

	const summariesByCode = useMemo<Record<string, EventViewerSummary>>(() => {
		return Object.fromEntries(
			Object.entries(detailsByCode).map(([code, detail]) => [
				code,
				buildEventViewerSummary(code, detail),
			])
		);
	}, [detailsByCode]);

	const value = useMemo<EventViewerData>(() => {
		return {
			resolve(code: string) {
				const normalized = normalizeEventCode(code);
				const detail =
					detailsByCode[normalized] ??
					buildEventViewerDetail(
						normalized,
						eventsByCode,
						attendanceByEvent,
						usersById
					);
				const summary =
					summariesByCode[normalized] ??
					buildEventViewerSummary(normalized, detail);
				return { detail, summary };
			},
		};
	}, [
		detailsByCode,
		summariesByCode,
		eventsByCode,
		attendanceByEvent,
		usersById,
	]);

	return (
		<EventViewerDataContext.Provider value={value}>
			{children}
		</EventViewerDataContext.Provider>
	);
}

export function useEventViewerData(code: string) {
	const ctx = useContext(EventViewerDataContext);
	return ctx?.resolve(code) ?? buildUnknown(code);
}
