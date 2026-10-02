import data from "./new_data/activityGroups.json";

export interface ActivityGroup {
	id: number;
	title: string;
	description: string;
	modalContent: string;
	day: string;
	time: string;
	location: string;
	map: string;
	note?: string;
	image: string;
}

export const activityGroups: ActivityGroup[] = data;
