import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: { default: `${profile.name} — ${profile.headline}`, template: `%s · ${profile.name}` },
  description: profile.summary,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5ef" },
    { media: "(prefers-color-scheme: dark)", color: "#15181d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={kanit.variable}>
      <body>{children}</body>
    </html>
  );
}
