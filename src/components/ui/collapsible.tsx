import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import React from "react";

function Collapsible({
	...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
	return (
		<CollapsiblePrimitive.Root
			data-slot="collapsible"
			{...props}
		/>
	);
}

const CollapsibleTrigger = React.forwardRef<
	React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
	React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ ...props }, ref) => {
	return (
		<CollapsiblePrimitive.CollapsibleTrigger
			ref={ref}
			data-slot="collapsible-trigger"
			{...props}
		/>
	);
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

function CollapsibleContent({
	...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
	return (
		<CollapsiblePrimitive.CollapsibleContent
			data-slot="collapsible-content"
			{...props}
		/>
	);
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
