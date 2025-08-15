"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { photos } from "@/data/photos";

// first row items
const firstRowItems = [
	{
		id: 1,
		...photos.ciscoSoyjak,
	},
	{
		id: 2,
		...photos.informational,
	},
	{
		id: 3,
		...photos.paloWomenPanelists,
	},
	{
		id: 4,
		...photos.fallSocial,
	},
	{
		id: 5,
		...photos.paloWomenStudents,
	},
	{
		id: 6,
		...photos.mimic,
	},
];

// second row items
const secondRowItems = [
	{
		id: 7,
		...photos.ists,
	},
	{
		id: 8,
		...photos.ciscoGigEm,
	},
	{
		id: 9,
		...photos.colbyMasterChef,
	},
	{
		id: 10,
		...photos.ciscoHuge,
	},
	{
		id: 11,
		...photos.ciscoSmile,
	},
	{
		id: 12,
		...photos.panel2025,
	},
];

function SliderRow({
	items,
	direction = "left",
}: {
	items: typeof firstRowItems;
	direction?: "left" | "right";
}) {
	const [hoveredItem, setHoveredItem] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Duplicate items for seamless looping - memoized
	const duplicatedItems = useMemo(() => [...items, ...items, ...items], [items]);

	// Use CSS animations instead of Framer Motion for better performance
	const animationClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";

	return (
		<div className="relative overflow-hidden carousel-container">
			<div
				ref={containerRef}
				className={`flex items-center gap-2 ${animationClass}`}
				style={{
					width: `${duplicatedItems.length * 680}px`, // Updated for larger desktop images (38rem ≈ 608px + gap)
				}}
			>
				{duplicatedItems.map((item, index) => (
					<div
						key={`${item.id}-${index}`}
						className="relative flex-shrink-0 w-[38rem] h-[25rem] lg:w-[38rem] lg:h-[25rem] md:w-96 md:h-64 sm:w-[17.5rem] sm:h-[10.9375rem] group cursor-pointer rounded-lg overflow-hidden bg-[#171717] border border-white/10 hover:border-white/20 transition-colors duration-300"
						onMouseEnter={() => setHoveredItem(item.id)}
						onMouseLeave={() => setHoveredItem(null)}
					>
						{/* Background gradient */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/3 to-white/8" />
						
						{/* Image */}
						<Image
							src={item.path}
							alt={item.title}
							fill
							priority={index < 4} // Prioritize first 4 visible images (fewer fit on screen now)
							loading={index < 4 ? "eager" : "lazy"}
							sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 384px, 608px" // Updated for larger desktop size
							className="object-cover"
							quality={80}
						/>

						{/* Hover overlay - only show when hovered */}
						{hoveredItem === item.id && (
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 animate-fade-in">
								<h3 className="text-white text-lg font-ubuntu-sans font-medium mb-2">
									{item.title}
								</h3>
								<p className="text-white/90 text-sm font-ubuntu-sans leading-relaxed">
									{item.description}
								</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default function ImageCarousel() {
	return (
		<div className="w-full space-y-4">
			{/* Reserve fixed height to prevent layout shift */}
			<div className="h-[25rem] lg:h-[25rem] md:h-64 sm:h-[10.9375rem]">
				{/* First slider - moving left */}
				<SliderRow items={firstRowItems} direction="left" />
			</div>
			
			<div className="h-[25rem] lg:h-[25rem] md:h-64 sm:h-[10.9375rem]">
				{/* Second slider - moving right */}
				<SliderRow items={secondRowItems} direction="right" />
			</div>
		</div>
	);
}