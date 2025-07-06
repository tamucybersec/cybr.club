import type {
	Event,
	Events,
	GradSemester,
	Semester,
	Term,
	User,
} from "@/react/types";
import type { Row } from "@tanstack/react-table";
import { z } from "zod";

export function capitalize(str: string) {
	return str.substring(0, 1).toLocaleUpperCase() + str.substring(1);
}

export function removeSpaces(s: string): string {
	return s.replaceAll(" ", "_");
}

export function validHtmlId(str: string): string {
	let id = str
		// Replace all non-alphanumerics with underscores (no exceptions)
		.replace(/[^A-Za-z0-9]/g, "_")
		// Trim underscores from start/end
		.replace(/^_+|_+$/g, "");

	// Default to "id" if empty
	return id || "id";
}

export function getChartColor(index: number) {
	const numberOfColors = 5;
	return `hsl(var(--chart-${(index % numberOfColors) + 1}))`;
}

export function getCurrentYear(): number {
	return new Date().getFullYear();
}

export function getCurrentSemester(): Semester {
	const month = new Date().getMonth() + 1;

	if (month <= 6) {
		return "spring";
	} else {
		return "fall";
	}
}

export function getCurrentDatestr(): string {
	const now = new Date();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const year = String(now.getFullYear());
	return `${month}/${day}/${year}`;
}

export function compareEventDates(a: Event, b: Event): number {
	return compareDates(a.date, b.date);
}

export function compareDates(a: string, b: string): number {
	const [monthA, dayA, yearA] = a.split("/");
	const [monthB, dayB, yearB] = b.split("/");

	if (yearA === yearB) {
		if (monthA === monthB) {
			if (dayA === dayB) {
				return 0;
			}

			return dayA.localeCompare(dayB);
		}

		return monthA.localeCompare(monthB);
	}

	return yearA.localeCompare(yearB);
}

export function sortDates<T>(accessor: keyof T) {
	return (a: Row<T>, b: Row<T>) => {
		const dateA = a.getValue<string>(accessor as string);
		const dateB = b.getValue<string>(accessor as string);
		return compareDates(dateA, dateB);
	};
}

export function flattenEvents(events: Events, terms: [Term, Term]): Event[] {
	const result = [];

	for (const [yearStr, semMap] of Object.entries(events)) {
		const year = parseInt(yearStr);
		if (year < terms[0].year || terms[1].year < year) continue;

		for (const [semesterStr, eventList] of Object.entries(semMap)) {
			const semester = semesterStr as Semester;
			if (!inTermRange({ year, semester }, terms)) continue;
			result.push(...eventList);
		}
	}

	return result;
}

export function compareTerms(a: Term, b: Term): number {
	if (a.year !== b.year) {
		return a.year - b.year;
	}

	if (a.semester === b.semester) return 0;
	return a.semester === "spring" ? -1 : 1;
}

export function defaultTerms(): [Term, Term] {
	return [
		{
			semester: getCurrentSemester(),
			year: getCurrentYear(),
		},
		{
			semester: getCurrentSemester(),
			year: getCurrentYear(),
		},
	];
}

export function prettySemester(semester: Semester): string {
	switch (semester) {
		case "spring":
			return "Spring";
		case "fall":
			return "Fall";
	}
}

export function multipleTerms(terms: [Term, Term]): boolean {
	return (
		terms[0].year !== terms[1].year ||
		terms[0].semester !== terms[1].semester
	);
}

export function inTermRange(term: Term, terms: [Term, Term]): boolean {
	return (
		compareTerms(term, terms[0]) >= 0 && compareTerms(term, terms[1]) <= 0
	);
}

export const zodDate = z
	.string()
	.transform((v) => {
		const parts = v.split("/");
		return `${parts[2]}-${parts[0]}-${parts[1]}`;
	})
	.pipe(z.string().date("Date must follow format MM/DD/YYYY"))
	.transform((v) => {
		const parts = v.split("-");
		return `${parts[1]}/${parts[2]}/${parts[0]}`;
	});

export const zodBoolean = z.coerce
	.string()
	.transform((v) => {
		switch (v) {
			case "true":
				return "1";
			case "false":
				return "0";
			default:
				return v;
		}
	})
	.pipe(z.enum(["0", "1"]));

export const zodTamuEmail = z
	.string()
	.email({ message: "Invalid email address" })
	.endsWith(
		"tamu.edu",
		"Email must be a valid TAMU email and end with 'tamu.edu'"
	);

export const zodFile = (
	fileTypes: string[],
	maxSize: number,
	maxSizeStr: string
) =>
	z.optional(
		z
			.instanceof(File)
			.refine((file) => fileTypes.includes(file.type))
			.refine((file) => file.size <= maxSize, {
				message: `Max file size is ${maxSizeStr}`,
			})
	);
