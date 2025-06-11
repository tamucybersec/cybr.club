import { useContext, useEffect, useState } from "react";
import { CredentialsContext } from "@/scripts/context";
import { fetchKey, fetchPath } from "@/scripts/dashboardConnection";
import { authenticated, encryptCredentials } from "@/scripts/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PermissionLevel } from "./types";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";

function Login() {
	const {
		setKey,
		setUsername,
		setPassword,
		permissionLevel,
		setPermissionLevel,
	} = useContext(CredentialsContext);
	const [usernameText, setUsernameText] = useState("");
	const [passwordText, setPasswordText] = useState("");

	useEffect(() => {
		async function loadSecrets() {
			try {
				const { secrets } = await import("@/scripts/secrets");
				setUsernameText(secrets.username);
				setPasswordText(secrets.password);
			} catch {
				// do nothing
			}
		}

		loadSecrets();
	}, []);

	const { status, data: key } = useQuery<CryptoKey>({
		queryKey: ["public", "key"],
		queryFn: fetchKey,
	});

	// get the authentication level of the user and store the encrypted credentials
	async function authenticate() {
		setKey(key);

		const { username, password } = await encryptCredentials(
			key!,
			usernameText,
			passwordText
		);

		const { perms } = await fetchPath<{ perms: PermissionLevel }>(
			"/login",
			{},
			{
				username,
				password,
			}
		);

		const permsLevel: PermissionLevel = perms;
		if (authenticated(permsLevel)) {
			setUsername(username);
			setPassword(password);
		} else {
			toast.error("Invalid Credentials");
		}
		setPermissionLevel(permsLevel);
	}

	return (
		<div
			className={`flex justify-center h-screen items-center ${
				authenticated(permissionLevel) ? "hidden" : ""
			}`}
		>
			<div className="flex flex-col max-w-screen-lg max-h-min gap-4 border p-4 rounded">
				<h1 className="text-white">Login</h1>
				<Input
					placeholder="username"
					type="text"
					value={usernameText}
					onChange={(e) => setUsernameText(e.target.value)}
				/>
				<Input
					placeholder="password"
					type="password"
					value={passwordText}
					onChange={(e) => setPasswordText(e.target.value)}
				/>
				<Button
					onClick={authenticate}
					variant={"outline"}
					disabled={status === "pending"}
				>
					{status === "pending" ? (
						<>
							<LoaderCircleIcon className="animate-spin" />
							Loading...
						</>
					) : (
						"Log In"
					)}
				</Button>
			</div>
		</div>
	);
}

export default Login;
