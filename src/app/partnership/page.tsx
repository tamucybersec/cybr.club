"use client";

import Container from "@/components/Container";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import NavSpacer from "@/components/NavSpacer";
import TitleContainer from "@/components/TitleContainer";

export default function Home() {
	return (
		<>
			<NavBar />
			<NavSpacer />
			<TitleContainer>Back Tomorrow&apos;s Cyber Leaders</TitleContainer>
			<Container>
				<div className="flex flex-col gap-4">
					<p>
						Support the next generation of cybersecurity
						professionals by sponsoring the Texas A&M Cybersecurity
						Club. Our passionate and driven members depend on the
						generosity of sponsors to access career-launching
						opportunities. Your support makes it possible for
						students to compete in national competitions, attend
						industry conferences, earn respected certifications, and
						host hands-on technical workshops that build real-world
						skills.
					</p>
					<div>
						<h2 className="font-azonix text-2xl">Benefits</h2>
						<ul className="list-disc list-inside">
							<li>
								Recognition on the{" "}
								<span className="font-bold">Website</span> and{" "}
								<span className="font-bold">Shirts</span>
							</li>
							<li>
								Access to our{" "}
								<span className="font-bold">
									curated resume bank
								</span>
							</li>
							<li>
								Host{" "}
								<span className="font-bold">workshops</span> or{" "}
								<span className="font-bold">
									meet-and-greets
								</span>
							</li>
							<li>
								Host dedicated{" "}
								<span className="font-bold">
									recruitment events
								</span>
							</li>
						</ul>
					</div>
				</div>
			</Container>
			<TitleContainer className="mt-8">Partnership Guide</TitleContainer>
			<Container>
				<div className="w-full h-screen">
					<object
						data="/pdfs/Sponsorship Packet 2025-2026.pdf"
						type="application/pdf"
						width="100%"
						style={{ height: "calc(100% - 6.5rem)" }}
					>
						<p>
							<a href="/pdfs/Sponsorship Packet 2025-2026.pdf">
								Sponsorship Packet
							</a>
						</p>
					</object>
				</div>
			</Container>
			<Footer />
		</>
	);
}
