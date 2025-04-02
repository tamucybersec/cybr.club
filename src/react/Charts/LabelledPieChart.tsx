import { Label, Pie, PieChart } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { getChartColor } from "@/scripts/helpers";
import type { CategoricalData, ColoredCategoricalData } from "../types";
import { useCategoricalChart } from "@/hooks/useCategoricalChart";

interface Props {
	title: string;
	data: CategoricalData[];
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
		<ChartContainer
			config={config}
			className="mx-auto aspect-square max-h-[300px]"
		>
			<PieChart accessibilityLayer>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<ChartLegend content={<ChartLegendContent nameKey="label" />} />
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
	);
}

export default LabelledPieChart;
