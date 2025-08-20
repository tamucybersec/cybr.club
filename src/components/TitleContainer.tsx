
import { ReactNode } from "react";
import Container from "./Container";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	children: ReactNode;
}

function TitleContainer({ className, children }: Props) {
	return (
		<Container>
			<h1 className={cn("text-white text-5xl font-azonix mb-4", className)}>
				{children}
			</h1>
		</Container>
	);
}

export default TitleContainer;
