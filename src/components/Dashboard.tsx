"use client";

import { DashboardContext } from "@/lib/context";
import { useState } from "react";
import AppSidebar from "./AppSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Permissions, type Options, type Term } from "../lib/types";
import { authenticated, useLogin } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { fetchPath } from "@/lib/fetchUtils";
import Login from "./Login";
import { defaultTerms } from "@/lib/helpers";

function Dashboard() {
	const [token, setToken] = useState<string>("");
	const [permission, setPermission] = useState<Permissions | undefined>(
		undefined
	);
	const [terms, setTerms] = useState<[Term, Term]>(defaultTerms());

	const login = useLogin((tok, perm) => {
		setToken(tok);
		setPermission(perm);
	});

	async function fetchPathAbstraction(path: string, options?: Options) {
		return await fetchPath(token, path, options);
	}

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60 * 5,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<DashboardContext.Provider
				value={{
					fetchPath: fetchPathAbstraction,
					permission: permission!,
					terms,
					setTerms,
				}}
			>
				<Toaster
					richColors
					position="top-center"
				/>
				{authenticated(permission) ? (
					<AppSidebar />
				) : (
					<Login
						token={token}
						setToken={setToken}
						permission={permission}
						login={() => login(token)}
					/>
				)}
			</DashboardContext.Provider>
		</QueryClientProvider>
	);
}

export default Dashboard;
