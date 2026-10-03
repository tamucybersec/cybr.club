"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
	campaignQuery,
	GOATCOUNTER_URL,
	prepareTracker,
	PUBLIC_PATHS,
	safeReferrer,
} from "@/lib/analytics";

export default function AnalyticsTracker() {
	const pathname = usePathname().replace(/\/$/, "") || "/";
	const search = useSearchParams();
	const campaign = campaignQuery(search.toString());
	const [ready, setReady] = useState(false);
	const lastView = useRef<string>();
	const publicPage = PUBLIC_PATHS.includes(pathname);
	useEffect(() => {
		if (!publicPage) {
			lastView.current = undefined;
			return;
		}
		if (!ready || !GOATCOUNTER_URL) return;
		const key = `${pathname}?${campaign}`;
		if (lastView.current === key) return;
		try {
			window.goatcounter?.count({
				path: pathname,
				title: pathname,
				referrer: safeReferrer(document.referrer),
			});
			lastView.current = key;
		} catch {
			/* A blocked tracker must not affect the site. */
		}
	}, [pathname, campaign, ready, publicPage]);
	if (!GOATCOUNTER_URL || !publicPage) return null;
	return (
		<Script
			id="goatcounter"
			src={`${GOATCOUNTER_URL}/count.js`}
			data-goatcounter={`${GOATCOUNTER_URL}/count`}
			data-goatcounter-settings='{"no_onload":true,"no_events":true}'
			strategy="afterInteractive"
			onReady={() => {
				prepareTracker();
				setReady(true);
			}}
		/>
	);
}
