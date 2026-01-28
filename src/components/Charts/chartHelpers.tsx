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
				{title && (
					<p className="max-w-[200px] font-bold sm:max-w-none sm:break-words">
						{titleText}
					</p>
				)}
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

				<div className="flex w-full max-w-[200px] gap-2 sm:max-w-none">
					<span className="truncate text-muted-foreground">
						{metric}
					</span>
					<div className="ml-auto max-w-[200px] font-mono font-medium tabular-nums text-foreground sm:max-w-none">
						{count}
					</div>
				</div>
			</>
		);
	};

	return formatter;
}
