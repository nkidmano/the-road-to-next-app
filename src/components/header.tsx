"use client";

import { Kanban } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { SignOutForm } from "@/features/auth/components/sign-out-form";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/path";

export function Header() {
  const { user, isFetched } = useAuth();

  const navItems = (
    <>
      {user ? (
        <>
          <Link
            className={buttonVariants({ variant: "default" })}
            href={ticketsPath()}
          >
            Tickets
          </Link>
          <SignOutForm />
        </>
      ) : (
        <>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={signUpPath()}
          >
            Sign Up
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={signInPath()}
          >
            Sign In
          </Link>
        </>
      )}
    </>
  );

  if (!isFetched) {
    return null;
  }

  return (
    <nav
      className="
        animate-header-from-top
        supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
        border-b bg-background/95 backdrop-blur
        w-full flex py-2.5 px-5 justify-between
      "
    >
      <div className="flex items-center gap-x-2">
        <Link
          className={buttonVariants({ variant: "ghost" })}
          href={homePath()}
        >
          <Kanban size={48} />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
}
