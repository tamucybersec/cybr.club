"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Image from "next/image";

// first row items
const firstRowItems = [
	{
		id: 1,
		title: "First Row Title 1",
		description: "First row description 1",
		image: "/images/general/cisco-soyjak.jpg",
	},
	{
		id: 2,
		title: "First Row Title 2",
		description: "First row description 2",
		image: "/images/general/informational.jpg",
	},
	{
		id: 3,
		title: "First Row Title 3",
		description: "First row description 3",
		image: "/images/general/palo-women-panelists.png",
	},
	{
		id: 4,
		title: "First Row Title 4",
		description: "First row description 4",
		image: "/images/general/unknown-contest.jpg",
	},
	{
		id: 5,
		title: "First Row Title 5",
		description: "First row description 5",
		image: "/images/general/palo-women-students.png",
	},
	{
		id: 6,
		title: "First Row Title 6",
		description: "First row description 6",
		image: "/images/general/mimic.jpg",
	},
];

// second row items
const secondRowItems = [
	{
		id: 7,
		title: "Second Row Title 1",
		description: "Second row description 1",
		image: "/images/general/ists.jpg",
	},
	{
		id: 8,
		title: "Second Row Title 2",
		description: "Second row description 2",
		image: "/images/general/cisco-gig-em.jpg",
	},
	{
		id: 9,
		title: "Second Row Title 3",
		description: "Second row description 3",
		image: "/images/general/colby-halo-mama.jpg",
	},
	{
		id: 10,
		title: "Second Row Title 4",
		description: "Second row description 4",
		image: "/images/general/cisco-huge.jpg",
	},
	{
		id: 11,
		title: "Second Row Title 5",
		description: "Second row description 5",
		image: "/images/general/cisco-smile.jpg",
	},
	{
		id: 12,
		title: "Second Row Title 6",
		description: "Second row description 6",
		image: "/images/general/panel-2025.jpg",
	},
];

function SliderRow({
	items,
	direction = "left",
	startOffset = 0,
}: {
	items: typeof firstRowItems;
	direction?: "left" | "right";
	startOffset?: number;
}) {
	const controls = useAnimation();
	const [hoveredItem, setHoveredItem] = useState<number | null>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const x = useMotionValue(startOffset);

	// Duplicate items for seamless looping
	const duplicatedItems = [...items, ...items, ...items]; // looped 3 times

	const startAnimation = useCallback(() => {
		if (!carouselRef.current) return;

		const totalWidth = carouselRef.current.scrollWidth / 3; // distance travelled- may need to adjust

		if (direction === "left") {
			// Moving left (negative direction)
			controls.start({
				x: -totalWidth,
				transition: {
					duration: 40, // SPEED OF TRANSITION
					ease: "linear",
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "loop",
				},
			});
		} else {
			// Moving right (positive direction) - start from negative position
			x.set(-totalWidth);
			controls.start({
				x: 0,
				transition: {
					duration: 40,
					ease: "linear",
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "loop",
				},
			});
		}
	}, [controls, x, direction]);

	useEffect(() => {
		// Small delay to ensure proper mounting
		const timer = setTimeout(() => {
			startAnimation();
		}, 100);

		return () => clearTimeout(timer);
	}, [startAnimation]);

	const handleItemHover = (itemId: number) => {
		setHoveredItem(itemId);
	};

	const handleItemHoverEnd = () => {
		setHoveredItem(null);
	};

	return (
		<div className="relative overflow-hidden">
			<motion.div
				ref={carouselRef}
				className="flex py-4 sm:py-6 items-stretch -mx-0.5 slider-row"
				animate={controls}
				style={{ x }}
			>
				{duplicatedItems.map((item, index) => (
					<motion.div
						key={`${item.id}-${index}`}
						className="relative flex-shrink-0 group cursor-pointer mx-0.5 slider-item"
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: { delay: index * 0.05 },
						}}
						onHoverStart={() => handleItemHover(item.id)}
						onHoverEnd={handleItemHoverEnd}
					>
						<div className="relative w-full h-full rounded-lg overflow-hidden bg-[#171717] border border-white/10 transition-all duration-300 group-hover:border-white/20">
							{/* Placeholder background */}
							<div className="w-full h-full bg-gradient-to-br from-white/3 to-white/8">
								<Image
									src={item.image}
									alt={item.title}
									fill
									className="object-cover"
								/>
							</div>

							{/* Hover overlay with information */}
							<motion.div
								className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-6 pointer-events-none"
								initial={{ opacity: 0 }}
								animate={{
									opacity: hoveredItem === item.id ? 1 : 0,
								}}
								transition={{ duration: 0.3 }}
							>
								<h3 className="text-white text-base sm:text-lg lg:text-xl font-ubuntu-sans font-medium mb-2">
									{item.title}
								</h3>
								<p className="text-white/90 text-xs sm:text-sm lg:text-base font-ubuntu-sans leading-relaxed">
									{item.description}
								</p>
							</motion.div>
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}

export default function ModernSlider() {
	return (
		<div className="w-full space-y-0 sm:space-y-[-2rem]">
			{/* First slider - moving left */}
			<SliderRow
				items={firstRowItems}
				direction="left"
				startOffset={0}
			/>

			{/* Second slider - moving right, different content */}
			<SliderRow
				items={secondRowItems}
				direction="right"
				startOffset={0}
			/>
		</div>
	);
}
