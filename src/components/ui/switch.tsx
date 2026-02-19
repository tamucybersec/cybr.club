"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SwitchProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
	({ className, checked = false, onCheckedChange, ...props }, ref) => {
		return (
			<button
				ref={ref}
				type="button"
				role="switch"
				aria-checked={checked}
				data-state={checked ? "checked" : "unchecked"}
				onClick={() => onCheckedChange?.(!checked)}
				className={cn(
					"peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
					"disabled:cursor-not-allowed disabled:opacity-50",
					checked ? "bg-primary" : "bg-input",
					className
				)}
				{...props}
			>
				<span
					data-state={checked ? "checked" : "unchecked"}
					className={cn(
						"pointer-events-none block h-5 w-5 rounded-full bg-background ring-0 transition-transform",
						checked ? "translate-x-5" : "translate-x-0"
					)}
				/>
			</button>
		);
	}
);
Switch.displayName = "Switch";

export { Switch };
