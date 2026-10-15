import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./site-fonts.css";
import "./globals.css";

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
    <html lang="en" data-scroll-behavior="smooth">
      <body className="site-fonts">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
