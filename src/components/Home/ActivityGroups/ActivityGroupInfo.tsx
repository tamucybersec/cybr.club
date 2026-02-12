import { ActivityGroup } from "@/data/activityGroups";
import Anchor from "@/components/Anchor";

interface Props {
	variant: "desktop" | "mobile";
	group: ActivityGroup;
}

function ActivityGroupInfo({ variant, group }: Props) {
	function screen(ifDesktop: string, ifMobile: string) {
		return variant === "desktop" ? ifDesktop : ifMobile;
	}

	return (
		<div className="flex-1 flex flex-col justify-center">
			<h3
				className={`font-azonix ${screen("text-3xl", "text-hero-subtext")}`}
			>
				{group.title}
			</h3>
			<h5
				className={`font-ubuntu-sans ${screen("text-lg", "text-sm")} font-light`}
			>
				{group.note ?? (
					<>
						{group.day}s at {group.time} |{" "}
						<Anchor
							href={group.map}
							target="_blank"
						>
							{group.location}
						</Anchor>
					</>
				)}
			</h5>
			<p
				className={`text-white ${screen("text-base lg:text-lg", "text-hero-button")} font-ubuntu-sans font-medium`}
			>
				{group.description}
			</p>
		</div>
	);
}

export default ActivityGroupInfo;
