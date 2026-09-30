"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CategoricalLineChart from "../Charts/CategoricalLineChart";
import { useActiveUsers, useUsers } from "@/hooks/useTable";
import { useContext, useMemo, useState } from "react";
import { compareDates } from "@/lib/helpers";
import { DashboardContext } from "@/lib/context";
import { CategoricalData } from "@/lib/types";

function JoinsOverTime() {
	type Membership = "Active" | "Cumulative";

	const { terms } = useContext(DashboardContext);

	const [selectedMembership, setSelectedMembership] =
		useState<Membership>("Cumulative");

	const { users } = useUsers();
	const active = useActiveUsers(terms);
	let members = users;
	if (selectedMembership == "Active") members = active;
	console.log("members as\n", members.length);

	const { data, totalJoins, averageJoins } = useMemo(() => {
		const counts: Record<string, number> = {};
		let totalJoins: number = 0;

		for (const member of members) {
			counts[member.join_date] ??= 0;
			counts[member.join_date] += 1;
			totalJoins += 1;
		}

		const numDates: number = Object.keys(counts).length;
		const averageJoins: number =
			numDates === 0 ? 0 : Math.floor(totalJoins / numDates);

		const data: (CategoricalData & { title: string })[] = Object.entries(
			counts
		)
			.map(([date, count]) => ({
				label: date,
				title: date,
				count: count,
			}))
			.sort((a, b) => compareDates(a.label, b.label));

		return { data, totalJoins, averageJoins };
	}, [members]);

	function select() {
		return (
			<Select
				value={selectedMembership}
				onValueChange={(cat) =>
					setSelectedMembership(cat as Membership)
				}
			>
				<SelectTrigger>
					<SelectValue placeholder={"Select a Membership"} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem
							key="Cumulative"
							value="Cumulative"
						>
							Cumulative
						</SelectItem>
						<SelectItem
							key="Active"
							value="Active"
						>
							Active
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		);
	}

	return (
		<Card>
			<CardHeader className="flex justify-center">
				<CardTitle className="flex gap-4 items-center">
					{select()} Joins Over Time
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CategoricalLineChart
					metric="Joins"
					data={data}
				/>
			</CardContent>
			<CardFooter className="flex flex-col justify-center items-center gap-2">
				<div className="flex items-center gap-2 font-medium leading-none">
					<p>
						<span className="font-bold">{totalJoins}</span> Total
						Joins, <span className="font-bold">{averageJoins}</span>{" "}
						Average Joins
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}

export default JoinsOverTime;
