import { Button } from "@/components/ui/button";

interface Props {
	onClick: () => void;
}

function LearnMoreButton({ onClick }: Props) {
	return (
		<Button
			variant="outline"
			className="text-sm font-ubuntu-sans px-4 py-2 h-auto bg-transparent border border-white/40 text-white hover:bg-transparent hover:border-white/70 transition-all duration-30 rounded-md cursor-pointer"
			onClick={onClick}
		>
			Learn More
		</Button>
	);
}

export default LearnMoreButton;
