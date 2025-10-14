import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Event } from "@/lib/types";
import { ReactNode, useState } from "react";
import ProfileContents from "./ProfileContents";

interface Props {
	user_id: string;
	asChild?: boolean;
	children: ReactNode;
}

export type EventInfo = Record<number, Record<string, Record<string, Event[]>>>;

function ProfileViewer({ user_id, asChild, children }: Props) {
	const [open, setOpen] = useState(false); // for lazy computation

	return (
		<Dialog onOpenChange={setOpen}>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
			<DialogContent>
				{open ? (
					<ProfileContents user_id={user_id} />
				) : (
					<>
						<DialogTitle>Loading...</DialogTitle>
						<DialogDescription>
							Calculating statistics for this user.
						</DialogDescription>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default ProfileViewer;
