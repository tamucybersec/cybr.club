interface Props {
	title: string;
	message: string;
}

function CenteredMessage({ title, message }: Props) {
	return (
		<div className="flex flex-col w-dvw h-dvh flex justify-center items-center text-center">
			<div className="p-4 border rounded flex flex-col gap-2">
				<h1 className="text-2xl">{title}</h1>
				<p dangerouslySetInnerHTML={{ __html: message }}></p>
			</div>
		</div>
	);
}

export default CenteredMessage;
