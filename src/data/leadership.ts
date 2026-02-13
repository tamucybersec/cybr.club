export interface Socials {
	linkedin?: string;
	github?: string;
	email?: string;
	website?: string;
}

function ObfuscateSocials(socials: Socials): Socials {
	return {
		linkedin: socials.linkedin ? btoa(socials.linkedin) : undefined,
		github: socials.github ? btoa(socials.github) : undefined,
		email: socials.email ? btoa(socials.email) : undefined,
		website: socials.website ? btoa(socials.website) : undefined,
	};
}

export type Officer = {
	name: string;
	image: string;
	position: string;
	major: string;
	year?: number;
	socials?: Socials;
	imageMode?: "cover" | "contain" | "icon"; // Optional flag for image display mode
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
	image: "/images/leadership/NoahMustoe.avif",
	positions: ["President", "Cyber Operations (Red Team)"],
	major: "CPSC",
	year: 26,
	socials: ObfuscateSocials({
		email: "noahmustoe@tamu.edu",
		github: "https://github.com/cobradev4",
		linkedin: "https://www.linkedin.com/in/noahmustoe/",
	}),
};

const austinGlander: DoubleDipOfficer = {
	name: "Austin Glander",
	image: "/images/leadership/AustinGlander.avif",
	positions: [
		"Vice President",
		"Cisco Networking Academy Student Ambassador",
	],
	major: "CPSC",
	year: 27,
	socials: ObfuscateSocials({
		email: "austinglander@tamu.edu",
		github: "https://github.com/austinglander",
		linkedin: "https://www.linkedin.com/in/austinglander",
	}),
};

const owenShadburne: DoubleDipOfficer = {
	name: "Owen Shadburne",
	image: "/images/leadership/OwenShadburne.avif",
	positions: ["Director of Technology", "Red Hat Academy Student Ambassador"],
	major: "CPSC",
	year: 27,
	socials: ObfuscateSocials({
		email: "shadbowne@tamu.edu",
		linkedin: "https://www.linkedin.com/in/owen-shadburne/",
		github: "https://github.com/CubeTures",
	}),
};

const alexZhang: DoubleDipOfficer = {
	name: "Alex Zhang",
	image: "/images/leadership/AlexZhang.avif",
	positions: ["Director of Competitions", "Cyber Operations (CTF)"],
	major: "CPSC",
	year: 27,
	socials: ObfuscateSocials({
		email: "alexzhang05@tamu.edu",
		github: "https://github.com/flocto",
		website: "https://flocto.github.io/",
	}),
};

export const officers: Officer[] = [
	getDoubleDipOfficer(noahMustoe, 0),
	getDoubleDipOfficer(austinGlander, 0),
	{
		name: "Vincent Dang",
		image: "/images/leadership/VincentDang.webp",
		position: "Treasurer",
		major: "ENGR",
		year: 29,
		socials: ObfuscateSocials({
			email: "vincent.dang@tamu.edu",
			linkedin: "https://www.linkedin.com/in/vincent-dang-6a812727a/",
		}),
		imageMode: "icon",
	},
	{
		name: "Matei Dumitru",
		image: "/images/leadership/MateiDumitru.avif",
		position: "Secretary",
		major: "CPEN",
		year: 27,
		socials: ObfuscateSocials({
			email: "mdumitru@tamu.edu",
			linkedin: "https://www.linkedin.com/in/mateidumitru",
		}),
	},
	{
		name: "Zach Smith",
		image: "/images/leadership/ZachSmith.avif",
		position: "Director of External Relations",
		major: "CPSC",
		year: 27,
		socials: ObfuscateSocials({
			email: "zts493@tamu.edu",
			github: "https://github.com/wackooswami",
			linkedin: "http://www.linkedin.com/in/zachary-smith2027",
		}),
	},
	{
		name: "Alex Eade",
		image: "/images/leadership/AlexEade.avif",
		position: "Directory of Activity Groups",
		major: "MISY",
		year: 26,
		socials: ObfuscateSocials({
			email: "alexandereade@tamu.edu",
			linkedin: "https://www.linkedin.com/in/alexandereade/",
		}),
	},
	getDoubleDipOfficer(alexZhang, 0),
	getDoubleDipOfficer(owenShadburne, 0),
	{
		name: "Martin Carlisle",
		image: "/images/leadership/MartinCarlisle.jpg",
		position: "Faculty Advisor",
		major: "CSCE Department",
		imageMode: "icon",
		socials: ObfuscateSocials({
			linkedin: "https://www.linkedin.com/in/martincarlisle/",
			website: "https://martincarlisle.com/",
		}),
	},
];

