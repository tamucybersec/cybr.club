import React, { ReactNode, useContext, useEffect, useState } from "react";
import { capitalize, formatMajor } from "@/lib/helpers";

import {
	BriefcaseBusinessIcon,
	GraduationCapIcon,
	AtSign,
	MailCheckIcon,
	MailQuestionMarkIcon,
	NotebookIcon,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { User, Resume } from "@/lib/types";
import { DashboardContext } from "@/lib/context";

interface Props {
	userInfo: User;
	resumeInfo?: Resume;
}

function PersonalInfo({ userInfo, resumeInfo }: Props) {
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

	const { fetchPath } = useContext(DashboardContext);
	const [username, setUsername] = useState<string>("N/A");
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetchPath(`/user/${userInfo.user_id}`, {
					method: "GET",
				});
				setUsername(res);
			} catch (err) {
				console.error("Failed to fetch user:", err);
			}
		};
		fetchUser();
	}, []);

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
				{userInfo.username}
			</InfoRow>
			<InfoRow icon={<AtSign size={18} />}>{username}</InfoRow>
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
				{resumeInfo?.upload_date
					? `Uploaded ${resumeInfo.upload_date}`
					: "No Resume Uploaded"}
			</InfoRow>
		</div>
	);
}

export default PersonalInfo;
