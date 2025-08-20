import type { ChartConfig } from "@/components/ui/chart";
import type { CategoricalData, ColoredCategoricalData } from "@/lib/types";
import { getChartColor, validHtmlId } from "@/lib/helpers";
import { useMemo } from "react";

export function useCategoricalChart(data: CategoricalData[]) {
	return useMemo(() => {
		const total = data.reduce((acc, { count }) => acc + count, 0);
		const coloredData: ColoredCategoricalData[] = data.map((item) => ({
			...item,
			fill: `var(--color-${validHtmlId(item.label)})`,
		}));
		const config: ChartConfig = {};

		data.forEach((item, index) => {
			config[validHtmlId(item.label)] = {
				label: item.label,
				color: getChartColor(index),
			};
		});

		return { config, coloredData, total };
	}, [data]);
}
