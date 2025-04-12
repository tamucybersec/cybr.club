import Login from "./Login";
import { fetchPath } from "@/scripts/dashboardConnection";
import { CredentialsContext, DashboardContext } from "@/scripts/context";
import { useState } from "react";
import AppSidebar from "./AppSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PermissionLevel } from "./types";
import { authenticated, encrypt } from "@/scripts/auth";
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

	async function validatePassword(pass: string): Promise<boolean> {
		const enc = await encrypt(key!, pass);
		return (await fetchPathAbstraction("/validate/", {
			password: enc,
		})) as boolean;
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
					validatePassword,
					permissionLevel,
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
						permissionLevel,
						setPermissionLevel,
					}}
				>
					<Login />
				</CredentialsContext.Provider>
				{authenticated(permissionLevel) && <AppSidebar />}
			</DashboardContext.Provider>
		</QueryClientProvider>
	);
}

export default Dashboard;
