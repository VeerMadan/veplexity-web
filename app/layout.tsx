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

import Providers from "./Providers";

export const metadata: Metadata = {
  title: "VePlexity — Software Engineering, Digital Ecosystems & Labs",
  description: "The central infrastructure for advanced software engineering, standalone desktop apps, and high-performance digital ecosystems by Veer Madan.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070308] text-white selection:bg-fuchsia-500/30 selection:text-white font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
