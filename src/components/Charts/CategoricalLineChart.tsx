"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import type { CategoricalData } from "../../lib/types";
import { useCategoricalChart } from "@/hooks/useCategoricalChart";
import { basicFormatter } from "./chartHelpers";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

interface Props {
	metric: string;
	data: (CategoricalData & { title: string })[];
}

export default function CategoricalLineChart({ metric, data }: Props) {
	const { config, coloredData } = useCategoricalChart(data);

	return (
		<ChartContainer config={config}>
			<LineChart
				accessibilityLayer
				data={coloredData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={true} />
				<XAxis
					dataKey="label"
					tickLine={true}
					axisLine={true}
					tickMargin={8}
				/>
				<YAxis dataKey={"count"} />
				<ChartTooltip
					cursor={true}
					content={
						<ChartTooltipContent
							hideLabel
							formatter={basicFormatter({
								title: true,
								metric,
								hideIndicator: true,
							})}
						/>
					}
				/>
				<Line
					dataKey="count"
					type="monotone"
					stroke="hsl(var(--chart-1))"
					strokeWidth={2}
					dot={{
						fill: "hsl(var(--chart-1))",
					}}
					activeDot={{
						r: 6,
					}}
				/>
			</LineChart>
		</ChartContainer>
	);
}
