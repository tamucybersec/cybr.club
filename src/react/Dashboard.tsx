import Login from "./Login";
import { fetchPath, type Status } from "@/scripts/dashboardConnection";
import { CredentialsContext, DashboardContext } from "@/scripts/context";
import { useState } from "react";
import AppSidebar from "./AppSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Dashboard() {
	const [key, setKey] = useState<CryptoKey | undefined>();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState<Status>("NONE");

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
			value={{ fetchPath: fetchPathAbstraction, status }}
		>
			<CredentialsContext.Provider
				value={{
					key,
					setKey,
					username,
					setUsername,
					password,
					setPassword,
					status,
					setStatus,
				}}
			>
				<Login />
			</CredentialsContext.Provider>
			<QueryClientProvider client={queryClient}>
				{status !== "NONE" && status !== "DENIED" && <AppSidebar />}
			</QueryClientProvider>
		</DashboardContext.Provider>
	);
}

export default Dashboard;
