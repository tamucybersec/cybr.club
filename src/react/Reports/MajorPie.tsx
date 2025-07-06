import {
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { useContext, useMemo } from "react";
import type { CategoricalData } from "../types";
import LabelledPieChart from "../Charts/LabelledPieChart";
import { useActiveUsers } from "@/hooks/useTable";
import { DashboardContext } from "@/scripts/context";

function MajorPie() {
	const { terms } = useContext(DashboardContext);
	const active = useActiveUsers(terms);

	const { data } = useMemo(() => {
		const counts: Record<string, number> = {};

		for (const user of active) {
			if (user.major === "") continue;
			counts[user.major] ??= 0;
			counts[user.major] += 1;
		}

		const data: CategoricalData[] = Object.entries(counts).map(
			([major, count]) => ({
				label: major,
				count: count,
			})
		);

		return { data };
	}, [active]);

	return (
		<>
			<CardContent className="grow">
				<LabelledPieChart
					data={data}
					title={"Total Recorded"}
				/>
			</CardContent>
			<CardFooter className="flex justify-center text-sm">
				<span className="font-bold">{Object.keys(data).length}</span>
				&nbsp;Different Major
				{Object.keys(data).length > 1 ? "s" : ""}
			</CardFooter>
		</>
	);
}

export default MajorPie;
