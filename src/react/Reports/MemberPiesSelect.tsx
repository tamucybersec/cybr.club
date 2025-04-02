import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import GradYearPie from "./GradYearPie";
import MajorPie from "./MajorPie";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { getCurrentYear } from "@/scripts/helpers";

function MemberPiesSelect() {
	type Pies = "Graduation Year" | "Major";
	const types: Pies[] = ["Graduation Year", "Major"];
	const [selected, setSelected] = useState<Pies>("Graduation Year");
	const currentYear = getCurrentYear();

	function select() {
		return (
			<Select onValueChange={(v) => setSelected(v as Pies)}>
				<SelectTrigger>
					<SelectValue
						placeholder={selected}
						defaultValue={selected}
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{types.map((t, i) => (
							<SelectItem key={i} value={t}>{t}</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		);
	}

	return (
		<Card className="grow-4">
			<CardHeader className="flex flex-col justify-center items-center">
				<CardTitle className="flex gap-2 items-center">
					Members by {select()}
				</CardTitle>
				<CardDescription>{currentYear} Onwards</CardDescription>
			</CardHeader>
			{selected === "Graduation Year" ? <GradYearPie /> : <MajorPie />}
		</Card>
	);
}

export default MemberPiesSelect;
