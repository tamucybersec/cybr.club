import Login from "./Login";
import { fetchPath } from "@/scripts/dashboardConnection";
import { CredentialsContext, DashboardContext } from "@/scripts/context";
import { useState } from "react";
import AppSidebar from "./AppSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PermissionLevel } from "./types";
import { authenticated } from "@/scripts/auth";
import { Toaster } from "@/components/ui/sonner";

function Dashboard() {
	const [key, setKey] = useState<CryptoKey | undefined>();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [permissionLevel, setPermissionLevel] = useState<PermissionLevel>(
		PermissionLevel.NONE
	);

	async function fetchPathAbstraction(
		path: string,
		params: Record<string, any> = {}
	) {
		return await fetchPath(path, params, { username, password });
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
		<DashboardContext.Provider
			value={{
				fetchPath: fetchPathAbstraction,
				permissionLevel: permissionLevel,
			}}
		>
			<Toaster
				richColors
				position="top-center"
			/>
			<CredentialsContext.Provider
				value={{
					key,
					setKey,
					username,
					setUsername,
					password,
					setPassword,
					permissionLevel: permissionLevel,
					setPermissionLevel: setPermissionLevel,
				}}
			>
				<Login />
			</CredentialsContext.Provider>
			<QueryClientProvider client={queryClient}>
				{authenticated(permissionLevel) && <AppSidebar />}
			</QueryClientProvider>
		</DashboardContext.Provider>
	);
}

export default Dashboard;
