import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import type { CategoricalData } from "../types";
import { useCategoricalChart } from "@/hooks/useCategoricalChart";
import { validHtmlId } from "@/scripts/helpers";
import { basicFormatter } from "./chartHelpers";

interface Props {
	metric: string;
	data: CategoricalData[];
}

export default function CategoricalBarChart({ metric, data }: Props) {
	const { config, coloredData } = useCategoricalChart(data);

	return (
		<ChartContainer
			config={config}
			className="max-h-[400px]"
		>
			<BarChart
				accessibilityLayer
				data={coloredData}
				layout="vertical"
			>
				<YAxis
					dataKey="label"
					type="category"
					tickLine={false}
					width={110}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) =>
						config[validHtmlId(value) as keyof typeof config]
							?.label as string
					}
				/>
				<XAxis
					dataKey="count"
					type="number"
					hide
				/>
				<ChartTooltip
					cursor={true}
					content={
						<ChartTooltipContent
							formatter={basicFormatter({ metric })}
						/>
					}
				/>
				<Bar
					dataKey="count"
					layout="vertical"
					radius={5}
				/>
			</BarChart>
		</ChartContainer>
	);
}
