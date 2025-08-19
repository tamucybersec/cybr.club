import { Tier } from "@/data/sponsors";

const isDev = process.env.NODE_ENV === "development";
export const API_URL = isDev
	? "http://localhost:5183"
	: "https://api.cybr.club";

export const tierAttrs: Record<
	Tier,
	{
		fontSize: string;
		color: string;
	}
> = {
	gold: {
		fontSize: "text-hero-subtext",
		color: "#FDDC5C",
	},
	silver: {
		fontSize: "text-hero-button",
		color: "#E0E0E0",
	},
	bronze: {
		fontSize: "text-hero-button",
		color: "#C56A39",
	},
};
