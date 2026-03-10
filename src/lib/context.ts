import {
	Permissions,
	type Options,
	type SetState,
	type Term,
} from "@/lib/types";
import { createContext } from "react";
import { defaultTerms } from "./helpers";

export const DashboardContext = createContext<{
	fetchPath: (path: string, options?: Options) => Promise<any>;
	permission: Permissions;
	terms: [Term, Term];
	setTerms: SetState<[Term, Term]>;
}>({
	fetchPath: () => {
		throw new Error("Function was not defined.");
	},
	permission: Permissions.NONE,
	terms: defaultTerms(),
	setTerms: () => {
		throw new Error("Function was not defined");
	},
});
