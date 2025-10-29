"use client";

import Link from "next/link";
import Container from "./Container";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import {
	faDiscord,
	faInstagram,
	faLinkedin,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
	// CalendarClock,
	Flag,
	HeartHandshake,
	Info,
	Network,
	Shield,
	Star,
	UserRoundPlus,
	ArrowUpRight,
} from "lucide-react";
import Logo from "./Logo";
import ObfuscatedLink from "./ObfuscatedLink";

interface FooterLink {
	label: string;
	href: string;
	icon: ReactNode;
}

const seeMore: FooterLink[] = [
	{
		label: "About",
		href: "/about",
		icon: <Info size={14} />,
	},
	// {
	//   label: "Events",
	//   href: "/events",
	//   icon: <CalendarClock size={14} />,
	// },
	{
		label: "Partnership",
		href: "/partnership",
		icon: <HeartHandshake size={14} />,
	},
	{
		label: "Join",
		href: "/join",
		icon: <UserRoundPlus size={14} />,
	},
];

const partners: FooterLink[] = [
	{
		label: "Cyber Center",
		href: "https://cybersecurity.tamu.edu/",
		icon: <Star size={14} />,
	},
	{
		label: "Cyber Range",
		href: "https://txcr.tamu.edu/",
		icon: <Network size={14} />,
	},
	{
		label: "TAMUctf",
		href: "https://cybersecurity.tamu.edu/tamuctf/",
		icon: <Flag size={14} />,
	},
	{
		label: "WiCyS",
		href: "https://tamuwicys.club/",
		icon: <Shield size={14} />,
	},
];

const socials: FooterLink[] = [
	{
		label: "Discord",
		href: "https://discord.gg/tudJjpTr4s",
		icon: (
			<FontAwesomeIcon
				icon={faDiscord}
				className="w-3.5 h-3.5"
			/>
		),
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/tamucybersec",
		icon: (
			<FontAwesomeIcon
				icon={faInstagram}
				className="w-3.5 h-3.5"
			/>
		),
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/company/texas-a-m-cyber-security-club",
		icon: (
			<FontAwesomeIcon
				icon={faLinkedin}
				className="w-3.5 h-3.5"
			/>
		),
	},
	{
		label: "X",
		href: "https://x.com/TAMUCybersec",
		icon: (
			<FontAwesomeIcon
				icon={faXTwitter}
				className="w-3.5 h-3.5"
			/>
		),
	},
];

const groups = [
	{
		name: "See More",
		links: seeMore,
	},
	{
		name: "Partners",
		links: partners,
	},
	{
		name: "Socials",
		links: socials,
	},
];

function FooterLinkItem({ link }: { link: FooterLink }) {
	return (
		<Link
			href={link.href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-center justify-between py-1.5 px-1 text-foreground/70 hover:text-foreground transition-colors duration-200"
		>
			<div className="flex items-center gap-2">
				{link.icon}
				<span className="text-hero-button">{link.label}</span>
			</div>
			<ArrowUpRight
				size={12}
				className="opacity-0 group-hover:opacity-100 transform translate-x-0 translate-y-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 ease-out"
			/>
		</Link>
	);
}

function Footer() {
	return (
		<Container className="py-8 sm:py-12">
			<div className="flex flex-col md:flex-row justify-between items-center gap-y-8">
				{/* Logo and Contact Section */}
				<div className="flex flex-col justify-center items-center mx-16 gap-4 w-full md:w-auto">
					<Logo
						size={60}
						className="sm:mb-2"
					/>
					<Button
						asChild
						className="font-azonix h-9 text-sm bg-primary hover:bg-primary/90 rounded-md transition-colors"
					>
						<ObfuscatedLink
							href={btoa("tamucybersec@gmail.com")}
							isEmail={true}
							className="flex items-center justify-center w-min h-full"
						>
							Contact Us
						</ObfuscatedLink>
					</Button>
				</div>

				{/* Links Grid - Always 3 columns */}
				<div className="w-full flex justify-center md:grid md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 lg:max-w-2xl lg:ml-auto">
					{groups.map(({ name, links }) => (
						<div
							className="flex flex-col gap-0.5 justify-start"
							key={name}
						>
							<p className="font-ubuntu-sans text-hero-button font-medium">
								{name}
							</p>
							{links.map((link, i) => (
								<FooterLinkItem
									key={i}
									link={link}
								/>
							))}
						</div>
					))}
				</div>
			</div>

			{/* Copyright */}
			<div className="text-center text-xs sm:text-sm text-muted-foreground mt-12 sm:mt-16">
				&copy; {new Date().getFullYear()} TAMU Cybersecurity Club. All
				rights reserved.
			</div>
		</Container>
	);
}

export default Footer;
