import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { X } from "lucide-react";
import { ActivityGroup } from "@/data/activityGroups";

interface Props {
	selectedGroup: ActivityGroup | null;
	onClose: () => void;
}

function ActivityGroupModal({ selectedGroup, onClose }: Props) {
	return (
		<AnimatePresence>
			{selectedGroup && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

					<motion.div
						className="relative bg-white/20 backdrop-blur-xl border border-white/20 rounded-lg p-8 max-w-md w-full"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={onClose}
							className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
						>
							<X size={24} />
						</button>
						<p className="text-white font-azonix text-2xl leading-relaxed pr-8">
							{selectedGroup.title}
						</p>
						<p className="text-white font-ubuntu-sans text-lg leading-relaxed pr-8">
							{selectedGroup.modalContent}
						</p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default ActivityGroupModal;
