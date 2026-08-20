const titles: {
	content: string;
	probability: number;
}[] = [
	{
		content:
			"Nice %device% u got there.<br/>Would be a shame if it got hacked.",
		probability: 0.1,
	},
	{
		content: "QRiosity killed the cat",
		probability: 0.2,
	},
	{
		content: "The ducks are free at Aggie Park.",
		probability: 0.1,
	},
	{
		content: "Don't worry, your passwords are still safe.<br/>For now.",
		probability: 0.1,
	},
	{
		content: "Downloading virus...<br/>Just kidding! Or am I?",
		probability: 0.2,
	},
	{
		content: "You might want to change ur passwords...",
		probability: 0.1,
	},
	{
		content: "Your device is now a Russian crypto farm.",
		probability: 0.2,
	},
];

export function getTitle(): string {
	const num = Math.random();

	let total = 0;
	for (const { content, probability } of titles) {
		total += probability;
		if (num <= total) {
			return content;
		}
	}

	return titles[0].content;
}
