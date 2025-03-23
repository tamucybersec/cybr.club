import Login from "./Login";
import { fetchPath, type Status } from "../scripts/dashboardConnection";
import { CredentialsContext, DashboardContext } from "../scripts/context";
import { useState } from "react";
import Report from "./Report";

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
		<div>
			<DashboardContext.Provider
				value={{ fetchPath: fetchPathAbstraction }}
			>
				{status === "NONE" || status === "DENIED" ? (
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
				) : (
					<>
						<Report />
					</>
				)}
			</DashboardContext.Provider>
		</div>
	);
}

export default Dashboard;
