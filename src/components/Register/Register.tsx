"use client";

import { MAJORS } from "@/data/majors";
import { useEffect, useState, type ReactElement } from "react";
import { z } from "zod";
import type { Resume, User } from "../../lib/types";
import { API_URL } from "@/lib/constants";
import { toast } from "sonner";
import { ok } from "@/lib/fetchUtils";
import LoadingPage from "../LoadingPage";
import CenteredMessage from "../CenteredMessage";
import { Toaster } from "@/components/ui/sonner";
import RegisterForm from "./RegisterRender";
import { formSchema, useRegisterForm } from "./RegisterForm";

interface RegisterResult {
	name: string;
	grad_semester: string;
	grad_year: number;
	major: string;
	email: string;
	resume?: File;
}

async function profileOrDefaults(
	ticket: string | null
): Promise<{ user: User; resume: Resume | null } | null> {
	const resp = await fetch(`${API_URL}/self/${ticket}`);
	if (!resp.ok) {
		return null;
	}
	const body = await resp.json();
	// backend returns { user: {...}, resume: {...} }
	return {
		user: body.user as User,
		resume: body.resume ? (body.resume as Resume) : null,
	};
}

function Register() {
	const [originalUser, setOriginalUser] = useState<User | undefined | null>(
		undefined
	);
	const [resumeInfo, setResumeData] = useState<Resume | null>(null);
	const [selectedMajor, setSelectedMajor] = useState("");
	const [customMajorText, setCustomMajorText] = useState("");
	const [completeMessage, setCompleteMessage] = useState<string | undefined>(
		undefined
	);

	const { form } = useRegisterForm(customMajorText);

	useEffect(() => {
		async function getUserInfo() {
			const url = new URL(window.location.href);
			const ticket = url.searchParams.get("ticket");
			const profileResult = await profileOrDefaults(ticket);

			if (profileResult === null) {
				setOriginalUser(null);
				setResumeData(null);
				return;
			}

			form.reset(profileResult.user);
			const [major, custom] = profileResult.user.major?.split(":") ?? [];
			if (MAJORS.includes(major)) {
				setSelectedMajor(major);
				if (major === "Graduate" || major === "Other") {
					setCustomMajorText(custom ?? "");
				}
				form.trigger("major");
			}

			setOriginalUser(profileResult.user);
			setResumeData(profileResult.resume); // still null if they don't have a resume uploaded
		}

		getUserInfo();
	}, []);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const submit = async (): Promise<void> => {
			const finalMajor =
				["Graduate", "Other"].includes(values.major) &&
				customMajorText.trim()
					? `${values.major}:${customMajorText.trim()}`
					: values.major;

			const result: RegisterResult = {
				...(values as RegisterResult),
				major: finalMajor,
			};
			const resume = result.resume;
			delete result["resume"];

			const formData = new FormData();
			formData.append(
				"user_json",
				JSON.stringify({
					...originalUser,
					...result,
				})
			);
			if (resume) {
				formData.append("resume", resume);
			}
			console.log(formData);

			const url = new URL(window.location.href);
			const ticket = url.searchParams.get("ticket");
			const res = await ok(
				fetch(`${API_URL}/register/${ticket}`, {
					method: "POST",
					body: formData,
				})
			);

			const json = await res.json();
			const message = json.message ?? "";
			setCompleteMessage(message);
		};

		toast.promise(submit, {
			loading: "Registering...",
			error: (e: Error) =>
				`${e?.message ?? "An error occurred. Please try again."}`,
			duration: Infinity,
			dismissible: true,
		});
	};

	let display: ReactElement;
	if (completeMessage !== undefined) {
		display = (
			<CenteredMessage
				title={"Registration Successful!"}
				message={completeMessage}
			/>
		);
	} else if (originalUser === undefined) {
		// not loaded yet
		display = <LoadingPage />;
	} else if (originalUser === null) {
		// registration invalid
		display = (
			<CenteredMessage
				title={"Invalid Registration Link"}
				message={`Your registration may have expired.<br/>Please use /register again.`}
			/>
		);
	} else {
		// valid registration
		display = (
			<RegisterForm
				form={form}
				onSubmit={onSubmit}
				majorState={[selectedMajor, setSelectedMajor]}
				customMajorState={[customMajorText, setCustomMajorText]}
				resumeInfo={resumeInfo}
			/>
		);
	}

	return (
		<>
			<Toaster
				richColors
				position="top-center"
			/>
			{display}
		</>
	);
}

export default Register;
