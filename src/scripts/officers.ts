export interface Socials {
	linkedin?: string;
	github?: string;
	email?: string;
	website?: string;
}

export type Officers = {
	name: string;
	position: string;
	major: string;
	year?: number;
	socials?: Socials;
}[];

export const officers: Officers = [
	{
		name: "Lane Simmons",
		position: "President",
		major: "COMP",
		year: 25,
		socials: {
			linkedin: "https://www.linkedin.com/in/lcsimmons/",
			github: "https://github.com/lcsimmons",
			email: "tamucybersec@gmail.com",
		},
	},
	{
		name: "Colby Coppinger",
		position: "Vice President",
		major: "GIST",
		year: 25,
		socials: {
			email: "tamucybersec@gmail.com",
		},
	},
	{
		name: "Sophie Gleadell",
		position: "Secretary",
		major: "COMP",
		year: 25,
		socials: {
			email: "tamucybersec@gmail.com",
		},
	},
	{
		name: "Ezra Jeter",
		position: "Treasurer",
		major: "CPEN",
		year: 24,
		socials: {
			linkedin: "https://www.linkedin.com/in/ezrajeter",
			email: "tamucybersec@gmail.com",
		},
	},
	{
		name: "Emmie Teng",
		position: "Director of Public Relations",
		major: "CPSC",
		year: 25,
		socials: {
			linkedin: "https://www.linkedin.com/in/mengting-teng",
			github: "https://github.com/TengMengTing",
			email: "tamucybersec@gmail.com",
		},
	},
	{
		name: "Damian Lall",
		position: "Competition Lead",
		major: "ITDE",
		year: 25,
		socials: {
			email: "tamucybersec@gmail.com",
			website: "https://lall.us/",
		},
	},
	{
		name: "Javi Betancourt",
		position: "Tech Lead",
		major: "CPSC",
		year: 26,
		socials: {
			linkedin:
				"https://www.linkedin.com/in/javier-betancourt-1100b2268/",
			github: "https://github.com/HomeoStasis-0",
			email: "tamucybersec@gmail.com",
		},
	},
	{
		name: "Victor Phan",
		position: "Activity Groups Lead",
		major: "CPSC",
		year: 25,
		socials: {
			github: "https://github.com/move2slowly",
			email: "tamucybersec@gmail.com",
		},
	},
	{
		name: "Emma Scott",
		position: "WiCyS President",
		major: "FIVS",
		year: 25,
		socials: {
			linkedin: "https://www.linkedin.com/in/emma-scott-699435264",
			email: "tamuwicys@gmail.com",
		},
	},
	{
		name: "Michelle Thomas",
		position: "WiCyS Vice President",
		major: "MIS",
		year: 26,
		socials: {
			linkedin: "https://www.linkedin.com/in/michellerose-thomas",
			email: "tamuwicys@gmail.com",
		},
	},
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
