import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/images/club-logos/white-shield.png";
import { Permissions, type SetState } from "./types";

interface Props {
	token: string;
	setToken: SetState<string>;
	permission: Permissions | undefined;
	login: () => void;
}

function Login({ token, setToken, permission, login }: Props) {
	return (
		<div className="w-dvw h-dvh flex justify-center items-center text-center">
			<div className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 gap-4">
				<div className="max-w-[300px] border border-white p-4 rounded">
					<img src={Logo.src}></img>
				</div>
				<div className="max-w-[300px] border border-white p-4 rounded flex flex-col gap-4">
					<h1 className="text-xl font-bold grow">
						Texas A&M Cybersecurity Club Dashboard
					</h1>
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
