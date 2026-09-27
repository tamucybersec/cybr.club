export type Tier = "gold" | "silver" | "bronze";
export interface Sponsor {
	name: string;
	image: string;
	link?: string;
	className?: string;
}

export const sponsors: Record<Tier, Sponsor[]> = {
	gold: [
		{
			name: "Research Innovations Incorporated (RII)",
			image: "/images/sponsors/rii.png",
			link: "https://www.researchinnovations.com/",
		},
		{
			name: "Alex + Sam",
			image: "/images/sponsors/alex-and-sam.png",
		},
	],
	silver: [
		{
			name: "Lockheed Martin",
			image: "/images/sponsors/lockheed-martin.png",
			link: "https://www.lockheedmartin.com/en-us/index.html",
		},
		{
			name: "Allthenticate",
			image: "/images/sponsors/allthenticate.png",
			link: "https://www.allthenticate.com/",
			className: "rounded-full bg-[#0D0EFE]",
		},
	],
	bronze: [
		{
			name: "Cisco",
			image: "/images/activity-groups/cisco.svg",
			link: "https://www.cisco.com/",
		},
		{
			name: "Tommy's Snowballs",
			image: "/images/sponsors/tommys-snowballs.png",
			className: "rounded-full bg-white p-4",
		},
	],
};
