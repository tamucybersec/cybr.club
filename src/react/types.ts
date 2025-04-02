export const QUERY_KEYS = {
	users: ["edit", "users"],
	events: ["edit", "events"],
	flagged: ["edit", "flagged"],
};

export interface User {
	user_id: number;
	name: string;
	points: number;
	attended: number;
	grad_year: number;
	email: string;
}

export interface Event {
	name: string;
	code: string;
	points: number;
	date: string;
	resources: string;
	attended_users: number[];
}

// offenses is using the british spelling offences
// for legacy reasons, should be switched when possible
export interface Flagged {
	user_id: number;
	offences: number;
}

export type CategoricalData = {
	label: string;
	count: number;
};

export type ColoredCategoricalData = CategoricalData & {
	fill: string;
};
