import { motion } from "framer-motion";
import Image from "next/image";
import { ActivityGroup } from "@/data/activityGroups";
import { itemVariants } from "@/lib/animVariants";
import ActivityGroupInfo from "./ActivityGroupInfo";
import LearnMoreButton from "./LearnMoreButton";

interface Props {
	group: ActivityGroup;
	handleLearnMore: (id: number) => void;
}

function MobileActivityGroup({ group, handleLearnMore }: Props) {
	return (
		<motion.div
			className="rounded-md border border-white/10 p-6 bg-neutral-950"
			variants={itemVariants}
		>
			<div className="w-full h-32 rounded mb-6 relative aspect-video">
				<Image
					className="object-contain p-2"
					src={group.image}
					alt={group.title}
					fill
					unoptimized
				/>
			</div>

			<ActivityGroupInfo
				variant="mobile"
				group={group}
			/>

			<div className="mt-4">
				<LearnMoreButton onClick={() => handleLearnMore(group.id)} />
			</div>
		</motion.div>
	);
}

export default MobileActivityGroup;
