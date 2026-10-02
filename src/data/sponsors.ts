import data from "./new_data/sponsors.json";

export type Tier = "gold" | "silver" | "bronze";
export interface Sponsor {
	name: string;
	image: string;
	link?: string;
	className?: string;
}

// The JSON is a flat list with a tier on each sponsor; group it back by tier
export const sponsors: Record<Tier, Sponsor[]> = {
	gold: [],
	silver: [],
	bronze: [],
};

for (const s of data as (Sponsor & { tier: Tier })[]) {
	const sponsor: Sponsor = { name: s.name, image: s.image };
	if (s.link) sponsor.link = s.link;
	if (s.className) sponsor.className = s.className;
	sponsors[s.tier].push(sponsor);
}
