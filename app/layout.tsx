import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdPeeker — Watch every Meta ad your competitors run",
  description:
    "AdPeeker monitors competitors' Facebook and Instagram ads 4× daily, archives every creative, and delivers what matters to your inbox.",
  openGraph: {
    title: "AdPeeker — Peek at every Meta ad your competitors run",
    description: "Competitor ad intelligence, 4× daily scans. Plans from $5/mo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
