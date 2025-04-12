import { PermissionLevel } from "@/react/types";
import { createContext } from "react";

type Set<T> = React.Dispatch<React.SetStateAction<T>>;

function unimplemented() {
	throw new Error("Function was not defined.");
}

interface CredentialsContextType {
	key: CryptoKey | undefined;
	setKey: Set<CryptoKey | undefined>;
	username: string;
	setUsername: Set<string>;
	password: string;
	setPassword: Set<string>;
	permissionLevel: PermissionLevel;
	setPermissionLevel: Set<PermissionLevel>;
}

export const CredentialsContext = createContext<CredentialsContextType>({
	key: undefined,
	setKey: unimplemented,
	username: "",
	setUsername: unimplemented,
	password: "",
	setPassword: unimplemented,
	permissionLevel: PermissionLevel.NONE,
	setPermissionLevel: unimplemented,
});

export const DashboardContext = createContext<{
	fetchPath: (path: string, params?: Record<string, any>) => Promise<any>;
	validatePassword: (password: string) => Promise<boolean>;
	permissionLevel: PermissionLevel;
}>({
	fetchPath: () => {
		throw new Error("Function was not defined.");
	},
	validatePassword: () => {
		throw new Error("Function was not defined.");
	},
	permissionLevel: PermissionLevel.NONE,
});
