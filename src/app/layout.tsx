import "./globals.css";
import { Kanban } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/path";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Road to Next",
  description: "Road to NextJS Course",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav
          className="
            supports-backdrop-blur:bg-background/60
            fixed left-0 right-0 top-0 z-20
            border-b bg-background/95 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
          "
        >
          <div>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={homePath()}
            >
              <Kanban size={48} />
              <h1 className="text-lg font-semibold">TicketBounty</h1>
            </Link>
          </div>
          <div>
            <Link
              className={buttonVariants({ variant: "default" })}
              href={ticketsPath()}
            >
              Tickets
            </Link>
          </div>
        </nav>
        <main
          className="
            min-h-screen flex-1
            overflow-y-auto overflow-x-hidden
            py-24 px-8
            bg-secondary/20
            flex flex-col
          "
        >
          {children}
        </main>
      </body>
    </html>
  );
}
