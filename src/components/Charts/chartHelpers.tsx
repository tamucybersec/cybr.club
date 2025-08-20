"use client";

import { validHtmlId } from "@/lib/helpers";
import type {
	Formatter,
	NameType,
	ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface Options {
	metric: string;
	title?: boolean;
	hideIndicator?: boolean;
}

export function basicFormatter({ title, metric, hideIndicator }: Options) {
	const formatter: Formatter<ValueType, NameType> = (_, __, item) => {
		const titleText = item.payload!.title;
		const label = item.payload!.label;
		const count = item.payload!.count;

		return (
			<>
				{title && <p className="w-full font-bold">{titleText}</p>}
				{!hideIndicator && (
					<div
						className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[var(--color-bg)]"
						style={
							{
								"--color-bg": `var(--color-${validHtmlId(
									label
								)})`,
							} as React.CSSProperties
						}
					/>
				)}

				<span className="text-muted-foreground">{metric}</span>
				<div className="ml-auto font-mono font-medium tabular-nums text-foreground">
					{count}
				</div>
			</>
		);
	};

	return formatter;
}
