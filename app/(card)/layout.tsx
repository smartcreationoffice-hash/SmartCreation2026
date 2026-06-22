import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "../(frontend)/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Smart Creation Group · Connect",
  description:
    "Tap to connect with Smart Creation Group — business setup, financial services and owned business centers across Dubai. Save our contact, call, WhatsApp or visit.",
};

export const viewport: Viewport = {
  themeColor: "#0e3554",
};

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={geist.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
