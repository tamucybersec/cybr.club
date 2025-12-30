"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getCurrentYear, zodFile, zodTamuEmail } from "@/lib/helpers";
import { MAJORS } from "@/data/majors";
import { z, type ZodTypeAny } from "zod";
import type { FormType, ReactState, User } from "../../lib/types";

interface Details {
	title: string;
	field: string;
	type: ZodTypeAny;
	description?: string;
	file?: boolean;
	dropdown?: string[];
}

const details: Details[] = [
	{
		title: "Full Name",
		field: "name",
		type: z.string().nonempty("Please provide a name"),
	},
	{
		title: "Estimated Graduation Semester",
		field: "grad_semester",
		type: z
			.string()
			.transform((v) => v.toLocaleLowerCase())
			.pipe(
				z.enum(["spring", "summer", "fall", "winter"], {
					message:
						"Valid semesters include 'Spring', 'Summer', 'Fall', and 'Winter'",
				})
			),
	},
	{
		title: "Estimated Graduation Year",
		field: "grad_year",
		type: z.coerce
			.number({ message: "Expected a number" })
			.min(getCurrentYear() - 4, {
				message: `Please specify a year later than ${
					getCurrentYear() - 5
				}. If you need special accommodations, please contact an officer`,
			})
			.max(getCurrentYear() + 8, {
				message: `Please specify a year earlier than ${
					getCurrentYear() + 8
				}. If you need special accommodations, please contact an officer`,
			}),
	},
	{
		title: "Major",
		field: "major",
		type: z.string().nonempty({ message: "Please select a major." }),
		dropdown: MAJORS,
		description:
			"If you are a graduate student, please select 'Graduate'. If your major is not listed, please select 'Other'.",
	},
	{
		title: "TAMU Email",
		field: "email",
		type: zodTamuEmail,
	},
	{
		title: "Resume (Optional)",
		field: "resume",
		type: zodFile(
			[
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			],
			5 << 20,
			"5MiB"
		),
		description:
			"Upload your resume here to allow our recruiters to personally scout you. Don't worry if you don't have your resume on you, you can run /register at any time to update your information.",
		file: true,
	},
];

interface Props {
	form: FormType;
	onSubmit: (result: any) => void;
	majorState: ReactState<string>;
	customMajorState: ReactState<string>;
	// used to show existing resume info
	// prop rather than state bc they don't need to change after initial load; only the next time they register
	originalUser?: User;
	resumeUploadedAt?: string;
}

export function RegisterRender({
	form,
	onSubmit,
	majorState,
	customMajorState,
	originalUser,
	resumeUploadedAt,
}: Props) {
	const [selectedMajor, setSelectedMajor] = majorState;
	const [customMajorText, setCustomMajorText] = customMajorState;

	const renderInputField = (title: string, fieldProps: any) => (
		<Input
			placeholder={title}
			{...fieldProps}
		/>
	);

	const renderDropdownField = (options: string[], fieldProps: any) => {
		console.log("Dropdown value:", fieldProps.value);
		return (
			<Select
				onValueChange={(val) => {
					fieldProps.onChange(val);
					setSelectedMajor(val);
					if (!["Graduate", "Other"].includes(val)) {
						setCustomMajorText("");
					}
				}}
				value={fieldProps.value}
			>
				<SelectTrigger
					className="w-full"
					aria-invalid={!!form.formState.errors.major}
				>
					<SelectValue placeholder="Select an option" />
				</SelectTrigger>
				<SelectContent className="max-w-[calc(100vw-1rem)]">
					{options.map((opt) => (
						<SelectItem
							key={opt}
							value={opt}
						>
							{opt}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
	};

	const renderFileField = (fieldProps: any) => (
		<Input
			type="file"
			accept=".pdf,.doc,.docx"
			onChange={(e) => fieldProps.onChange(e.target.files?.[0])}
		/>
	);

	const renderCustomMajorField = () => (
		<FormItem>
			<FormLabel
				className={
					!!form.formState.errors.customMajor
						? "text-destructive"
						: ""
				}
			>
				Specify your{" "}
				{selectedMajor === "Graduate" ? "Research Area" : "Major"}
			</FormLabel>
			<FormControl>
				<Input
					aria-invalid={!!form.formState.errors.customMajor}
					placeholder={
						selectedMajor === "Graduate"
							? "e.g. Cybersecurity"
							: "e.g. Agricultural Leadership"
					}
					value={customMajorText}
					onChange={(e) => {
						form.clearErrors("customMajor");
						setCustomMajorText(e.target.value);
					}}
				/>
			</FormControl>
			{form.formState.errors.customMajor && (
				<p className="text-sm text-destructive">
					{form.formState.errors.customMajor.message as string}
				</p>
			)}
		</FormItem>
	);

	const renderForm = ({
		title,
		field,
		dropdown,
		description,
		file,
	}: Details) => (
		<div
			key={field}
			className="flex flex-col space-y-6"
		>
			<FormField
				control={form.control}
				name={field}
				render={({ field: fieldProps }) => {
					let control;
					if (dropdown) {
						control = renderDropdownField(dropdown, fieldProps);
					} else if (file) {
						control = renderFileField(fieldProps);
					} else {
						control = renderInputField(title, fieldProps);
					}

					return (
						<FormItem>
							<FormLabel>{title}</FormLabel>
							<FormControl>{control}</FormControl>
							{field === "resume" &&
							originalUser?.resume_filename ? (
								<div className="mt-1 text-sm text-white">
									{originalUser.resume_filename}
									{resumeUploadedAt &&
									!isNaN(
										new Date(resumeUploadedAt).getTime()
									) ? (
										<>
											{" "}
											— last uploaded{" "}
											{new Date(
												resumeUploadedAt
											).toLocaleString()}
										</>
									) : null}
								</div> // only show if they have an existing resume
							) : null}
							{description && (
								<FormDescription>{description}</FormDescription>
							)}
							<FormMessage />
						</FormItem>
					);
				}}
			/>

			{field === "major" &&
				["Graduate", "Other"].includes(selectedMajor) &&
				renderCustomMajorField()}
		</div>
	);

	return (
		<div className="flex flex-col items-center py-6 px-2 space-y-6">
			<h1 className="text-3xl font-bold">Register</h1>
			<div className="max-w-lg">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						{details.map((detail) => renderForm(detail))}
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}

export default RegisterRender;
