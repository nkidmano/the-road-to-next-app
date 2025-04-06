"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { INITIAL_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/features/auth/actions/sign-up";

export function SignUpForm() {
  const [actionState, action] = useActionState(signUp, INITIAL_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        type="text"
        defaultValue={(actionState.payload?.get("username") as string) ?? ""}
      />
      <FieldError name="username" actionState={actionState} />

      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue={(actionState.payload?.get("email") as string) ?? ""}
      />
      <FieldError name="email" actionState={actionState} />

      <Label htmlFor="password">Password</Label>
      <Input
        id=" password"
        name="password"
        type="password"
        defaultValue={(actionState.payload?.get("password") as string) ?? ""}
      />
      <FieldError name="password" actionState={actionState} />

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        defaultValue={
          (actionState.payload?.get("confirmPassword") as string) ?? ""
        }
      />
      <FieldError name="confirmPassword" actionState={actionState} />

      <SubmitButton label="Sign Up" />
    </Form>
  );
}
