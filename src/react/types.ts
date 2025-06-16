export enum Permissions {
	NONE = 0,
	SPONSOR = 1,
	COMMITTEE = 2,
	ADMIN = 3,
	SUPER_ADMIN = 4,
}

export type Method = "GET" | "POST";

export interface Options {
	method?: Method;
	params?: Record<string, any>;
}

export type Semester = "spring" | "fall";

export type Category =
	| "Cyber Policy"
	| "Red Hat Academy"
	| "Cyber Operations"
	| "Hardware Hacking"
	| "AWS Academy"
	| "Cisco Networking Academy"
	| "Palo Alto Academy"
	| "Capture the Flag (legacy)"
	| "Hack the Box (legacy)"
	| "Tech Committee"
	| "PR Committee"
	| "Competition Committee"
	| "Informational"
	| "Bannering"
	| "Competition"
	| "Speaker"
	| "Social"
	| "Panel"
	| "Beginner Meeting";

export const VALID_CATEGORIES = [
	"Cyber Policy",
	"Red Hat Academy",
	"Cyber Operations",
	"Hardware Hacking",
	"AWS Academy",
	"Cisco Networking Academy",
	"Palo Alto Academy",
	"Capture the Flag (legacy)",
	"Hack the Box (legacy)",
	"Tech Committee",
	"PR Committee",
	"Competition Committee",
	"Informational",
	"Bannering",
	"Competition",
	"Speaker",
	"Social",
	"Panel",
	"Beginner Meeting",
] as const;

export const QUERY_KEYS = {
	users: ["users", "table"],
	events: ["events", "table"],
	flagged: ["flagged", "table"],
	attendance: ["attendance", "table"],
	points: ["points", "table"],
	tokens: ["tokens", "table"],
};

export interface User {
	user_id: string;
	name: string;
	grad_year: number;
	email: string;
	verified: boolean;
}

export interface Event {
	name: string;
	code: string;
	category: Category;
	points: number;
	date: string;
	semester: Semester;
	year: number;
}

export interface Flagged {
	user_id: string;
	offenses: number;
}

export interface Attendance {
	user_id: string;
	code: string;
}

export interface Points {
	user_id: string;
	points: number;
	semester: Semester;
	year: number;
}

export interface Tokens {
	name: string;
	token: string;
	created: string;
	expires_after: string;
	last_accessed: string;
	revoked: boolean;
	permission: Permissions;
}

export type CategoricalData = {
	label: string;
	count: number;
};

export type ColoredCategoricalData = CategoricalData & {
	fill: string;
};
