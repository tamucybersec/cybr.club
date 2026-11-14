"use client";

import { useContext, useEffect } from "react";
import { DashboardContext } from "@/lib/context";
import { authenticated } from "@/lib/auth";

export default function ContentEditorPage() {
	const { permission } = useContext(DashboardContext);
	const canAccess = authenticated(permission);

	useEffect(() => {
		if (!canAccess) return;

		// An explicit target lets developers test production auth on localhost
		// or use the test repository on a preview deployment.
		const target = process.env.NEXT_PUBLIC_CMS_TARGET;
		const isLoopback = ["localhost", "127.0.0.1", "[::1]"].includes(
			window.location.hostname
		);
		const useTestRepo =
			target === "test" || (target !== "production" && isLoopback);

		const config = document.createElement("link");
		config.rel = "cms-config-url";
		config.type = "text/yaml";
		config.href = new URL(
			useTestRepo ? "/admin/config.local.yml" : "/admin/config.yml",
			window.location.origin
		).href;
		document.head.appendChild(config);

		// Defer loading until React's development effect cleanup has run.
		// Sveltia mounts into nc-root, keeping its DOM separate from React's.
		const script = document.createElement("script");
		script.src = "https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js";
		const timer = window.setTimeout(
			() => document.body.appendChild(script),
			0
		);
		return () => {
			window.clearTimeout(timer);
			config.remove();
			script.remove();
		};
	}, [canAccess]);

	return canAccess ? <div id="nc-root" /> : null;
}
