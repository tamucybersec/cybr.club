import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

// restricts the max width of the content
function Container({ children, className = "", ...rest }: Props) {
	return (
		<div
			className={cn("flex w-full justify-center px-4 sm:px-6 lg:px-8", className)}
			{...rest}
		>
			<div className="grow max-w-5xl 2xl:max-w-7xl">{children}</div>
		</div>
	);
}

export default Container;
