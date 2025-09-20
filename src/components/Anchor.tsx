import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

type Props = {
	children: ReactNode;
} & LinkProps &
	AnchorHTMLAttributes<HTMLAnchorElement>;

function Anchor({ children, ...rest }: Props) {
	return (
		<Link
			{...rest}
			className={cn(
				"font-bold hover:underline text-blue-400 hover:text-blue-300 visited:text-purple-400",
				rest.className
			)}
		>
			{children}
		</Link>
	);
}

export default Anchor;
