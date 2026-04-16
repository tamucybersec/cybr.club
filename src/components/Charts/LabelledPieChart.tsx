"use client";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useCategoricalChart } from "@/hooks/useCategoricalChart";
import { useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import type { CategoricalData } from "../../lib/types";

interface Props {
	title: string;
	data: CategoricalData[];
}

const LEGEND_LIMIT = 5;

interface LegendItem {
	label: string;
	fill: string;
}

function CollapsibleLegend({
	items,
	config,
}: {
	items: LegendItem[];
	config: ChartConfig;
}) {
	const [showAll, setShowAll] = useState(false);

	const visible = showAll ? items : items.slice(0, LEGEND_LIMIT);
	const overflow = items.length - LEGEND_LIMIT;

	return (
		<div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center text-sm mt-3 px-2">
			{visible.map((item) => {
				const color = config[item.label.replace(/ /g, "_")]?.color;
				return (
					<div
						key={item.label}
						className="flex items-center gap-1.5"
					>
						<div
							className="w-2.5 h-2.5 rounded-sm shrink-0"
							style={{ background: color }}
						/>
						<span className="text-muted-foreground">
							{item.label}
						</span>
					</div>
				);
			})}
			{!showAll && overflow > 0 && (
				<button
					onClick={() => setShowAll(true)}
					className="text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors"
				>
					+ {overflow} more
				</button>
			)}
			{showAll && overflow > 0 && (
				<button
					onClick={() => setShowAll(false)}
					className="text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors"
				>
					show less
				</button>
			)}
		</div>
	);
}

function LabelledPieChart({ title, data }: Props) {
	const { config, coloredData, total } = useCategoricalChart(data);

	function centerLabel() {
		return (
			<Label
				content={({ viewBox }) => {
					if (viewBox && "cx" in viewBox && "cy" in viewBox) {
						return (
							<text
								x={viewBox.cx}
								y={viewBox.cy}
								textAnchor="middle"
								dominantBaseline="middle"
							>
								<tspan
									x={viewBox.cx}
									y={viewBox.cy}
									className="fill-foreground text-3xl font-bold"
								>
									{total.toLocaleString()}
								</tspan>
								<tspan
									x={viewBox.cx}
									y={(viewBox.cy || 0) + 24}
									className="fill-muted-foreground"
								>
									{title}
								</tspan>
							</text>
						);
					}
				}}
			/>
		);
	}

	return (
		<div className="flex flex-col items-center w-full">
			<ChartContainer
				config={config}
				className="mx-auto aspect-square max-h-[300px] w-full"
			>
				<PieChart accessibilityLayer>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={coloredData}
						dataKey="count"
						nameKey="label"
						innerRadius={60}
						strokeWidth={5}
					>
						{centerLabel()}
					</Pie>
				</PieChart>
			</ChartContainer>
			<CollapsibleLegend
				items={coloredData}
				config={config}
			/>
		</div>
	);
}

export default LabelledPieChart;
