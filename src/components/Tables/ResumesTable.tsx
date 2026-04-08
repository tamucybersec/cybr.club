"use client";

// imports here
import { z } from "zod";
import type { Definition } from "../DataTable/DataTableTypes";
import { QUERY_KEYS, type Resume } from "@/lib/types";
import { sortDates, zodBoolean } from "@/lib/helpers";
import DataTable from "@/components/DataTable/DataTable";
import ResumeVerification from "@/components/resumeVerification";
import { Button } from "../ui/button";

const definition: Definition<Resume>[] = [
	{
		primaryKey: true,
		accessorKey: "user_id",
		header: "User ID",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "filename",
		header: "File Name",
		sortable: true,
		type: z.string(), // filename & format should be nonempty, but we have some old data in there. revisit later
	},
	{
		accessorKey: "format",
		header: "File Format",
		sortable: true,
		type: z.string(),
	},
	{
		accessorKey: "upload_date",
		header: "Upload Date",
		sortable: true,
		type: z.date(),
		other: {
			sortingFn: sortDates<Resume>("upload_date"),
		},
	},
	{
		accessorKey: "is_valid",
		header: "verified",
		cell: (row) => {
			const user_id = row.getValue<string>("user_id");
			const verified = row.getValue<boolean>("is_valid");
			return (
				<ResumeVerification
					user_id={user_id}
					asChild
				>
					<Button
						variant={"outline"}
						size="sm"
					>
						{verified}
					</Button>
				</ResumeVerification>
			);
		},
		sortable: true,
		type: zodBoolean,
	},
];

function ResumesTable() {
	return (
		<DataTable<Resume>
			prefix="resumes"
			queryKey={QUERY_KEYS.resumes}
			definition={definition}
			defaultValues={{
				user_id: "",
				filename: "",
				format: "",
				upload_date: "",
				is_valid: false,
			}}
		/>
	);
}

export default ResumesTable;
