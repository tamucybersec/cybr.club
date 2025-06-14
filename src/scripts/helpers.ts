import type { Event, Semester } from "@/react/types";
import type { Row } from "@tanstack/react-table";
import { z } from "zod";

export function removeSpaces(s: string): string {
	return s.replaceAll(" ", "_");
}

export function validHtmlId(str: string): string {
	return encodeURIComponent(str) || "id";
}

export function getChartColor(index: number) {
	const numberOfColors = 5;
	return `hsl(var(--chart-${(index % numberOfColors) + 1}))`;
}

export function getCurrentYear(): number {
	return new Date().getFullYear();
}

export function getCurrentSemester(): Semester {
	const month = new Date().getMonth();

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

export function filterUserID<T>(
	row: Row<T>,
	columnId: string,
	filterValue: any
) {
	const value = row.getValue<number>(columnId);
	return value.toString().includes(filterValue);
}

export function sortDates<T>(accessor: keyof T) {
	return (a: Row<T>, b: Row<T>) => {
		const dateA = a.getValue<string>(accessor as string);
		const dateB = b.getValue<string>(accessor as string);
		return compareDates(dateA, dateB);
	};
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
