import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAttendance, useUsers } from "@/hooks/useTable";
import { useMemo } from "react";
import type { User } from "../types";

function TopMembersList() {
	const { users } = useUsers();
	const { attendanceByUser } = useAttendance();

	const numberOfUsers = 10;
	const top: User[] = useMemo(() => {
		return (users ?? [])
			.toSorted(
				(a, b) =>
					(attendanceByUser[b.user_id] ?? []).length -
					(attendanceByUser[a.user_id] ?? []).length
			)
			.slice(0, numberOfUsers);
	}, [users, attendanceByUser]);

	return (
		<Card className="grow">
			<CardHeader>
				<CardTitle>Top Members</CardTitle>
				<CardDescription>
					Top members are calculated by the number of events they have
					attended this semester.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="flex flex-col max-h-[350px] -mx-4 px-4">
					<div className="flex flex-col gap-4">
						{top.map(({ user_id, name, grad_year }, index) => (
							<Card
								key={index}
								className="bg-background"
							>
								<CardHeader>
									<CardTitle>{name}</CardTitle>
									<CardDescription>
										Class of {grad_year}
									</CardDescription>
								</CardHeader>
								<CardContent>
									Attended{" "}
									<span className="font-bold">
										{(
											attendanceByUser[user_id] ?? []
										).length.toLocaleString()}
									</span>{" "}
									events
								</CardContent>
							</Card>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}

export default TopMembersList;
