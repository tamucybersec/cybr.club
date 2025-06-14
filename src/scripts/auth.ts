import { Permissions } from "@/react/types";
import { API_URL } from "./constants";
import { useEffect } from "react";

export async function useLogin(
	callback: (token: string, permission: Permissions) => void
) {
	useEffect(() => {
		async function login() {
			const url = new URL(location.href);
			const token = url.searchParams.get("token") || "";
			const resp = await fetch(`${API_URL}/login?token=${token}`);

			if (!resp.ok) {
				callback(token, Permissions.NONE);
			} else {
				const permission = await resp.text();
				callback(token, parseInt(permission));

				// leads to bad UX: refreshing is annoying
				// url.searchParams.delete("token");
				// history.replaceState({}, "", url.toString());
			}
		}

		login();
	}, []);
}

export function authenticated(permission: Permissions) {
	return permission !== Permissions.NONE;
}

export function sufficientPermissions(
	current: Permissions,
	required: Permissions
) {
	return current >= required;
}
