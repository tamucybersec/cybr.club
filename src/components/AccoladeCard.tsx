"use client";

import React from "react";

interface AccoladeCardProps {
	name: string;
	certification: string;
	date: string;
	link: string;
}

const AccoladeCard: React.FC<AccoladeCardProps> = ({
	name,
	certification,
	date,
	link,
}) => {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-start gap-4 p-4 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group rounded-lg"
		>
			<div className="text-zinc-300 text-sm font-mono min-w-[80px]">
				{date}
			</div>
			<div className="flex-1">
				<h4 className="text-white font-medium mb-1 group-hover:text-yellow-500 transition-colors">
					{name}
				</h4>
				<p className="text-zinc-400 text-sm">{certification}</p>
			</div>
			<svg
				className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0 mt-1"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
				/>
			</svg>
		</a>
	);
};

export default AccoladeCard;
