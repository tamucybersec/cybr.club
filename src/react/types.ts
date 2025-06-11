export enum PermissionLevel {
	NONE = 0,
	DENIED,
	SPONSOR,
	ADMIN,
}

export type Credentials = {
	username: string;
	password: string;
};

export type Semester = "spring" | "fall";

export const QUERY_KEYS = {
	users: ["users", "table"],
	events: ["events", "table"],
	flagged: ["flagged", "table"],
	attendance: ["attendance", "table"],
	points: ["points", "table"]
};

export interface User {
	user_id: number;
	name: string;
	grad_year: number;
	email: string;
	verified: boolean
}

export interface Event {
	name: string;
	code: string;
	points: number;
	date: string;
	semester: Semester;
	year: number;
}

export interface Flagged {
	user_id: number;
	offenses: number;
}

export interface Attendance {
	user_id: number;
	code: string;
}

export interface Points {
	user_id: number;
	points: number;
	semester: Semester;
	year: number;
}

export type CategoricalData = {
	label: string;
	count: number;
};

export type ColoredCategoricalData = CategoricalData & {
	fill: string;
};
