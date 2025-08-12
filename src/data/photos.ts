interface Photo {
	title: string;
	description: string;
	path: string;
}

export const photos = {
	allthenticate: {
		title: "Allthenticate Guest Speaker",
		description: "From Beginner Meetings",
		path: "/images/general/allthenticate.jpg",
	},
	austinPoint: {
		title: "Austin Teaches Networking",
		description: "From Cisco Networking Academy (Lab)",
		path: "/images/general/austin-point.jpg",
	},
	badApple: {
		title: "Bad Apple Printout",
		description: "From an unknown competition",
		path: "/images/general/bad-apple.jpg",
	},
	ciscoGigEm: {
		title: "Cisco Lab Completed",
		description: "From Cisco Networking Academy (Lab)",
		path: "/images/general/cisco-gig-em.jpg",
	},
	ciscoHuge: {
		title: "Lesson Lab",
		description: "From Cisco Networking Academy",
		path: "/images/general/cisco-huge.jpg",
	},
	ciscoSmile: {
		title: "Halo LAN Party",
		description: "From Cisco Networking Academy (Lab)",
		path: "/images/general/cisco-smile.jpg",
	},
	ciscoSoyjak: {
		title: "Wireless Configurations",
		description: "From Cisco Networking Academy (Lab)",
		path: "/images/general/cisco-soyjak.jpg",
	},
	colbyMasterChef: {
		title: "Master 'Chef' Colby",
		description: "From Cisco Networking Academy (Halloween)",
		path: "/images/general/colby-master-chef.jpg",
	},
	infoGavin: {
		title: "Informational Game",
		description: "From the Spring 2025 Informational",
		path: "/images/general/info-gavin.jpg",
	},
	informational: {
		title: "Information Overhead",
		description: "From the Fall 2024 Informational",
		path: "/images/general/informational.jpg",
	},
	ists: {
		title: "On the Grind",
		description: "From the ISTS 2025 Competition",
		path: "/images/general/ists.jpg",
	},
	mimic: {
		title: "Mimic Guest Speaker",
		description: "From Beginner Meetings",
		path: "/images/general/mimic.jpg",
	},
	paloSpeaker: {
		title: "Palo Alto Guest Speaker",
		description: "From Palo Alto Academy",
		path: "/images/general/palo-speaker.jpg",
	},
	paloWomenPanelists: {
		title: "Women In STEM Panelists",
		description: "From Palo Alto Academy",
		path: "/images/general/palo-women-panelists.png",
	},
	paloWomenStudents: {
		title: "Women In STEM Students",
		description: "From Palo Alto Academy",
		path: "/images/general/palo-women-students.png",
	},
	panel2025: {
		title: "Alumni Panelists",
		description: "From the 2025 Alumni Panel",
		path: "/images/general/panel-2025-alt.jpg",
	},
	samGigEm: {
		title: "Sam's Garbage Plate",
		description: "From the ISTS 2025 Competition",
		path: "/images/general/sam-gig-em.jpg",
	},
	skeleton: {
		title: "Group Photo with Off-Season Skeleton",
		description: "From an Officer Social",
		path: "/images/general/skeleton.jpg",
	},
	topGolf: {
		title: "Top Golf Group Photo",
		description: "From an Officer Social",
		path: "/images/general/top-golf.jpg",
	},
	fallSocial: {
		title: "Bahama Bucks and Chill",
		description: "From a Fall Social",
		path: "/images/general/fall-social.jpg",
	},
} satisfies Record<string, Photo>;
