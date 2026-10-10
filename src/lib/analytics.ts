// Keep this allowlist in sync with CyberHam's analytics reporting paths.
export const PUBLIC_PATHS = [
	"/",
	"/about",
	"/events",
	"/join",
	"/partnership",
	"/qr",
];
export const GOATCOUNTER_URL = process.env.NEXT_PUBLIC_GOATCOUNTER_URL?.replace(
	/\/$/,
	""
);

type Count = { path: string; title: string; event?: boolean; referrer: string };
declare global {
	interface Window {
		goatcounter?: {
			count: (data: Count) => void;
			get_data: (data?: Count) => Record<string, unknown>;
		};
	}
}

export function campaignQuery(search: string): string {
	const input = new URLSearchParams(search);
	const output = new URLSearchParams();
	for (const key of ["utm_campaign", "utm_source"]) {
		const value = input.get(key);
		// Campaign labels are public slugs, never member IDs or free-form data.
		if (value && /^[a-zA-Z0-9_-]{1,80}$/.test(value))
			output.set(key, value);
	}
	return output.toString();
}

export function safeReferrer(value: string): string {
	try {
		const url = new URL(value);
		return ["http:", "https:"].includes(url.protocol) ? url.origin : "";
	} catch {
		return "";
	}
}

export function prepareTracker() {
	const tracker = window.goatcounter;
	if (!tracker) return;
	const original = tracker.get_data.bind(tracker);
	// count.js also sends location.search separately from the path. Strip all
	// parameters except the two deliberately supported campaign tags.
	tracker.get_data = (data) => ({
		...original(data),
		q: campaignQuery(window.location.search),
	});
}

export function trackQrClick(action: "join" | "learn-more") {
	if (
		!GOATCOUNTER_URL ||
		window.location.pathname.replace(/\/$/, "") !== "/qr"
	)
		return;
	try {
		window.goatcounter?.count({
			path: `qr-${action}`,
			title: action === "join" ? "QR: Join" : "QR: Learn More",
			event: true,
			// GoatCounter 2.7 ignores campaign query tags for events. Carry the
			// validated label in the event referrer so reports can attribute clicks.
			// Use a path marker: GoatCounter strips URL schemes such as "campaign:".
			referrer: new URLSearchParams(
				campaignQuery(window.location.search)
			).has("utm_campaign")
				? `campaign/${new URLSearchParams(campaignQuery(window.location.search)).get("utm_campaign")}`
				: "",
		});
	} catch {
		/* Analytics must never interfere with navigation. */
	}
}
