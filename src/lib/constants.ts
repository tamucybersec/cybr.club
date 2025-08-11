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
		fontSize: "text-3xl",
		color: "#FDDC5C",
	},
	silver: {
		fontSize: "text-xl",
		color: "#E0E0E0",
	},
	bronze: {
		fontSize: "text-md",
		color: "#C56A39",
	},
};
