import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/path";

export default async function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Sign Up"
        description="Create a new account"
        className="w-full w-[420px] animate-fade-from-top"
        content={<SignUpForm />}
        footer={
          <Link className="text-sm text-muted-foreground" href={signInPath()}>
            Have an account? Sign in now.
          </Link>
        }
      />
    </div>
  );
}
