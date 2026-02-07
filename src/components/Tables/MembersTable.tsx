"use client";

import { z } from "zod";
import DataTable from "../DataTable/DataTable";
import type { Definition } from "../DataTable/DataTableTypes";
import {
	QUERY_KEYS,
	type User,
	type Resume,
	type MemberListItem,
} from "../../lib/types";
import { sortDates, zodBoolean, zodTamuEmail } from "@/lib/helpers";
import { Button } from "../ui/button";
import ProfileViewer from "../Profile/ProfileViewer";
import { useContext } from "react";
import { DashboardContext } from "@/lib/context";

const definition: Definition<MemberListItem>[] = [
	{
		primaryKey: true,
		accessorKey: "user_id",
		header: "User ID",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: (row) => {
			const user_id = row.getValue<string>("user_id");
			const name = row.getValue<string>("name");
			return (
				<ProfileViewer
					user_id={user_id}
					asChild
				>
					<Button
						variant={"outline"}
						size="sm"
					>
						{name}
					</Button>
				</ProfileViewer>
			);
		},
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "grad_semester",
		header: "Grad Semester",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "grad_year",
		header: "Grad Year",
		sortable: true,
		type: z.coerce.number().min(0),
	},
	{
		accessorKey: "major",
		header: "Major",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "email",
		header: "Email",
		sortable: true,
		type: zodTamuEmail,
	},
	{
		accessorKey: "verified",
		header: "Verified",
		sortable: true,
		type: zodBoolean,
	},
	{
		accessorKey: "join_date",
		header: "Join Date",
		sortable: true,
		type: z.string().nonempty(),
		other: {
			sortingFn: sortDates<MemberListItem>("join_date"),
		},
	},
	{
		accessorKey: "notes",
		header: "Notes",
		sortable: true,
		type: z.string(),
	},

	{
		accessorKey: "resume_upload_date", // only data guaranteed even for old uploads
		header: "Has Resume",
		cell: (row) => {
			// rendering "Yes" or "No"
			const upload_date = row.getValue<string>("resume_upload_date");
			const hasResume = upload_date && upload_date !== "";
			return <>{hasResume ? "Yes" : "No"}</>;
		},
		sortable: true,
		type: z.string(),
		other: {
			sortingFn: (rowA, rowB) => {
				// see if they're empty
				const hasResumeA = Boolean(
					rowA.getValue<string>("resume_upload_date")
				);
				const hasResumeB = Boolean(
					rowB.getValue<string>("resume_upload_date")
				);
				// A is empty, B - A = 1. B is empty, B - A = -1
				return Number(hasResumeB) - Number(hasResumeA);
			},
		},
	},
];

function MembersTable() {
	const { fetchPath } = useContext(DashboardContext);

	const onGet = async (): Promise<MemberListItem[]> => {
		const [users, resumes] = await Promise.all([
			// fetch users and resumes.
			fetchPath("/users", { method: "GET" }) as Promise<User[]>,
			fetchPath("/resumes", { method: "GET" }) as Promise<Resume[]>,
		]);
		const resumesByUserID = Object.fromEntries(
			resumes.map((resume) => [resume.user_id, resume])
		);

		// join users & resumes
		return users.map((user) => {
			const resume = resumesByUserID[user.user_id];
			return {
				...user, // spread syntax joining user vars
				resume_filename: resume?.filename,
				resume_format: resume?.format,
				resume_upload_date: resume?.upload_date,
				resume_is_valid: resume?.is_valid,
			};
		});
	};

	return (
		<DataTable<MemberListItem>
			prefix="users"
			queryKey={QUERY_KEYS.users}
			definition={definition}
			defaultValues={{
				user_id: "",
				name: "",
				grad_semester: "spring",
				grad_year: 0,
				major: "",
				email: "",
				verified: false,
				join_date: "",
				notes: "",
				resume_filename: "",
				resume_format: "",
				resume_upload_date: "",
				resume_is_valid: false,
			}}
			onGet={onGet}
		/>
	);
}

export default MembersTable;
