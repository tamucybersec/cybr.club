interface Photo {
	title: string;
	description: string;
	path: string;
}

export const photos = {
	allthenticate: {
		title: "Allthenticate Guest Speaker",
		description: "From Beginner Meetings",
		path: "/images/general/allthenticate.avif",
	},
	austinPoint: {
		title: "Austin Teaches Networking",
		description: "From Cisco Networking Academy (Lab)",
		path: "/images/general/austin-point.avif",
	},
	badApple: {
		title: "Bad Apple Printout",
		description: "From an unknown competition",
		path: "/images/general/bad-apple.avif",
	},
	ciscoGigEm: {
		title: "Cisco Lab Completed",
		description: "From Cisco Networking Academy (Lab)",
		path: "/images/general/cisco-gig-em.avif",
	},
	ciscoHuge: {
		title: "Lesson Lab",
		description: "From Cisco Networking Academy",
		path: "/images/general/cisco-huge.avif",
	},
	ciscoSmile: {
		title: "Halo LAN Party",
		description: "From Cisco Networking Academy (Lab)",
		path: "/images/general/cisco-smile.avif",
	},
	ciscoSoyjak: {
		title: "Wireless Configurations",
		description: "From Cisco Networking Academy (Lab)",
		path: "/images/general/cisco-soyjak.avif",
	},
	colbyMasterChef: {
		title: "Master 'Chef' Colby",
		description: "From Cisco Networking Academy (Halloween)",
		path: "/images/general/colby-master-chef.avif",
	},
	infoGavin: {
		title: "Informational Game",
		description: "From the Spring 2025 Informational",
		path: "/images/general/info-gavin.avif",
	},
	informational: {
		title: "Information Overhead",
		description: "From the Fall 2024 Informational",
		path: "/images/general/informational.avif",
	},
	ists: {
		title: "On the Grind",
		description: "From the ISTS 2025 Competition",
		path: "/images/general/ists.avif",
	},
	mimic: {
		title: "Mimic Guest Speaker",
		description: "From Beginner Meetings",
		path: "/images/general/mimic.avif",
	},
	paloSpeaker: {
		title: "Palo Alto Guest Speaker",
		description: "From Palo Alto Academy",
		path: "/images/general/palo-speaker.avif",
	},
	paloWomenPanelists: {
		title: "Women In STEM Panelists",
		description: "From Palo Alto Academy",
		path: "/images/general/palo-women-panelists.avif",
	},
	paloWomenStudents: {
		title: "Women In STEM Students",
		description: "From Palo Alto Academy",
		path: "/images/general/palo-women-students.avif",
	},
	panel2025: {
		title: "Alumni Panelists",
		description: "From the 2025 Alumni Panel",
		path: "/images/general/panel-2025-alt.avif",
	},
	samGigEm: {
		title: "Sam's Garbage Plate",
		description: "From the ISTS 2025 Competition",
		path: "/images/general/sam-gig-em.avif",
	},
	skeleton: {
		title: "Group Photo with Off-Season Skeleton",
		description: "From an Officer Social",
		path: "/images/general/skeleton.avif",
	},
	topGolf: {
		title: "Top Golf Group Photo",
		description: "From an Officer Social",
		path: "/images/general/top-golf.avif",
	},
	fallSocial: {
		title: "Bahama Bucks and Chill",
		description: "From a Fall Social",
		path: "/images/general/fall-social.avif",
	},
} satisfies Record<string, Photo>;
