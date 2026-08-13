import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "William Lugoloobi",
  description:
    "Oxford researcher studying reliable AI agents, model self-knowledge, post-training, and agent harness optimisation.",
  icons: {
    icon: "/star.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${jakarta.variable} ${jetbrains.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
