import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

// restricts the max width of the content
function Container({ children, className = "", ...rest }: Props) {
	return (
		<div
			className={cn("flex w-full justify-center sm:px-4", className)}
			{...rest}
		>
			<div className="grow max-w-3xl">{children}</div>
		</div>
	);
}

export default Container;