export const activityLeaders = {
	"Cyber Operations": [
		getDoubleDipOfficer(noahMustoe, 1),
		getDoubleDipOfficer(alexZhang, 1),
		{
			name: "Sam Bederman",
			image: "/images/leadership/SamBederman.webp",
			position: "Cyber Operations (Malware)",
			major: "CSCE",
			year: 27,
			socials: ObfuscateSocials({
				email: "beds@tamu.edu",
				linkedin: "https://www.linkedin.com/in/sam-bederman/",
			}),
			imageMode: "icon",
		},
		{
			name: "Michael Bengil",
			image: "/images/leadership/MichaelBengil.webp",
			position: "Cyber Operations (Blue Team)",
			major: "CSCE",
			year: 27,
			socials: ObfuscateSocials({
				email: "mace.bengil@tamu.edu",
				linkedin:
					"https://www.linkedin.com/in/michael-ace-bengil-83a535212/",
				website: "https://archan6el.github.io/ ",
			}),
			imageMode: "icon",
		},
	],
	"Hardware Hacking": [
		{
			name: "Preston VanderLight",
			image: "/images/leadership/PrestonVanderLight.avif",
			position: "Hardware Hacking Lead",
			major: "ECEN",
			year: 27,
			socials: ObfuscateSocials({
				email: "preston.vanderlight@tamu.edu",
				linkedin: "https://www.linkedin.com/in/prestonvanderlight/",
			}),
		},
	],
	Cisco: [getDoubleDipOfficer(austinGlander, 1)],
	"Palo Alto": [
		{
			name: "Kalyan Adhikari",
			image: "/images/leadership/KalyanAdhikari.avif",
			position: "Palo Alto Academy Student Ambassador",
			major: "GIST",
			year: 27,
			socials: ObfuscateSocials({
				email: "kalyanadhikari@tamu.edu",
			}),
		},
	],
	AWS: [
		{
			name: "Luke Laudeman",
			image: "/images/leadership/LukeLaudeman.webp",
			position: "AWS Academy Student Ambassador",
			major: "INTA",
			year: 27,
			socials: ObfuscateSocials({
				email: "luke123@tamu.edu",
			}),
			imageMode: "icon",
		},
	],
	"Red Hat": [
		{
			name: "Kevin Guerra",
			image: "/images/leadership/KevinGuerra.avif",
			position: "Red Hat Academy Student Ambassador",
			major: "ENGR",
			year: 28,
			socials: ObfuscateSocials({
				email: "kevin.guerra.v@tamu.edu",
				linkedin: "https://www.linkedin.com/in/kevin-guerra-v/",
			}),
		},
		getDoubleDipOfficer(owenShadburne, 1),
	],
	Policy: [
		{
			name: "Chase Johnson",
			image: "/images/leadership/ChaseJohnson.avif",
			position: "Policy Lead",
			major: "MIA",
			year: 26,
			socials: ObfuscateSocials({
				email: "c_johnson@tamu.edu",
				github: "https://github.com/cc-johnson",
				linkedin: "https://www.linkedin.com/in/cc-johnson/",
			}),
		},
	],
} as const satisfies Record<string, Officer[]>;
