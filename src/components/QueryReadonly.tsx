import { DashboardContext } from "@/lib/context";
import { useContext, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { QueryResponse } from "@/lib/types";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

function QueryReadonly() {
	const { fetchPath } = useContext(DashboardContext);
	const [result, setResult] = useState<QueryResponse>({
		columns: [],
		rows: [],
	});
	const [query, setQuery] = useState("");

	async function makeQuery() {
		try {
			const res: QueryResponse = await fetchPath("/query/readonly", {
				params: { sql: query },
			});
			setResult(res);
		} catch (e: any) {
			toast.error(e.message);
		}
	}

	const QueryTable = () => (
		<Table>
			<TableHeader>
				<TableRow>
					{result.columns.map((col, i) => (
						<TableHead key={`${col}_${i}`}>{col}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{result.rows.map((row, i) => (
					<TableRow key={i}>
						{result.columns.map((col, i) => (
							<TableCell key={`${col}_${i}`}>
								{row[col]}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4 max-w-3xl">
				<Textarea
					placeholder="Type your SQLite query here."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				></Textarea>
				<Button onClick={makeQuery}>Query</Button>
			</div>
			<div>
				<h3 className="text-xl font-bold">Result</h3>
				{result.columns.length > 0 ? (
					<QueryTable />
				) : (
					<div>No results yet.</div>
				)}
			</div>
		</div>
	);
}

export default QueryReadonly;
