import type { Method, Options } from "@/react/types";
import { API_URL } from "./constants";

export async function ok(res: Promise<Response>): Promise<Response> {
	const r = await res;

	if (!r.ok) {
		let _details: string, _error: string;
		try {
			const { error, detail, details } = await r.json();
			
			if (error === undefined) {
				_error = "Error";
			} else {
				_error = error;
			}

			if (details === undefined) {
				_details = detail;
			} else {
				_details = details;
			}
		} catch (error) {
			throw new Error(
				`Fetch was not ok with status ${r.status}. See console for details.`
			);
		}
		throw new Error(`${_error}${_details ? `: ${_details}` : ""}`);
	}

	return r;
}

export async function fetchPath<T>(
	token: string,
	path: string,
	options?: Options
): Promise<T> {
	const url = `${API_URL}${path}`;
	const Authorization = `Bearer ${token}`;
	const method: Method = options?.method || "POST";
	const params = options?.params ?? {};

	const res = await ok(
		method === "GET"
			? getRequest(url, Authorization)
			: postRequest(url, Authorization, params)
	);
	const json = await res.json();

	return json;
}

async function getRequest(url: string, Authorization: string) {
	return fetch(url, {
		method: "GET",
		headers: {
			Authorization,
		},
	});
}

async function postRequest(
	url: string,
	Authorization: string,
	params: Record<string, any>
) {
	return fetch(url, {
		method: "POST",
		headers: {
			Authorization,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(params),
	});
}
