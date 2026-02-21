import { Permissions, type Options } from "@/lib/types";
import { createContext } from "react";

export const DashboardContext = createContext<{
	fetchPath: (path: string, options?: Options) => Promise<any>;
	permission: Permissions;
}>({
	fetchPath: () => {
		throw new Error("Function was not defined.");
	},
	permission: Permissions.NONE,
});
