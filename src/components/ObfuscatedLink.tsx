import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { ReactNode, useEffect, useState } from "react";

type Props = {
	href: string;
	isEmail?: boolean;
	className: string;
	children: ReactNode;
} & LinkProps &
	React.AnchorHTMLAttributes<HTMLAnchorElement>;

function ObfuscatedLink({
	href,
	isEmail: email,
	className,
	children,
	...rest
}: Props) {
	const [unobfuscatedHref, setUnobfuscatedHref] = useState(
		`${email ? "mailto:enable@javascript" : "https://enable.javascript"}`
	);

	useEffect(() => {
		setUnobfuscatedHref(`${email ? "mailto:" : ""}${atob(href)}`);
	}, []);

	return (
		<Link
			href={unobfuscatedHref}
			className={cn(className)}
			{...rest}
		>
			{children}
		</Link>
	);
}

export default ObfuscatedLink;
