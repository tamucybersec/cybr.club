"use client";

import BackgroundOverlay from "@/components/BackgroundOverlay";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SmoothScroll from "@/components/SmoothScroll";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getTitle } from "@/data/qrCode";
import { API_URL } from "@/lib/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UAParser, IResult } from "ua-parser-js";

const deviceName: Record<string, string> = {
	console: "Console",
	embedded: "Appliance",
	mobile: "Phone",
	pc: "PC",
	smarttv: "SmartTV",
	tablet: "Tablet",
	wearable: "Wearable",
	xr: "XR",
};

function QR() {
	const [title, setTitle] = useState("");
	const [ua, setUA] = useState<IResult | undefined>(undefined);
	const [ip, setIp] = useState("...");

	function getDeviceName(model: string | undefined): string {
		if (model && model in deviceName) {
			return deviceName[model];
		}
		return "Device";
	}

	useEffect(() => {
		const parser = new UAParser(window.navigator.userAgent);
		setUA(parser.getResult());

		let ttl = getTitle();
		const dev = getDeviceName(parser.getDevice().model);
		ttl = ttl.replace("%device%", dev);
		setTitle(ttl);

		async function getIp() {
			try {
				const resp = await fetch(`${API_URL}/ip`);
				const json = await resp.json();
				setIp(json);
			} catch {
				setIp("unavailable");
			}
		}
		getIp();
	}, []);

	function deviceString() {
		const browser = ua?.browser.name;
		const os = ua?.os.name;
		const device =
			`${ua?.device.vendor || ""} ${getDeviceName(ua?.device.model)}`.trim();

		return `${browser ? browser + " on " : ""} ${device ? device + " running " : ""} ${os}`.trim();
	}

	const Body = () => (
		<Container className="mt-[12dvh] sm:mt-[15dvh] px-4 sm:px-6 lg:px-8 mb-8">
			<div className="flex flex-col gap-4">
				<h2
					className="text-3xl font-bold"
					dangerouslySetInnerHTML={{ __html: title }}
				></h2>
				<p>
					26% of malicious links are delivered by QR code. Always
					think before you scan. Attackers use QR codes to hide
					malicious websites that can steal credentials, install
					malware, or compromise sensitive information.
				</p>
				<p>
					Your device is fine, but here&apos;s some data we were able
					to collect:
				</p>
				<div>
					<p>
						<span className="font-bold">Device details</span>:{" "}
						{ua ? deviceString() : "..."}
					</p>
					<p>
						<span className="font-bold">Public IP</span>: {ip}
					</p>
				</div>
				<p>
					If you want to learn how to protect yourself against
					hackers, how these attacks work, or anything else
					cybersecurity related, join the Cybersecurity Club!
				</p>
				<div className="flex gap-4">
					<Button asChild>
						<Link href="/join">Join</Link>
					</Button>
					<Button
						variant={"outline"}
						asChild
					>
						<Link href="/">Learn More</Link>
					</Button>
				</div>
			</div>
		</Container>
	);

	return (
		<SmoothScroll>
			<BackgroundOverlay
				desktop={{
					size: "300% 1000%",
					position: "center 50%",
				}}
				tablet={{
					size: "250% 1000%",
					position: "center 45%",
				}}
				mobile={{
					size: "200% 1200%",
					position: "center 10%",
				}}
				opacity={0.6}
			/>
			{title ? (
				<>
					<NavBar />
					{Body()}
					<Footer />
				</>
			) : (
				<div className="w-dvw h-dvh flex justify-center items-center">
					<div className="flex gap-4 items-center">
						<Spinner className="size-4" />
						<h2 className="text-2xl font-mono">
							Unleashing the Ducks
						</h2>
					</div>
				</div>
			)}
		</SmoothScroll>
	);
}

export default QR;
