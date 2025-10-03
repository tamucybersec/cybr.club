import React, { ReactNode } from "react";
import { capitalize, formatMajor } from "@/lib/helpers";

import {
	BriefcaseBusinessIcon,
	GraduationCapIcon,
	MailCheckIcon,
	MailQuestionMarkIcon,
	NotebookIcon,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { User } from "@/lib/types";

interface Props {
	userInfo: User;
}

function PersonalInfo({ userInfo }: Props) {
	const InfoRow = ({
		icon,
		children,
	}: {
		icon: ReactNode;
		children: ReactNode;
	}) => (
		<div className="flex items-center gap-2">
			{icon}
			{children}
		</div>
	);

	return (
		<div className="flex flex-col gap-2">
			<InfoRow
				icon={
					<FontAwesomeIcon
						icon={faDiscord}
						width={18}
					/>
				}
			>
				{userInfo.user_id}
			</InfoRow>
			<InfoRow
				icon={
					userInfo.verified ? (
						<MailCheckIcon size={18} />
					) : (
						<MailQuestionMarkIcon size={18} />
					)
				}
			>
				{userInfo.email}
			</InfoRow>
			{userInfo.major && (
				<InfoRow icon={<NotebookIcon size={18} />}>
					{formatMajor(userInfo.major)}
				</InfoRow>
			)}
			<InfoRow icon={<GraduationCapIcon size={18} />}>
				{capitalize(userInfo.grad_semester)} {userInfo.grad_year}
			</InfoRow>
			<InfoRow icon={<BriefcaseBusinessIcon size={18} />}>
				{userInfo.resume_format
					? `Uploaded ${userInfo.resume_format.toUpperCase()} Resume`
					: "No Resume Uploaded"}
			</InfoRow>
		</div>
	);
}

export default PersonalInfo;
