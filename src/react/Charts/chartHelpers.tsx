import { validHtmlId } from "@/scripts/helpers";
import type {
	Formatter,
	NameType,
	ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export function basicFormatter(metric: string, hideIndicator?: boolean) {
	const formatter: Formatter<ValueType, NameType> = (_, __, item) => {
		const label = item.payload!.label;
		const count = item.payload!.count;

		return (
			<>
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
