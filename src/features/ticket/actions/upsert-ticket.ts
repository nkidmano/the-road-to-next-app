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
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";

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
});

export async function upsertTicket(
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) {
  const { title, content } = Object.fromEntries(formData);

  try {
    const data = upsertTicketSchema.parse({
      title: title as string,
      content: content as string,
    });

    await prisma.ticket.upsert({
      create: data,
      update: data,
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
