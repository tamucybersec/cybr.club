import Login from "./Login";
import { fetchPath, type Status } from "@/scripts/dashboardConnection";
import { CredentialsContext, DashboardContext } from "@/scripts/context";
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Report from "./Report";
import Sidebar from "./Sidebar";

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
			{status !== "NONE" && status !== "DENIED" && (
				<SidebarProvider>
					<Sidebar />
					<div>
						<SidebarTrigger />
						<Report />
					</div>
				</SidebarProvider>
			)}
		</DashboardContext.Provider>
	);
}

export default Dashboard;
