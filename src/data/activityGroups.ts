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

export const activityGroups: ActivityGroup[] = [
	{
		id: 1,
		title: "Cyber Policy",
		description:
			"The smartest move in cybersecurity isn't always technical. Strategy decides who wins when the stakes are high.",
		modalContent:
			"Policy shapes how nations respond to a breach, protect their economies, and prevent conflict. This group connects technical knowledge with real-world decision making, giving you the skills to advise leaders and act under pressure. You will tackle real scenarios, build your crisis response skills, and take on top universities in national competitions, such as the Atlantic Council's renowned Cyber 9/12 Strategy Challenge.",
		day: "Monday",
		time: "5:30",
		location: "ALLN 1041",
		map: "https://aggiemap.tamu.edu/?bldg=1607",
		image: "/images/activity-groups/policy.png",
	},
	{
		id: 6,
		title: "AWS Academy",
		description:
			"Work directly with the world's biggest cloud platform and build skills that matter everywhere.",
		modalContent:
			"AWS powers everything from virtual machines to storage buckets and complex networks. This group breaks down these core cloud services so you can understand how they work and become an AWS Certified Cloud Practitioner at no cost. Whether you're aiming for a career in tech or just want to add powerful skills to your toolkit, this group gives you a solid foundation with practical, real-world experience.",
		day: "Monday",
		time: "7:00",
		location: "BLOC 163",
		map: "https://aggiemap.tamu.edu/?bldg=0524",
		image: "/images/activity-groups/aws.svg",
	},
	{
		id: 2,
		title: "Red Hat Academy",
		description:
			"Master the operating system that powers the internet. Build skills that open doors in tech careers everywhere.",
		modalContent:
			"Learn Linux from the ground up through practical exercises in system administration and command-line mastery. This group gives you the tools to navigate real-world systems with confidence, using labs and scenarios drawn from industry experience. Along the way, you will prepare for an industry-recognized Red Hat certification at no cost, proving your skills to employers before you even graduate.",
		day: "Monday",
		time: "8:00",
		location: "BLOC 163",
		map: "https://aggiemap.tamu.edu/?bldg=0524",
		image: "/images/activity-groups/red-hat.png",
	},
	{
		id: 3,
		title: "Cyber Operations",
		description:
			"Push your technical skills to the limit. Learn how attacks happen and how to shut them down.",
		modalContent:
			"This group combines offensive and defensive cybersecurity into one focused program. You will work hands-on with binary and web exploitation, cryptography, network defense, and more, gaining experience with the same techniques used in real breaches. Every session builds your ability to both breach and secure complex systems through focused technical exercises and competitive challenges. No experience is necessary, although it is recommended.",
		day: "Tuesday",
		time: "7:00",
		location: "BLOC 163",
		map: "https://aggiemap.tamu.edu/?bldg=0524",
		image: "/images/activity-groups/hack-the-box.png",
	},
	{
		id: 4,
		title: "Hardware Hacking",
		description:
			"Explore the physical side of security. Get hands-on with locks, gadgets, and embedded systems.",
		modalContent:
			"Cybersecurity isn't just about software. This group dives into lockpicking, physical security, and embedded systems hacking. You'll learn how to test and bypass real-world defenses, work with hardware tools, and understand the tech behind devices we use every day. It's a chance to develop skills that complement digital security and open new doors in the security field.",
		day: "Tuesday",
		time: "8:00",
		location: "BLOC 163",
		map: "https://aggiemap.tamu.edu/?bldg=0524",
		image: "/images/activity-groups/flipper.svg",
	},
	{
		id: 5,
		title: "Beginner Meetings",
		description:
			"A beginner-friendly starting point to learn new skills, watch live demos, and hear from industry professionals.",
		modalContent:
			"These meetings are designed to give you a solid introduction to cybersecurity in a relaxed and supportive setting. You'll pick up essential skills, see real-time demonstrations, get insights directly from people working in the field, and grow your cybersecurity network. Whether you're just getting started or looking to broaden your horizons, this group makes it easy to jump in and start learning.",
		day: "Wednesday",
		time: "7:15",
		location: "ETB 1037",
		map: "https://aggiemap.tamu.edu/?bldg=0270",
		image: "/images/club-logos/white-shield.svg",
	},
	{
		id: 7,
		title: "Palo Alto Academy",
		description:
			"Learn to use the tools behind some of the world's top cybersecurity platforms.",
		modalContent:
			"This group dives into the key concepts and technologies from Palo Alto Networks. You'll build practical skills through real-world scenarios and prepare for the Cybersecurity Apprentice and Practitioner exams to get a headstart in internships or jobs. Whether you're just getting started or want to sharpen your expertise, this group helps you stand out to employers.",
		day: "Thursday",
		time: "7:00",
		location: "BLOC 163",
		map: "https://aggiemap.tamu.edu/?bldg=0524",
		image: "/images/activity-groups/palo-alto.svg",
	},
	{
		id: 8,
		title: "Cisco Networking Academy",
		description:
			"Build a deep understanding of networking from the ground up and gain experience with real Cisco equipment.",
		modalContent:
			"Cisco is a global leader in networking technology, and this group offers you a chance to learn the core principles that power the internet and enterprise networks. You'll progress through focused lessons and monthly labs that develop your ability to configure routers, switches, and more. Whether you're aiming for the CCNA certification or just want solid networking skills, this group prepares you for success in virtually any tech career.",
		day: "Thursday",
		time: "8:00",
		location: "BLOC 163",
		map: "https://aggiemap.tamu.edu/?bldg=0524",
		image: "/images/activity-groups/cisco.svg",
	},
];
