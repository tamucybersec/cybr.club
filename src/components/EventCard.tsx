import React from "react";

interface EventCardProps {
	date: string;
	time: string;
	title: string;
	location: string;
	description: string;
	isPast?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
	date,
	time,
	title,
	location,
	description,
	isPast = false,
}) => {
	return (
		<div
			className={`flex items-start gap-4 p-4 border transition-colors ${
				isPast
					? "bg-zinc-900/30 border-zinc-800/50"
					: "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
			}`}
		>
			<div className="min-w-[80px]">
				<div
					className={`text-sm font-mono ${isPast ? "text-zinc-300" : "text-zinc-200"}`}
				>
					{date}
				</div>
				<div
					className={`text-xs font-mono mt-1 ${isPast ? "text-zinc-400" : "text-zinc-300"}`}
				>
					{time}
				</div>
			</div>
			<div className="flex-1">
				<h4
					className={`font-medium mb-1 ${isPast ? "text-zinc-300" : "text-white"}`}
				>
					{title}
				</h4>
				<p
					className={`text-sm mb-2 ${isPast ? "text-zinc-500" : "text-zinc-400"}`}
				>
					{location}
				</p>
				<p
					className={`text-sm ${isPast ? "text-zinc-600" : "text-zinc-500"}`}
				>
					{description}
				</p>
			</div>
		</div>
	);
};

export default EventCard;
