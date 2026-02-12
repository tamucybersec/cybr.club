import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ActivityGroup } from "@/data/activityGroups";
import { itemVariants } from "@/lib/animVariants";
import ActivityGroupInfo from "./ActivityGroupInfo";
import LearnMoreButton from "./LearnMoreButton";

interface Props {
	group: ActivityGroup;
	handleLearnMore: (id: number) => void;
}

function DesktopActivityGroup({ group, handleLearnMore }: Props) {
	const [hoveredItem, setHoveredItem] = useState<number | null>(null);

	return (
		<motion.div
			className="relative h-64 md:h-80 lg:h-96 group"
			variants={itemVariants}
			onHoverStart={() => setHoveredItem(group.id)}
			onHoverEnd={() => setHoveredItem(null)}
		>
			<div className="w-full h-full rounded-md border border-white/10 transition-all duration-300 group-hover:border-white/20 overflow-hidden relative bg-neutral-950">
				<div className="w-full h-full p-4 relative aspect-square bg-neutral-950">
					<Image
						className="object-contain p-16"
						src={group.image}
						alt={group.title}
						fill
						unoptimized
					/>
				</div>

				{/* Hover overlay */}
				<motion.div
					className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent flex flex-col justify-between p-6"
					initial={{ opacity: 0 }}
					animate={{
						opacity: hoveredItem === group.id ? 1 : 0,
					}}
					transition={{ duration: 0.3 }}
				>
					<ActivityGroupInfo
						variant="desktop"
						group={group}
					/>

					<div className="flex justify-end">
						<LearnMoreButton
							onClick={() => handleLearnMore(group.id)}
						/>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}

export default DesktopActivityGroup;
