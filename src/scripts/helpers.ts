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
