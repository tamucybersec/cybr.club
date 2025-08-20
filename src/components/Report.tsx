"use client";

import EventAttendanceOverTime from "./Reports/EventAttendanceOverTime";
import EventBarsSelect from "./Reports/EventBarsSelect";
import MemberPiesSelect from "./Reports/MemberPiesSelect";
import TopEventsList from "./Reports/TopEventsList";
import TopMembersList from "./Reports/TopMembersList";
import TotalEvents from "./Reports/TotalEvents";
import TotalMembers from "./Reports/TotalMembers";
import TermPicker from "./TermPicker";

function Report() {
	return (
		<>
			<div className="flex justify-center mb-4">
				<h1 className="text-5xl font-bold">
					Texas A&M Cybersecurity Club
				</h1>
			</div>
			<TermPicker />
			<div className="flex gap-4 flex-wrap justify-between">
				<TotalMembers />
				<TotalEvents />
			</div>
			<div className="flex gap-4 flex-wrap">
				<MemberPiesSelect />
				<TopMembersList />
			</div>
			<div className="flex gap-4 flex-wrap flex-row-reverse">
				<EventBarsSelect />
				<TopEventsList />
			</div>
			<div>
				<EventAttendanceOverTime />
			</div>
		</>
	);
}

export default Report;
