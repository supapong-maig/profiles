import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Mono, IBM_Plex_Sans_Thai } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const display = Chakra_Petch({ subsets: ["thai", "latin"], weight: ["500", "600", "700"], display: "swap", variable: "--font-display" });
const body = IBM_Plex_Sans_Thai({ subsets: ["thai", "latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://supapong-maig.github.io/profiles/"),
  title: { default: `${profile.name} — ${profile.headline}`, template: `%s · ${profile.name}` },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F4F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1514" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
