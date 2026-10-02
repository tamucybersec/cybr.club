import { ObfuscateSocials, type Socials } from "./leadership";
import data from "./new_data/alumni.json";

export type Alumni = {
	name: string;
	position: string;
	grad: string;
	socials?: Socials;
	image?: string;
	imageMode?: "cover" | "contain";
}[];

export const alumni: Alumni = (data as Alumni).map((member) =>
	member.socials
		? { ...member, socials: ObfuscateSocials(member.socials) }
		: member
);
