import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
	size?: number;
	className?: string;
}

function Logo({ size = 36, className }: Props) {
	return (
		<div
			className={cn("flex items-center", className)}
			style={{
				gap: `calc(var(--spacing) * 2 * ${size / 36})`,
			}}
		>
			<Image
				src="/images/club-logos/white-shield.svg"
				alt="Club Logo"
				width={size}
				height={size}
			/>
			<h1
				className={`font-azonix leading-none text-xs`}
				style={{
					fontSize: `calc(0.75rem * ${size / 36})`,
					marginBottom: "-4px",
				}}
			>
				TAMU
				<br />
				CYBR
				<br />
				CLUB
			</h1>
		</div>
	);
}

export default Logo;
