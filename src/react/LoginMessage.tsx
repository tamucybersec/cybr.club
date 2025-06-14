function LoginMessage() {
	return (
		<div className="w-dvw h-dvh flex justify-center items-center text-center">
			<div className="max-w-[300px] border border-white p-4 rounded">
				The provided login is either{" "}
				<span className="font-bold">incorrect</span>,{" "}
				<span className="font-bold">expired</span>, or has been{" "}
				<span className="font-bold">revoked</span>. Please contact an
				officer if this is incorrect or if you need further assistance.
			</div>
		</div>
	);
}

export default LoginMessage;
