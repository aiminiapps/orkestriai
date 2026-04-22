import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Orkestri AI — Crypto Investment AI Agent Arena",
  description:
    "Compare AI-powered crypto investment analyses from Research, Market, and Risk agents. Get multi-perspective insights for smarter investment decisions.",
  keywords: [
    "crypto",
    "AI",
    "investment",
    "analysis",
    "blockchain",
    "DeFi",
    "agent",
  ],
  openGraph: {
    title: "Orkestri AI — Crypto Investment AI Agent Arena",
    description:
      "Compare AI-powered crypto investment analyses from Research, Market, and Risk agents.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${dmMono.variable} dark`}
    >
      <body className="min-h-screen bg-gradient-animated">
        {children}
      </body>
    </html>
  );
}
