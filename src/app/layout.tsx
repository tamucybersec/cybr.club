import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import SmoothScroll from "@/components/SmoothScroll";

const azonix = localFont({
	src: "../../public/fonts/Azonix.otf",
	variable: "--font-azonix",
	weight: "400",
	style: "normal",
});

const ubuntuSans = localFont({
	src: "../../public/fonts/UbuntuSans-VariableFont_wdth,wght.ttf",
	variable: "--font-ubuntu-sans",
	style: "normal",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "cybr.club",
	description: "Texas A&M Cybersecurity Club",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			style={{ margin: 0, padding: 0 }}
		>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</head>
			<body
				className={`dark ${azonix.variable} ${ubuntuSans.variable} font-sans antialiased min-h-dvh relative overflow-x-hidden`}
				style={{
					margin: 0,
					padding: 0,
				}}
			>
				{/* <SmoothScroll> */}
					{/* Page Content with padding moved here */}
					<div className="relative z-10 py-4">{children}</div>
				{/* </SmoothScroll> */}
			</body>
		</html>
	);
}
