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
			<>Access to our {emph("Sponsor Dashboard")}</>,
			<>Access to our {emph("Resume Bank")}</>,
			"All benefits from lower tiers",
		],
	},
	bronze: {
		cost: "$1,000",
		points: [
			<>Host a {emph("Guest Speaking Event")}</>,
			<>Recognition on {emph("Club T-Shirts")}</>,
			<>Recognition on the {emph("Club Website")}</>,
		],
	},
};
