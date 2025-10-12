import type { UseFormReturn } from "react-hook-form";

export enum Permissions {
	NONE = 0,
	SPONSOR = 1,
	COMMITTEE = 2,
	ADMIN = 3,
	SUPER_ADMIN = 4,
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type ReactState<T> = [T, SetState<T>];

export type FormType = UseFormReturn<
	Record<string, any>,
	any,
	Record<string, any>
>;

export type Method = "GET" | "POST";

export interface Options {
	method?: Method;
	params?: Record<string, any>;
}

export type Semester = "spring" | "fall";
export type GradSemester = "spring" | "summer" | "fall" | "winter";

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
	grad_semester: GradSemester;
	grad_year: number;
	major: string;
	email: string;
	verified: boolean;
	join_date: string;
	notes: string;
	resume_format: string;
	resume_filename?: string | null;
	resume_uploaded_at?: string | null; // ISO 8601 time if uploaded, null if not
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

export type Events = Record<number, Record<string, Event[]>>;
export type Term = {
	year: number;
	semester: Semester;
};
