import { Permissions } from "@/lib/types";
import { API_URL } from "./constants";
import { useEffect } from "react";

export function useLogin(
	callback: (token: string, permission: Permissions) => void,
	setIsLoading?: (loading: boolean) => void,
	setError?: (error: string | undefined) => void
) {
	async function login(tok?: string) {
		// set the loading to true in case we are logging in manually
		setIsLoading?.(true);
		setError?.(undefined);

		const token = (tok ?? localStorage.getItem("token")) || "";
		const usingLocalStorage = tok === undefined;

		if (!token) {
			// will always be false, don't bother to fetch
			setIsLoading?.(false);
			return;
		}

		try {
			const resp = await fetch(
				`${API_URL}/login?${new URLSearchParams({ token })}`
			);
			if (!resp.ok) {
				setError?.(
					"The dashboard API could not complete login. Please try again."
				);
				return;
			}
			const permission = Number(await resp.text());
			if (
				!Number.isInteger(permission) ||
				!Object.values(Permissions).includes(permission)
			) {
				setError?.(
					"The dashboard API returned an unexpected login response. Please try again."
				);
				return;
			}
			if (permission === Permissions.NONE && usingLocalStorage) {
				// don't display an error message unless they
				// login themselves with an incorrect token
				return;
			}

			callback(token, permission);

			if (permission !== Permissions.NONE) {
				localStorage.setItem("token", token);
			}
		} catch {
			setError?.(
				`Cannot connect to the dashboard API at ${API_URL}. Check that CyberHam is running and allows this website's origin, then try again.`
			);
		} finally {
			setIsLoading?.(false);
		}
	}

	// try to login immediately using localStorage
	useEffect(() => {
		login();
	}, []);

	return login;
}

export function authenticated(permission: Permissions | undefined) {
	return permission !== undefined && permission !== Permissions.NONE;
}

export function sufficientPermissions(
	current: Permissions,
	required: Permissions
) {
	return current >= required;
}
