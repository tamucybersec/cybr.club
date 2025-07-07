import Link from "next/link";
import Container from "./Container";
import { Button } from "./ui/button";
import Image from "next/image";

function NavBar() {
	return (
		<Container className="sticky top-4">
			<div className="flex justify-between rounded-xl p-4 mb-4 w-full bg-background/70 backdrop-blur-sm items-center">
				<div className="flex gap-4 items-center">
					<Image
						src="/images/WhiteShield.svg"
						alt="Club Logo"
						width={36}
						height={36}
					/>
					<h1 className="font-azonix text-xs leading-none">
						TAMU
						<br />
						CYBR
						<br />
						CLUB
					</h1>
				</div>
				<div className="flex gap-4">
					<Button
						asChild
						variant={"ghost"}
					>
						<Link href="/about">About</Link>
					</Button>
					<Button
						asChild
						variant={"ghost"}
					>
						<Link href="/events">Events</Link>
					</Button>
					<Button
						asChild
						variant={"ghost"}
					>
						<Link href="/partnership">Partnership</Link>
					</Button>
					<Button asChild>
						<Link
							href="/join"
							className="font-azonix px-6"
						>
							Join Us
						</Link>
					</Button>
				</div>
			</div>
		</Container>
	);
}

export default NavBar;
