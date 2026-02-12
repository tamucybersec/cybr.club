"use client";

import Container from "@/components/Container";
import { motion } from "framer-motion";
import { useState } from "react";
import { activityGroups } from "@/data/activityGroups";
import DesktopActivityGroup from "./DesktopActivityGroup";
import MobileActivityGroup from "./MobileActivityGroup";
import { containerVariants, revealOnScroll } from "@/lib/animVariants";
import ActivityGroupModal from "./ActivityGroupModal";
import ActivityGroupsHeader from "./ActivityGroupsHeader";

function ActivityGroups() {
	const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

	const selectedGroup =
		activityGroups.find((g) => g.id === selectedGroupId) ?? null;
	const openGroupModal = (groupId: number) => setSelectedGroupId(groupId);
	const closeGroupModal = () => setSelectedGroupId(null);

	return (
		<>
			<Container
				paddingX="double"
				paddingY="regular"
			>
				<ActivityGroupsHeader />
				<motion.div
					className="hidden md:grid grid-cols-2 gap-6 lg:gap-8"
					{...revealOnScroll(containerVariants)}
				>
					{activityGroups.map((group) => (
						<DesktopActivityGroup
							key={group.id}
							group={group}
							handleLearnMore={openGroupModal}
						/>
					))}
				</motion.div>
				<motion.div
					className="md:hidden space-y-6"
					{...revealOnScroll(containerVariants)}
				>
					{activityGroups.map((group) => (
						<MobileActivityGroup
							key={group.id}
							group={group}
							handleLearnMore={openGroupModal}
						/>
					))}
				</motion.div>
			</Container>
			<ActivityGroupModal
				selectedGroup={selectedGroup}
				onClose={closeGroupModal}
			/>
		</>
	);
}

export default ActivityGroups;
