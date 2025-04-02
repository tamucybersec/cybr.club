import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEvents } from "@/hooks/useTable";
import { useMemo } from "react";

function TotalEvents() {
	const events = useEvents();

	const { total } = useMemo(() => {
		const total = Object.keys(events ?? {}).length;
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
				Total Events
			</CardFooter>
		</Card>
	);
}

export default TotalEvents;
