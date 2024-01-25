import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import "../assets/globals.scss";
import { ReduxProvider } from "@/components/redux/ReduxProvider";
import React from "react";

import { cn } from "@/lib/utils";
/* import TokenRefresh from "@/components/auth/TokenRefresh"; */
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
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
        {/* <TokenRefresh /> */}
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
