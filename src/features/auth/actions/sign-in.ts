"use server";

import { verify } from "@node-rs/argon2";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { createUserSession } from "@/features/auth/utils";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";

const signInSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .min(6, { message: "Email must be at least 6 characters long" })
    .max(191, { message: "Email cannot exceed 191 characters" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(191, { message: "Password cannot exceed 191 characters" }),
});

export async function signIn(_actionState: ActionState, formData: FormData) {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    const validPassword = await verify(user.passwordHash, password);
    if (!validPassword) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    await createUserSession(user.id);
  } catch (error: unknown) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
}
