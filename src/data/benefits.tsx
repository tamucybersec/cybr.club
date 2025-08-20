import { ReactNode } from "react";
import { Tier } from "./sponsors";

const emph = (text: string): ReactNode => {
	return <span className="font-bold">{text}</span>;
};

export interface Benefits {
	cost: string;
	points: ReactNode[];
}
export const benefits: Record<Tier, Benefits> = {
	gold: {
		cost: "$2,000 or More",
		points: [
			<>Host a {emph("Dedicated Recruitment Event")}</>,
			<>{emph("Priority Scheduling")} for all events</>,
			"All benefits from lower tiers",
		],
	},
	silver: {
		cost: "$1,500",
		points: [
			<>
				Host a {emph("Technical Workshop")} or {emph("Meet-and-Greet")}
			</>,
			<>Access our club&apos;s {emph("Curated Resume Bank")}</>,
			"All benefits from lower tiers",
		],
	},
	bronze: {
		cost: "$1,000",
		points: [
			<>Recognition on {emph("Club T-Shirts")}</>,
			<>Recognition on the {emph("Club Website")}</>,
			"Mailing List Access",
		],
	},
};
