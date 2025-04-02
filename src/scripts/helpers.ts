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

// Spring from Jan - April
// Summer from May - July
// Fall from August - November
// Winter in December only
export function getCurrentSemester(): "Spring" | "Summer" | "Winter" | "Fall" {
	const month = new Date().getMonth();

	if (month <= 4) {
		return "Spring";
	} else if (month <= 7) {
		return "Summer";
	} else if (month <= 11) {
		return "Fall";
	} else {
		return "Winter";
	}
}