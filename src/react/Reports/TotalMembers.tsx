import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useUsers } from "@/hooks/useTable";
import { useMemo } from "react";

function TotalMembers() {
	const { users } = useUsers();

	const { total } = useMemo(() => {
		const total = Object.keys(users ?? {}).length;
		return { total };
	}, [users]);

	return (
		<Card className="grow">
			<CardContent className="flex justify-center">
				<p className="text-4xl font-bold pb-0">
					{total.toLocaleString()}
				</p>
			</CardContent>
			<CardFooter className="flex justify-center">
				Total Members
			</CardFooter>
		</Card>
	);
}

export default TotalMembers;
