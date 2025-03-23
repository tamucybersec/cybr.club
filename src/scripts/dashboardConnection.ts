import { API_URL } from "./constants";
import { importKey } from "./crypto";

export type Status = "ADMIN" | "SPONSOR" | "DENIED" | "NONE";
export type Credentials = {
	username: string;
	password: string;
};

export async function fetchPath(
	path: string,
	params: Record<string, any>,
	credentials: Credentials,
): Promise<Record<string, any>> {
	const res = await fetch(`${API_URL}${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...params, credentials: credentials }),
	});

	const json = await res.json();
	return json;
}

export async function fetchKey() {
	const res = await fetch(`${API_URL}/key/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const { key } = await res.json();
	return await importKey(key);
}
