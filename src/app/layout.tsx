import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../assets/globals.scss";
import { ReduxProvider } from "@/components/redux/ReduxProvider";
import React from "react";

import { cn } from "@/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "MeetMate | Welcome"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
