import type { Event, Semester } from "@/react/types";

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
