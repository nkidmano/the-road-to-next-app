"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { signInPath, ticketsPath } from "@/path";

export async function deleteTicket(id: string) {
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath());
  }

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({ where: { id } });
      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not Authorized");
      }
    }

    await prisma.ticket.delete({ where: { id } });
  } catch (error: unknown) {
    return fromErrorToActionState(error);
  }

  await setCookieByKey("toast", "Ticket deleted");
  revalidatePath(ticketsPath());
  redirect(ticketsPath());
}
