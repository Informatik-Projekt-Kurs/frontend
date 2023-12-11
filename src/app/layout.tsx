import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.scss";
import { ReduxProvider } from "@/components/redux/ReduxProvider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeetMate | Welcome"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
