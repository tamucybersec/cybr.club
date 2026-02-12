import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	paddingX?: "regular" | "double";
	paddingY?: "none" | "regular";
	children: ReactNode;
}

// restricts the max width of the content
function Container({
	paddingX = "regular",
	paddingY = "none",
	children,
	className = "",
	...rest
}: Props) {
	return (
		<div
			className={cn(
				"flex w-full justify-center px-4 sm:px-6 lg:px-8",
				paddingX === "double" ? "px-8 sm:px-12 lg:px-16" : "",
				paddingY === "regular" ? "py-16 sm:py-20 lg:py-24" : "",
				className
			)}
			{...rest}
		>
			<div className="grow max-w-5xl 2xl:max-w-7xl">{children}</div>
		</div>
	);
}

export default Container;
