import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEvents } from "@/hooks/useTable";
import { DashboardContext } from "@/scripts/context";
import { multipleTerms } from "@/scripts/helpers";
import { useContext, useMemo } from "react";

function TotalEvents() {
	const { terms } = useContext(DashboardContext);
	const { events } = useEvents();

	const { total } = useMemo(() => {
		const total = events.length;
		return { total };
	}, [events]);

	return (
		<Card className="grow">
			<CardContent className="flex justify-center">
				<p className="text-4xl font-bold pb-0">
					{total.toLocaleString()}
				</p>
			</CardContent>
			<CardFooter className="flex justify-center">
				Total Events{" "}
				{multipleTerms(terms) ? "these Semesters" : "this Semester"}
			</CardFooter>
		</Card>
	);
}

export default TotalEvents;
