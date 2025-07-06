import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
	tooltip: ReactNode;
}

function TooltipText({ children, tooltip }: Props) {
	return (
		<Tooltip>
			<TooltipTrigger>
				<span className="underline decoration-dashed decoration-1 underline-offset-3">
					{children}
				</span>
			</TooltipTrigger>
			<TooltipContent className="max-w-[300px]">{tooltip}</TooltipContent>
		</Tooltip>
	);
}

export default TooltipText;
