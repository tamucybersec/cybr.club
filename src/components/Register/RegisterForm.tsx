"use client";

import { getCurrentYear, zodFile, zodTamuEmail } from "@/lib/helpers";
import { MAJORS } from "@/lib/majors";
import { useForm, type Resolver } from "react-hook-form";
import { z, type ZodTypeAny } from "zod";

interface Details {
	title: string;
	field: string;
	type: ZodTypeAny;
	description?: string;
	file?: boolean;
	dropdown?: string[];
}
[];

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
			1 << 20,
			"1MiB"
		),
		description:
			"Upload your resume here to allow our recruiters to personally scout you. Don't worry if you don't have your resume on you, you can run /register at any time to update your information.",
		file: true,
	},
];

export function registerForm(customMajorText: string) {
	const formSchema = z.object(
		Object.fromEntries(details.map(({ field, type }) => [field, type]))
	);

	const customResolver: Resolver<z.infer<typeof formSchema>> = async (
		values
	) => {
		const result = formSchema.safeParse(values);
		const errors: Record<string, any> = {};

		if (!result.success) {
			for (const issue of result.error.issues) {
				errors[issue.path[0]] = {
					type: "zod",
					message: issue.message,
				};
			}
		}

		if (
			["Graduate", "Other"].includes(values.major) &&
			!customMajorText.trim()
		) {
			errors.customMajor = {
				type: "manual",
				message: `Please specify your ${
					values.major === "Graduate" ? "research area" : "major"
				}.`,
			};
		}

		return {
			values: result.success ? result.data : {},
			errors,
		};
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: customResolver,
		defaultValues: Object.fromEntries(
			details
				.filter(({ dropdown, file }) => !dropdown && !file)
				.map(({ field }) => [field, ""])
		),
	});

	return { formSchema, form };
}
