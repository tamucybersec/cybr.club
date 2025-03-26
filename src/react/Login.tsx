import { useContext, useEffect, useState } from "react";
import { CredentialsContext } from "@/scripts/context";
import {
	fetchKey,
	fetchPath,
	type Status,
} from "@/scripts/dashboardConnection";
import { encryptCredentials } from "@/scripts/crypto";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { credentials as secretsCredentials } from "@/scripts/secrets";

function Login() {
	const { key, setKey, setUsername, setPassword, status, setStatus } =
		useContext(CredentialsContext);
	const [usernameText, setUsernameText] = useState(
		secretsCredentials.username || ""
	);
	const [passwordText, setPasswordText] = useState(
		secretsCredentials.password || ""
	);

	// prefetch the public key
	useEffect(() => {
		async function getKey() {
			if (key !== undefined) return;
			setKey(await fetchKey());
		}

		getKey();
	}, []);

	// get the authentication level of the user and store the encrypted credentials
	async function authenticate() {
		let k = key;
		if (k === undefined) {
			k = await fetchKey();
			setKey(k);
		}

		const { username, password } = await encryptCredentials(
			k,
			usernameText,
			passwordText
		);
		const { perms } = await fetchPath(
			"/login/",
			{},
			{
				username,
				password,
			}
		);

		const s: Status = perms;
		if (s !== "NONE" && s !== "DENIED") {
			setUsername(username);
			setPassword(password);
		}
		setStatus(s);
	}

	return (
		<div
			className={`flex justify-center h-screen items-center ${
				status !== "NONE" && status !== "DENIED" ? "hidden" : ""
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
				>
					Log In
				</Button>
			</div>
		</div>
	);
}

export default Login;
