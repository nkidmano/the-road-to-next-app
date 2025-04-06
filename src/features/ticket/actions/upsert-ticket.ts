"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/actions/get-auth";
import { prisma } from "@/lib/prisma";
import { signInPath, ticketsPath } from "@/path";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(191, { message: "Title cannot exceed 191 characters" }),
  content: z
    .string()
    .nonempty({ message: "Content is required" })
    .min(3, { message: "Content must be at least 3 characters long" })
    .max(1024, { message: "Title cannot exceed 1024 characters" }),
  bounty: z.coerce
    .number()
    .min(0, { message: "Bounty must be at least 0" })
    .max(10000, { message: "Bounty cannot exceed 10000" })
    .positive(),
  deadline: z.coerce
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Deadline is required"),
});

export async function upsertTicket(
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) {
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath());
  }

  const { title, content, deadline, bounty } = Object.fromEntries(formData);

  try {
    const data = upsertTicketSchema.parse({
      title: title as string,
      content: content as string,
      bounty: bounty as string,
      deadline: deadline as string,
    });

    const dbData = { ...data, userId: user.id, bounty: toCent(data.bounty) };

    await prisma.ticket.upsert({
      create: dbData,
      update: dbData,
      where: { id: id ?? "" },
    });
  } catch (error: unknown) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    await setCookieByKey("toast", "Ticket updated");
    redirect(ticketsPath());
  }

  return toActionState("SUCCESS", "Ticket created");
}
