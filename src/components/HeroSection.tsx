import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function HeroSection() {
	const buttons = () => (
		<div className="flex gap-4">
			<Button asChild>
				<Link
					href="/join"
					className="font-azonix px-6"
				>
					Join Us
				</Link>
			</Button>
			<Button
				asChild
				variant={"outline"}
			>
				<Link
					href="#learn"
					className="font-azonix px-6"
				>
					Learn More
				</Link>
			</Button>
		</div>
	);

	return (
		<Container className="items-center mt-[20dvh]">
			<div className="flex flex-col gap-4">
				<h1 className="font-azonix text-4xl">
					Jump-start your Journey
					<br />
					in Cybersecurity
				</h1>
				<p>
					Earn Certifications, Gain real-world experience,
					<br />
					and Find your calling in Cybersecurity
				</p>
				{buttons()}
			</div>
		</Container>
	);
}

export default HeroSection;
