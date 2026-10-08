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
  title: "VePlexity Network — Media, Software Labs & Digital Infrastructure",
  description: "The central brand portfolio of Veer Madan. Live broadcasts, engineering labs, C++ game modifications, audio mastering, and the VePlexity Bot V2 commercial ecosystem.",
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
      <body className="min-h-full flex flex-col bg-[#05070a] text-[#e5e7eb] selection:bg-purple-500/20 selection:text-white relative">
        {/* Ambient Color Shifting Mesh Glow */}
        <div className="ambient-aurora" aria-hidden="true">
          <div className="ambient-mesh" />
        </div>

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
