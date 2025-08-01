export interface Socials {
	linkedin?: string;
	github?: string;
	email?: string;
	website?: string;
}

export type Officer = {
	name: string;
	position: string;
	major: string;
	year?: number;
	socials?: Socials;
};

type DoubleDipOfficer = Omit<Officer, "position"> & {
	positions: [string, string];
};

function getDoubleDipOfficer(
	officer: DoubleDipOfficer,
	position: number
): Officer {
	return {
		...officer,
		position: officer.positions[position],
	};
}

const noahMustoe: DoubleDipOfficer = {
	name: "Noah Mustoe",
	positions: ["President", "Cyber Operations (Red Team)"],
	major: "CPSC",
	year: 26,
	socials: {
		email: "noahmustoe@tamu.edu",
		github: "https://github.com/cobradev4",
		linkedin: "https://www.linkedin.com/in/noahmustoe/",
	},
};

const austinGlander: DoubleDipOfficer = {
	name: "Austin Glander",
	positions: [
		"Vice President",
		"Cisco Networking Academy Student Ambassador",
	],
	major: "CPSC",
	year: 27,
	socials: {
		email: "austinglander@tamu.edu",
		github: "https://github.com/austinglander",
		linkedin: "https://www.linkedin.com/in/austinglander",
	},
};

const kalyanAdhikari: DoubleDipOfficer = {
	name: "Kalyan Adhikari",
	positions: ["Treasurer", "Palo Alto Academy Student Ambassador"],
	major: "GIST",
	year: 27,
	socials: {
		email: "kalyanadhikari@tamu.edu",
	},
};

const owenShadburne: DoubleDipOfficer = {
	name: "Owen Shadburne",
	positions: ["Director of Technology", "Red Hat Academy Student Ambassador"],
	major: "CPSC",
	year: 27,
	socials: {
		email: "shadbowne@tamu.edu",
		linkedin: "https://www.linkedin.com/in/owen-shadburne/",
		github: "https://github.com/CubeTures",
	},
};

const alexZhang: DoubleDipOfficer = {
	name: "Alex Zhang",
	positions: ["Director of Competitions", "Cyber Operations (CTF)"],
	major: "CPSC",
	year: 27,
	socials: {
		email: "alexzhang05@tamu.edu",
		github: "https://github.com/flocto",
		website: "https://flocto.github.io/",
	},
};

export const officers: Officer[] = [
	getDoubleDipOfficer(noahMustoe, 0),
	getDoubleDipOfficer(austinGlander, 0),
	getDoubleDipOfficer(kalyanAdhikari, 0),
	{
		name: "Matei Dumitru",
		position: "Secretary",
		major: "CPEN",
		year: 27,
		socials: {
			email: "mdumitru@tamu.edu",
			linkedin: "https://www.linkedin.com/in/mateidumitru",
		},
	},
	{
		name: "Zach Smith",
		position: "Director of External Relations",
		major: "CPSC",
		year: 27,
		socials: {
			email: "zts493@tamu.edu",
			github: "https://github.com/wackooswami",
			linkedin: "http://www.linkedin.com/in/zachary-smith2027",
		},
	},
	{
		name: "Alex Eade",
		position: "Directory of Activity Groups",
		major: "MISY",
		year: 26,
		socials: {
			email: "alexandereade@tamu.edu",
			linkedin: "https://www.linkedin.com/in/alexandereade/",
		},
	},
	{
		name: "Arianna Guzman",
		position: "Director of Public Relations",
		major: "ENGR",
		year: 28,
		socials: {
			email: "ariannaguz@tamu.edu",
			linkedin: "https://www.linkedin.com/in/ariannaguz",
		},
	},
	getDoubleDipOfficer(alexZhang, 0),
	getDoubleDipOfficer(owenShadburne, 0),
	{
		name: "Martin Carlisle",
		position: "Faculty Advisor",
		major: "CSCE Department",
		socials: {
			linkedin: "https://www.linkedin.com/in/martincarlisle/",
			website: "https://martincarlisle.com/",
		},
	},
];

export const activityLeaders = {
	"Cyber Operations": [
		getDoubleDipOfficer(noahMustoe, 1),
		getDoubleDipOfficer(alexZhang, 1),
	],
	"Hardware Hacking": [
		{
			name: "Preston VanderLight",
			position: "Hardware Hacking Lead",
			major: "ECEN",
			year: 27,
			socials: {
				email: "preston.vanderlight@tamu.edu",
				linkedin: "https://www.linkedin.com/in/prestonvanderlight/",
			},
		},
	],
	Cisco: [getDoubleDipOfficer(austinGlander, 1)],
	"Palo Alto": [getDoubleDipOfficer(kalyanAdhikari, 1)],
	AWS: [
		{
			name: "Luke Laudeman",
			position: "AWS Academy Student Ambassador",
			major: "INTA",
			year: 27,
			socials: {
				email: "luke123@tamu.edu",
			},
		},
	],
	"Red Hat": [
		{
			name: "Kevin Guerra",
			position: "Red Hat Academy Student Ambassador",
			major: "ENGR",
			year: 28,
			socials: {
				email: "kevin.guerra.v@tamu.edu",
				linkedin: "https://www.linkedin.com/in/kevin-guerra-v/",
			},
		},
		getDoubleDipOfficer(owenShadburne, 1),
	],
	Policy: [
		{
			name: "Chase Johnson",
			position: "Policy Lead",
			major: "MIA",
			year: 26,
			socials: {
				email: "c_johnson@tamu.edu",
				github: "https://github.com/cc-johnson",
				linkedin: "https://www.linkedin.com/in/cc-johnson/",
			},
		},
	],
} as const satisfies Record<string, Officer[]>;
