import { useContext, useEffect, useState } from "react";
import { CredentialsContext } from "../scripts/context";
import {
	fetchKey,
	fetchPath,
	type Status,
} from "../scripts/dashboardConnection";
import { encryptCredentials } from "../scripts/crypto";

function Login() {
	const { key, setKey, setUsername, setPassword, setStatus } =
		useContext(CredentialsContext);
	const [usernameText, setUsernameText] = useState("");
	const [passwordText, setPasswordText] = useState("");

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

		const status: Status = perms;
		if (status !== "NONE" && status !== "DENIED") {
			setUsername(username);
			setPassword(password);
		}
		setStatus(status);
	}

	return (
		<div>
			<h1 className="text-white">Login</h1>
			<input
				type="text"
				value={usernameText}
				onChange={(e) => setUsernameText(e.target.value)}
			></input>
			<input
				type="text"
				value={passwordText}
				onChange={(e) => setPasswordText(e.target.value)}
			></input>
			<button onClick={authenticate}>Log In</button>
		</div>
	);
}

export default Login;
