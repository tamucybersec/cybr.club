export function useDownload(name: string, json: any) {
	return () => {
		const str = JSON.stringify(json);
		const blob = new Blob([str], { type: "application/json" });
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = `${name}.json`;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};
}
