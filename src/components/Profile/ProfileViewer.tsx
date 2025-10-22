import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Event } from "@/lib/types";
import { ReactNode, useEffect, useState } from "react";
import ProfileContents from "./ProfileContents";

interface Props {
	user_id: string;
	asChild?: boolean;
	children: ReactNode;
}

export type EventInfo = Record<number, Record<string, Record<string, Event[]>>>;

function ProfileViewer({ user_id, asChild, children }: Props) {
	// for lazy computation
	const [open, setOpen] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (open) {
			setLoaded(true);
		}
	}, [open]);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
			<DialogContent>
				{loaded ? (
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
