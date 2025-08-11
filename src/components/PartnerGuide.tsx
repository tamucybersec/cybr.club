import Container from "@/components/Container";
import TitleContainer from "@/components/TitleContainer";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

function PartnerGuide() {
	return (
		<>
			<Link href={"/pdfs/Sponsorship Packet 2025-2026.pdf"}>
				<TitleContainer className="mt-8 flex gap-6">
					Partnership Guide
					<ExternalLink size={36} />
				</TitleContainer>
			</Link>
			<Container>
				<div className="w-full h-screen">
					<object
						data="/pdfs/Sponsorship Packet 2025-2026.pdf"
						type="application/pdf"
						width="100%"
						style={{ height: "calc(100% - 6.5rem)" }}
					>
						<p>
							<a href="/pdfs/Sponsorship Packet 2025-2026.pdf">
								Sponsorship Packet
							</a>
						</p>
					</object>
				</div>
			</Container>
		</>
	);
}

export default PartnerGuide;
