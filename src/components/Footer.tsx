import Link from "next/link";
import Container from "./Container";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import {
	faDiscord,
	faInstagram,
	faLinkedin,
	faTwitter,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
	CalendarClock,
	Flag,
	HeartHandshake,
	Info,
	Network,
	Shield,
	Star,
	TypeOutline,
	UserRoundPlus,
} from "lucide-react";
import Logo from "./Logo";

interface FooterLink {
	label: string;
	href: string;
	icon: ReactNode;
}

const redirects: FooterLink[] = [
	{
		label: "About",
		href: "/about",
		icon: <Info />,
	},
	{
		label: "Events",
		href: "/events",
		icon: <CalendarClock />,
	},
	{
		label: "Partnership",
		href: "/partnership",
		icon: <HeartHandshake />,
	},
	{
		label: "Join",
		href: "/join",
		icon: <UserRoundPlus />,
	},
];

const partners: FooterLink[] = [
	{
		label: "Cyber Center",
		href: "https://cybersecurity.tamu.edu/",
		icon: <Star />,
	},
	{
		label: "Cyber Range",
		href: "https://txcr.tamu.edu/",
		icon: <Network />,
	},
	{
		label: "TAMUctf",
		href: "https://cybersecurity.tamu.edu/tamuctf/",
		icon: <Flag />,
	},
	{
		label: "WiCyS",
		href: "https://tamuwicys.club/",
		icon: <Shield />,
	},
];

const socials: FooterLink[] = [
	{
		label: "Discord",
		href: "https://discord.gg/tudJjpTr4s",
		icon: <FontAwesomeIcon icon={faDiscord} />,
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/tamucybersec",
		icon: <FontAwesomeIcon icon={faInstagram} />,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/company/texas-a-m-cyber-security-club",
		icon: <FontAwesomeIcon icon={faLinkedin} />,
	},
	{
		label: "X",
		href: "https://x.com/TAMUCybersec",
		icon: <FontAwesomeIcon icon={faXTwitter} />,
	},
];

function Footer() {
	const linkRow = (title: string, links: FooterLink[]) => (
		<div className="flex flex-col">
			<h5>{title}</h5>
			{links.map((l, i) => (
				<Button
					key={i}
					asChild
					variant="link"
				>
					<Link
						href={l.href}
						className="flex justify-start"
					>
						{l.icon}
						{l.label}
					</Link>
				</Button>
			))}
		</div>
	);

	return (
		<Container>
			<div className="flex p-4 justify-center gap-16">
				<div className="flex flex-col justify-center items-center gap-4">
					<Logo size={81} />
					<Button
						asChild
						className="font-azonix"
					>
						{/* TODO inject email with js for obfuscation from bots */}
						<Link href="mailto:turn.on@java.script">
							Contact Us
						</Link>
					</Button>
				</div>
				<div className="flex gap-2">
					{linkRow("Links", redirects)}
					{linkRow("Partners", partners)}
					{linkRow("Socials", socials)}
				</div>
			</div>
		</Container>
	);
}

export default Footer;
