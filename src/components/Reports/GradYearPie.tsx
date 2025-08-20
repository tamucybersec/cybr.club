"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { useContext, useMemo } from "react";
import { useActiveUsers } from "@/hooks/useTable";
import type { CategoricalData } from "../../lib/types";
import LabelledPieChart from "../Charts/LabelledPieChart";
import { DashboardContext } from "@/lib/context";

export default function GradYearPie() {
	const { terms } = useContext(DashboardContext);
	const active = useActiveUsers(terms);

	const { data } = useMemo(() => {
		const counts: Record<string, number> = {};

		for (const user of active) {
			if (user.grad_year <= 0) continue;
			counts[user.grad_year] ??= 0;
			counts[user.grad_year] += 1;
		}

		const data: CategoricalData[] = Object.entries(counts).map(
			([year, count]) => ({
				label: year,
				count: count,
			})
		);

		return { data };
	}, [active]);

	return (
		<>
			<CardContent className="grow justify-center">
				<LabelledPieChart
					data={data}
					title={"Total Recorded"}
				/>
			</CardContent>
			<CardFooter className="flex justify-center text-sm">
				<span className="font-bold">{Object.keys(data).length}</span>
				&nbsp;Different Year
				{Object.keys(data).length > 1 ? "s" : ""}
			</CardFooter>
		</>
	);
}
