"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import type { CategoricalData } from "../../lib/types";
import { useCategoricalChart } from "@/hooks/useCategoricalChart";
import { basicFormatter } from "./chartHelpers";

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
							className="max-w-[200px]"
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
					stroke="var(--chart-1)"
					strokeWidth={2}
					dot={{
						fill: "var(--chart-1)",
					}}
					activeDot={{
						r: 6,
					}}
				/>
			</LineChart>
		</ChartContainer>
	);
}
