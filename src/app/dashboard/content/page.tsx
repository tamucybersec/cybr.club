"use client";

import { useContext } from "react";
import { DashboardContext } from "@/lib/context";
import { authenticated } from "@/lib/auth";

export default function ContentPage() {
	const { permission } = useContext(DashboardContext);
	if (!authenticated(permission)) return null;

	return (
		<>
			<h1 className="text-2xl font-semibold">Content Manager</h1>
			<p className="text-sm text-muted-foreground">
				Sign in with GitHub to edit website content. Your GitHub
				repository permissions determine whether you can make changes.
			</p>
			<iframe
				title="Sveltia Content Manager"
				src="/dashboard/content/editor"
				className="w-full min-h-[600px] h-[calc(100dvh-14rem)] rounded-md border bg-white"
			/>
		</>
	);
}
