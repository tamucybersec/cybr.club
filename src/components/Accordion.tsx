import {
	Accordion as Accord,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

interface Props {
	items: {
		title: ReactNode;
		content: ReactNode;
	}[];
}

function Accordion({ items }: Props) {
	return (
		<Accord type="multiple">
			{items.map((item, i) => (
				<AccordionItem
					value={i.toString()}
					key={i}
				>
					<AccordionTrigger className="font-azonix text-3xl">
						{item.title}
					</AccordionTrigger>
					<AccordionContent>{item.content}</AccordionContent>
				</AccordionItem>
			))}
		</Accord>
	);
}

export default Accordion;
