export type Tier = "gold" | "silver" | "bronze";
export interface Sponsor {
	name: string;
	image: string;
	link: string;
}

export const sponsors: Record<Tier, Sponsor[]> = {
	gold: [
		{
			name: "Mimic Ransomware Defense",
			image: "/images/sponsors/mimic.svg",
			link: "https://mimic.com/",
		},
	],
	silver: [
		{
			name: "Lockheed Martin",
			image: "/images/sponsors/lockheed-martin.png",
			link: "https://www.lockheedmartin.com/en-us/index.html",
		},
	],
	bronze: [],
};
