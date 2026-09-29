import { Permissions } from "@/lib/types";

// Human-readable companion to CyberHam's canonical SQL. Keep this guide aligned
// with cyberham/database/table_registry.py when purposes or dashboard pages change.
interface SchemaGuideEntry {
	name: string;
	purpose: string;
	relationships: string;
	editor?: {
		label: string;
		path: string;
		viewPermission: Permissions;
		editPermission: Permissions;
	};
}

export const schemaGuide: SchemaGuideEntry[] = [
	{
		name: "users",
		purpose:
			"Club member profiles used in registration and throughout the dashboard.",
		relationships:
			"Members connect to resumes, attendance, points, flags, and RSVPs through user_id.",
		editor: {
			label: "Members",
			path: "/dashboard/members",
			viewPermission: Permissions.COMMITTEE,
			editPermission: Permissions.ADMIN,
		},
	},
	{
		name: "resumes",
		purpose:
			"Metadata for uploaded member resumes, including file details and validation status.",
		relationships: "Each resume belongs to a member through users.user_id.",
	},
	{
		name: "events",
		purpose: "Club event codes, dates, categories, and point values.",
		relationships:
			"Attendance and RSVPs connect to events through the event code.",
		editor: {
			label: "Events",
			path: "/dashboard/events",
			viewPermission: Permissions.COMMITTEE,
			editPermission: Permissions.ADMIN,
		},
	},
	{
		name: "flagged",
		purpose:
			"Registration or verification offenses for members who need review.",
		relationships:
			"Each flag record belongs to a member through users.user_id.",
		editor: {
			label: "Flagged",
			path: "/dashboard/flagged",
			viewPermission: Permissions.COMMITTEE,
			editPermission: Permissions.ADMIN,
		},
	},
	{
		name: "attendance",
		purpose: "Records which members attended each event.",
		relationships:
			"Joins users.user_id to events.code, with one record per member and event.",
		editor: {
			label: "Attendance",
			path: "/dashboard/attendance",
			viewPermission: Permissions.COMMITTEE,
			editPermission: Permissions.ADMIN,
		},
	},
	{
		name: "points",
		purpose: "Awarded points for each member and academic term.",
		relationships:
			"References users.user_id; each record is identified by member, semester, and year.",
		editor: {
			label: "Points",
			path: "/dashboard/points",
			viewPermission: Permissions.COMMITTEE,
			editPermission: Permissions.ADMIN,
		},
	},
	{
		name: "tokens",
		purpose:
			"Dashboard access tokens, their permission levels, and expiration and revocation details.",
		relationships: "No foreign-key relationships to other tables.",
		editor: {
			label: "Tokens",
			path: "/dashboard/tokens",
			viewPermission: Permissions.SUPER_ADMIN,
			editPermission: Permissions.SUPER_ADMIN,
		},
	},
	{
		name: "register",
		purpose:
			"Temporary registration tickets connecting a registration link to a member and timestamp.",
		relationships:
			"user_id identifies the member, without an enforced foreign key.",
	},
	{
		name: "verify",
		purpose:
			"Email verification codes for members who still need to confirm their email address.",
		relationships:
			"user_id identifies the member, without an enforced foreign key.",
	},
	{
		name: "rsvp",
		purpose:
			"Member RSVP responses for event forms, separate from recorded attendance.",
		relationships:
			"Joins users.user_id to events.code, with one response per member and event.",
	},
];
