import data from "./new_data/leadership.json";

export interface Socials {
	linkedin?: string;
	github?: string;
	email?: string;
	website?: string;
}

export function ObfuscateSocials(socials: Socials): Socials {
	return Object.fromEntries(
		Object.entries(socials).flatMap(([platform, url]) =>
			url ? [[platform, btoa(url)]] : []
		)
	) as Socials;
}

export type Officer = {
	name: string;
	image: string;
	position: string;
	major: string;
	year?: number;
	socials?: Socials;
	imageMode?: "cover" | "contain" | "icon"; // Optional flag for image display mode
};

// One entry per person in the JSON; a person can hold several roles
interface Person {
	name: string;
	image: string;
	major: string;
	year?: number; // four digits in the JSON, e.g. 2027
	socials?: Socials;
	imageMode?: Officer["imageMode"];
	roles: { title: string; section: string }[];
}

const people = data as Person[];

function toOfficer(person: Person, position: string): Officer {
	const officer: Officer = {
		name: person.name,
		image: person.image,
		position,
		major: person.major,
	};
	if (person.year !== undefined) officer.year = person.year - 2000; // pages expect two digits
	if (person.socials) officer.socials = ObfuscateSocials(person.socials);
	if (person.imageMode) officer.imageMode = person.imageMode;
	return officer;
}

function inSection(section: string): Officer[] {
	return people.flatMap((person) =>
		person.roles
			.filter((role) => role.section === section)
			.map((role) => toOfficer(person, role.title))
	);
}

export const officers: Officer[] = inSection("officers");

// Known sections keep their display order. A section added in the JSON that is
// not listed here shows up after them, in the order it first appears.
const KNOWN_SECTIONS = [
	"Cyber Operations",
	"Hardware Hacking",
	"Cisco",
	"Palo Alto",
	"AWS",
	"Red Hat",
	"Policy",
];
const newSections = [
	...new Set(people.flatMap((p) => p.roles.map((r) => r.section))),
].filter((s) => s !== "officers" && !KNOWN_SECTIONS.includes(s));

export const activityLeaders: Record<string, Officer[]> = {};
for (const section of KNOWN_SECTIONS)
	activityLeaders[section] = inSection(section);
for (const section of newSections)
	activityLeaders[section] = inSection(section);
