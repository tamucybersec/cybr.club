import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import { getCurrentYear } from "@/scripts/helpers";
import { useUsers } from "@/hooks/useTable";
import type { CategoricalData } from "../types";
import LabelledPieChart from "../Charts/LabelledPieChart";
import { TrendingUp } from "lucide-react";

function MajorPie() {
	const rawData = useUsers();

	const currentYear = getCurrentYear();
	const { data, newMembers, growth } = useMemo(() => {
		const counts: Record<number, number> = {};

		for (const user of Object.values(rawData ?? [])) {
			if (user.grad_year < currentYear) continue;
			if (user.grad_year in counts) {
				counts[user.grad_year] += 1;
			} else {
				counts[user.grad_year] = 1;
			}
		}

		const lastYear = Object.keys(counts).reduce(
			(max, cur) => (parseInt(cur) > max ? parseInt(cur) : max),
			0
		);
		const newMembers = counts[lastYear] ?? 0;
		const lastNewMembers = counts[lastYear - 1] ?? 0;
		const growth = (newMembers / lastNewMembers) * 100 - 100;
		const data: CategoricalData[] = Object.entries(counts).map(
			([year, count]) => ({
				label: year,
				count: count,
			})
		);

		return { data, newMembers, growth };
	}, [rawData]);

	return (
		<>
			<CardContent className="grow">
				<LabelledPieChart
					data={data}
					title={"Total Members"}
				/>
			</CardContent>
			<CardFooter className="flex flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					<p>TODO</p>
				</div>
				<div className="leading-none text-muted-foreground">
					Metric Not Currently Tracked By Database
				</div>
			</CardFooter>
		</>
	);
}

export default MajorPie;
