import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const azonix = localFont({
  src: "../../public/fonts/Azonix.otf",
  variable: "--font-azonix",
  weight: "400",
  style: "normal",
});

const ubuntuSans = localFont({
  src: "../../public/fonts/UbuntuSans-VariableFont_wdth,wght.ttf",
  variable: "--font-ubuntu-sans",
  weight: "100 900",
  style: "normal",
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
    <html lang="en">
      <body
        className={`dark ${azonix.variable} ${ubuntuSans.variable} font-sans antialiased py-4 min-h-dvh`}
      >
        {children}
      </body>
    </html>
  );
}
