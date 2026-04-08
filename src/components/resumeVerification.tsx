"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { API_URL } from "@/lib/constants";

// can't use our fetch utils bcs these aren't jsons
async function fetchBlob(url: string): Promise<Blob> {
	const token = localStorage.getItem("token") || "";
	const resp = await fetch(url, {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!resp.ok) throw Error("Failed to fetch resume");
	return resp.blob();
}

// fix backend handling first
async function validate() {}
async function reject() {}

function ResumeContent({
	user_id,
	onVerify,
	onReject,
}: {
	user_id: string;
	onVerify: () => void;
	onReject: () => void;
}) {
	const [pdfURL, setPdfURL] = useState<string>("");

	useEffect(() => {
		let objectURL: string | null = null;

		fetchBlob(`${API_URL}/resumes/${user_id}`)
			.then((blob) => {
				objectURL = URL.createObjectURL(blob);
				setPdfURL(objectURL);
			})
			.catch((err) => console.error("Failed to load resume:", err));
		console.log(pdfURL);

		return () => {
			if (objectURL) URL.revokeObjectURL(pdfURL); // discard w/ user_id update
		};
	}, [user_id]);

	return (
		<>
			<div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
				<iframe
					title="Resume Preview for verification"
					src={pdfURL} // figure this out next
					className="w-full h-[70vh] border rounded"
				></iframe>
			</div>
			<DialogFooter>
				<Button
					onClick={onVerify}
					variant="default"
				>
					Verify
				</Button>
				<Button
					onClick={onReject}
					variant="destructive"
				>
					Reject
				</Button>
			</DialogFooter>
		</>
	);
}

function ResumeVerification({
	user_id,
	asChild,
	children,
}: {
	user_id: string;
	asChild?: boolean;
	children: ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (open) {
			setLoaded(true);
		}
	}, [open]);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
			<DialogContent className="max-w-4xl">
				{loaded ? (
					<ResumeContent
						user_id={user_id}
						onVerify={validate}
						onReject={reject}
					/>
				) : (
					<>
						<DialogTitle>Loading Resume ...</DialogTitle>
						<DialogDescription>
							Fetching the resume for this user
						</DialogDescription>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default ResumeVerification;
