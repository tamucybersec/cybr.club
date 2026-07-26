export interface Socials {
	linkedin?: string;
	github?: string;
	email?: string;
	website?: string;
}

export function ObfuscateSocials(socials: Socials): Socials {
	return Object.fromEntries(
		Object.entries(socials).flatMap(([platform, url]) =>
			url ? [[platform, btoa(url)]] : []
		)
	) as Socials;
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

const austinGlander: DoubleDipOfficer = {
	name: "Austin Glander",
	image: "/images/leadership/AustinGlander.avif",
	positions: ["President", "Cisco Networking Academy Student Ambassador"],
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
	getDoubleDipOfficer(austinGlander, 0),
	{
		name: "Preston VanderLight",
		image: "/images/leadership/PrestonVanderLight.avif",
		position: "Vice President",
		major: "ECEN",
		year: 27,
		socials: ObfuscateSocials({
			email: "preston.vanderlight@tamu.edu",
			linkedin: "https://www.linkedin.com/in/prestonvanderlight/",
		}),
	},
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
		name: "Jason Lau",
		image: "/images/leadership/JasonLau.webp",
		position: "Directory of Public Relations",
		major: "CSCE",
		year: 27,
		socials: ObfuscateSocials({
			email: "jasonylau@tamu.edu",
			github: "https://github.com/jasonlau05",
			linkedin: "https://www.linkedin.com/in/jasonlau0/",
			website: "https://people.tamu.edu/~jasonylau/",
		}),
		imageMode: "icon",
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
			position: "Cyber Operations (Pentesting)",
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
			name: "David Corvaglia",
			image: "/images/leadership/DavidCorvaglia.webp",
			position: "Hardware Hacking Lead",
			major: "CPCS",
			year: 28,
			socials: ObfuscateSocials({
				email: "corvaglia@tamu.edu",
				website: "https://corvaglia.dev",
			}),
			imageMode: "icon",
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
			name: "Geoffrey Bosenbark",
			image: "/images/leadership/GeoffreyBosenbark.webp",
			position: "Policy Lead",
			major: "INTA",
			year: 27,
			socials: ObfuscateSocials({
				email: "bosenbarkgb@tamu.edu",
				linkedin: "https://www.linkedin.com/in/geoffrey-bosenbark/",
			}),
			imageMode: "icon",
		},
	],
} as const satisfies Record<string, Officer[]>;
