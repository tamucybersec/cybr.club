import { capitalize, formatMajor } from "@/lib/helpers";
import type {
	Event,
	EventViewerAttendee,
	EventViewerCount,
	EventViewerDetail,
	EventViewerSummary,
	User,
} from "@/lib/types";

const UNKNOWN_EVENT_NAME = "Unknown Event";
const UNKNOWN_LABEL = "Unknown";
const UNSET_MAJOR_LABEL = "Unspecified";

export function normalizeEventCode(code: string): string {
	return code.trim().toUpperCase();
}

function sortCounts(a: EventViewerCount, b: EventViewerCount): number {
	if (a.count !== b.count) {
		return b.count - a.count;
	}

	return a.label.localeCompare(b.label, undefined, {
		numeric: true,
		sensitivity: "base",
	});
}

function toCounts(map: Map<string, number>): EventViewerCount[] {
	return Array.from(map.entries())
		.map(([label, count]) => ({ label, count }))
		.sort(sortCounts);
}

function getGradYearLabel(user: User): string {
	return user.grad_year > 0 ? String(user.grad_year) : UNKNOWN_LABEL;
}

function getGradClassLabel(user: User): string {
	return user.grad_year > 0
		? `${capitalize(user.grad_semester)} ${user.grad_year}`
		: UNKNOWN_LABEL;
}

export function buildEventViewerDetail(
	code: string,
	eventsByCode: Record<string, Event>,
	attendanceByEvent: Record<string, string[]>,
	usersById: Record<string, User>
): EventViewerDetail {
	const normalizedCode = normalizeEventCode(code);
	const event = eventsByCode[normalizedCode] ?? null;
	const attendeeIds = attendanceByEvent[normalizedCode] ?? [];
	const attendees: EventViewerAttendee[] = [];
	const unknownUserIdsSet = new Set<string>();
	const majorCounts = new Map<string, number>();
	const gradYearCounts = new Map<string, number>();

	for (const userId of attendeeIds) {
		const user = usersById[userId];
		if (!user) {
			unknownUserIdsSet.add(userId);
			continue;
		}

		const major = user.major ? formatMajor(user.major) : UNSET_MAJOR_LABEL;
		const gradYearLabel = getGradYearLabel(user);
		const gradClass = getGradClassLabel(user);

		attendees.push({
			user_id: user.user_id,
			name: user.name || user.user_id,
			major,
			gradYearLabel,
			gradClass,
		});

		majorCounts.set(major, (majorCounts.get(major) ?? 0) + 1);
		gradYearCounts.set(
			gradYearLabel,
			(gradYearCounts.get(gradYearLabel) ?? 0) + 1
		);
	}

	attendees.sort((a, b) => {
		const nameCompare = a.name.localeCompare(b.name, undefined, {
			sensitivity: "base",
		});
		if (nameCompare !== 0) {
			return nameCompare;
		}
		return a.user_id.localeCompare(b.user_id, undefined, {
			sensitivity: "base",
		});
	});

	return {
		code: normalizedCode,
		event,
		attendanceCount: attendeeIds.length,
		attendees,
		majorCounts: toCounts(majorCounts),
		gradYearCounts: toCounts(gradYearCounts),
		unknownUserIds: Array.from(unknownUserIdsSet).sort((a, b) =>
			a.localeCompare(b, undefined, { sensitivity: "base" })
		),
		unknownUserCount: attendeeIds.length - attendees.length,
	};
}

export function buildEventViewerSummary(
	code: string,
	detail: EventViewerDetail
): EventViewerSummary {
	return {
		code: normalizeEventCode(code),
		name: detail.event?.name ?? UNKNOWN_EVENT_NAME,
		category: detail.event?.category ?? UNKNOWN_LABEL,
		date: detail.event?.date ?? UNKNOWN_LABEL,
		attendanceCount: detail.attendanceCount,
		hasEvent: detail.event !== null,
	};
}
