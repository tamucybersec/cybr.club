import { Variants, HTMLMotionProps } from "framer-motion";

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.1,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 15 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.2,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

const titleVariants: Variants = {
	hidden: { opacity: 0, y: 15 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.2,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

export function revealOnScroll(variants: Variants): HTMLMotionProps<"div"> {
	return {
		variants,
		initial: "hidden",
		whileInView: "visible",
		viewport: { once: true, amount: 0.1, margin: "100px" },
	};
}

export { containerVariants, itemVariants, titleVariants };
