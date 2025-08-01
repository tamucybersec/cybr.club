"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	useActiveUsers,
} from "@/hooks/useTable";
import { DashboardContext } from "@/lib/context";
import { useContext, useMemo } from "react";
import TooltipText from "../TooltipText";
import { multipleTerms } from "@/lib/helpers";

function TotalMembers() {
	const { terms } = useContext(DashboardContext);
	const active = useActiveUsers(terms);

	const { total } = useMemo(() => {
		const total = active.length;
		return { total };
	}, [active]);

	return (
		<Card className="grow">
			<CardContent className="flex justify-center">
				<p className="text-4xl font-bold pb-0">
					{total.toLocaleString()}
				</p>
			</CardContent>
			<CardFooter className="flex justify-center">
				<TooltipText
					tooltip={
						"Active members are any members that have attended an event outside of informationals and bannering in the selected semesters."
					}
				>
					Active Members
				</TooltipText>
				&nbsp;
				{multipleTerms(terms) ? "these Semesters" : "this Semester"}
			</CardFooter>
		</Card>
	);
}

export default TotalMembers;
