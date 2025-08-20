"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DashboardContext } from "@/lib/context";
import { useContext, useEffect, useMemo, useState } from "react";
import type { Semester, Term } from "../lib/types";
import { compareTerms, prettySemester } from "@/lib/helpers";
import { useEvents } from "@/hooks/useTable";
import { Skeleton } from "@/components/ui/skeleton";

function TermPicker() {
	const { terms, setTerms } = useContext(DashboardContext);
	const [termA, setTermA] = useState(terms[0]);
	const [termB, setTermB] = useState(terms[1]);

	const { groupedEvents } = useEvents();
	const termChoices = useMemo(() => {
		const termChoices: Term[] = [];

		for (const [year, semMap] of Object.entries(groupedEvents)) {
			for (const semester of Object.keys(semMap)) {
				termChoices.push(parseTermKey(`${year}-${semester}`));
			}
		}

		return termChoices.sort((a, b) => -compareTerms(a, b));
	}, [groupedEvents]);

	useEffect(() => {
		if (termChoices.length === 0) return;

		const isValid = (term: Term) =>
			termChoices.some((t) => termKey(t) === termKey(term));

		const a = isValid(termA) ? termA : termChoices[0];
		const b = isValid(termB) ? termB : termChoices[0];

		if (termKey(a) !== termKey(termA) || termKey(b) !== termKey(termB)) {
			setTermA(a);
			setTermB(b);
			setTerms([a, b]);
		}
	}, [termChoices]);

	function termKey(term: Term): string {
		return `${term.year}-${term.semester}`;
	}

	function parseTermKey(key: string): Term {
		const [year, semester] = key.split("-");
		return { year: parseInt(year), semester: semester as Semester };
	}

	function termToString(term: Term): string {
		return `${prettySemester(term.semester)} ${term.year}`;
	}

	const select = (term: Term, setTerm: (term: Term) => void) => {
		const key = termKey(term);

		if (!termChoices.find((t) => termKey(t) === key)) {
			return <Skeleton />;
		}

		return (
			<Select
				value={key}
				onValueChange={(value) => setTerm(parseTermKey(value))}
			>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{termChoices.map((t, i) => (
						<SelectItem
							key={i}
							value={termKey(t)}
						>
							{termToString(t)}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
	};

	function setA(term: Term) {
		if (compareTerms(term, termB) == 1) {
			setTermA(term);
			setTermB(term);
			setTerms([term, term]);
		} else {
			setTermA(term);
			setTerms([term, termB]);
		}
	}

	function setB(term: Term) {
		if (compareTerms(term, termA) == -1) {
			setTermA(term);
			setTermB(term);
			setTerms([term, term]);
		} else {
			setTermB(term);
			setTerms([termA, term]);
		}
	}

	return (
		<div className="border rounded bg-card text-card-foreground p-4 flex gap-4 items-center self-end shrink">
			From {select(termA, setA)} to {select(termB, setB)}
		</div>
	);
}

export default TermPicker;
