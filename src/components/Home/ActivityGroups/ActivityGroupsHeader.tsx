import { motion } from "framer-motion";
import {
	revealOnScroll,
	containerVariants,
	titleVariants,
} from "@/lib/animVariants";

function ActivityGroupsHeader() {
	return (
		<>
			<motion.h2
				className="font-azonix text-hero-heading text-center"
				{...revealOnScroll(titleVariants)}
			>
				Activity Groups
			</motion.h2>
			<motion.div
				className="flex flex-col items-center"
				{...revealOnScroll(containerVariants)}
			>
				<motion.p className="font-ubuntu-sans text-hero-button mb-12 lg:mb-16 text-center max-w-lg text-neutral-400">
					Activity Groups will be meeting from Jan. 26 to Apr. 24 for
					Spring 2026. Check our discord for individual updates to
					rooms and times as needed.
				</motion.p>
			</motion.div>
		</>
	);
}

export default ActivityGroupsHeader;
