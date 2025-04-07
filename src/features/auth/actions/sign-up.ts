"use server";

import { hash } from "@node-rs/argon2";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { createUserSession } from "@/features/auth/utils/create-user-session";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";

const signUpSchema = z
  .object({
    username: z
      .string()
      .nonempty({ message: "Username is required" })
      .min(6, { message: "Username must be at least 6 characters long" })
      .max(191, { message: "Username cannot exceed 191 characters" })
      .refine((value) => !value.includes(" "), {
        message: "Username cannot contain a space",
      }),
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
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" })
      .min(6, {
        message: "Confirm password must be at least 6 characters long",
      })
      .max(191, { message: "Confirm password cannot exceed 191 characters" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export async function signUp(_actionState: ActionState, formData: FormData) {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        passwordHash: await hash(password),
      },
    });

    await createUserSession(user.id);
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Either email or username is already in use",
        formData,
      );
    }
    return fromErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Sign up successfully");
  redirect(ticketsPath());
}
