"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Permissions, type SetState } from "../lib/types";
import Image from "next/image";

interface Props {
	token: string;
	setToken: SetState<string>;
	permission: Permissions | undefined;
	login: () => void;
}

function Login({ token, setToken, permission, login }: Props) {
	return (
		<div className="w-dvw h-dvh flex justify-center items-center text-center">
			<div className="flex flex-col gap-4">
				<div className="max-w-[300px] border border-white p-4 rounded">
					<h1 className="text-xl font-bold grow">
						Texas A&M Cybersecurity Club Dashboard
					</h1>
				</div>
				<div className="max-w-[300px] border border-white p-4 rounded">
					<Image
						src={"/images/club-logos/white-shield.svg"}
						alt="Club Logo"
						width={300}
						height={300}
						unoptimized
					/>
				</div>
				<div className="max-w-[300px] border border-white p-4 rounded flex flex-col gap-4">
					{permission === Permissions.NONE && (
						<p className="text-destructive">
							The provided token is either{" "}
							<span className="font-bold">incorrect</span>,{" "}
							<span className="font-bold">expired</span>, or has
							been <span className="font-bold">revoked</span>.
							Please contact an officer if this is incorrect or if
							you need further assistance.
						</p>
					)}
					<div className="flex flex-col gap-4">
						<Input
							type="password"
							placeholder="Token"
							value={token}
							onChange={(ev) => setToken(ev.target.value)}
						></Input>
						<Button onClick={login}>Login</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
