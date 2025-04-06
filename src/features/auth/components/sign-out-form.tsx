import { LogOut } from "lucide-react";
import React from "react";
import { SubmitButton } from "@/components/form/submit-button";
import { signOut } from "@/features/auth/actions/sign-out";

export function SignOutForm() {
  return (
    <form action={signOut}>
      <SubmitButton icon={<LogOut />} />
    </form>
  );
}
