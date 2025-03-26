import { createContext } from "react";
import type { Status } from "./dashboardConnection";

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
	status: Status;
	setStatus: Set<Status>;
}

export const CredentialsContext = createContext<CredentialsContextType>({
	key: undefined,
	setKey: unimplemented,
	username: "",
	setUsername: unimplemented,
	password: "",
	setPassword: unimplemented,
	status: "NONE",
	setStatus: unimplemented,
});

export const DashboardContext = createContext<{
	fetchPath: (
		path: string,
		params?: Record<string, any>
	) => Promise<Record<string, any>>;
	status: Status;
}>({
	fetchPath: () => {
		throw new Error("Function was not defined.");
	},
	status: "NONE",
});
