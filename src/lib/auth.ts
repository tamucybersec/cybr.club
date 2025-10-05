import { Permissions } from "@/lib/types";
import { API_URL } from "./constants";
import { useEffect } from "react";

export function useLogin(
	callback: (token: string, permission: Permissions) => void,
	setIsLoading?: (loading: boolean) => void
) {
	async function login(tok?: string) {
		setIsLoading?.(true)

		const token = (tok ?? localStorage.getItem("token")) || "";
		const usingLocalStorage = tok === undefined;

		if (usingLocalStorage) {
			// if logging in automatically, don't show that you tried to login
			setIsLoading?.(false)
		}

		if (!token) {
			// will always be false, don't bother to fetch
			setIsLoading?.(false);
			return;
		}

		const resp = await fetch(`${API_URL}/login?token=${token}`);

		if (!resp.ok) {
			callback(token, Permissions.NONE);
			setIsLoading?.(false)
		} else {
			const permission = parseInt(await resp.text());
			if (permission === Permissions.NONE && usingLocalStorage) {
				// don't display an error message unless they
				// login themselves with an incorrect token
				setIsLoading?.(false)
				return;
			}

			callback(token, permission);

			if (permission !== Permissions.NONE) {
				localStorage.setItem("token", token);
			} else {
				setIsLoading?.(false)
			}
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
