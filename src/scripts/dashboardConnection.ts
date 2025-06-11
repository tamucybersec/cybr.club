import type { Credentials } from "@/react/types";
import { API_URL } from "./constants";
import { importKey } from "./auth";
import { ok } from "./fetchUtils";

export async function fetchPath<T>(
	path: string,
	params: Record<string, any>,
	credentials: Credentials
): Promise<T> {
	const res = await ok(
		fetch(`${API_URL}${path}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...params, credentials }),
		})
	);
	const json = await res.json();
	return json;
}

export async function fetchKey() {
	const res = await fetch(`${API_URL}/key`, {
		method: "GET",
	});

	const { key } = await res.json();
	return await importKey(key);
}
