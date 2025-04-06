import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/path";

export default async function SignInPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        className="w-full w-[420px] animate-fade-from-top"
        content={<SignInForm />}
        footer={
          <div className="flex w-full justify-between">
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No account yet?
            </Link>
            <Link
              className="text-sm text-muted-foreground"
              href={passwordForgotPath()}
            >
              Forgot Password?
            </Link>
          </div>
        }
      />
    </div>
  );
}
