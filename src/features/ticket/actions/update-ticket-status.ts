"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { signInPath, ticketsPath } from "@/path";

export async function updateTicketStatus(id: string, status: TicketStatus) {
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

    await prisma.ticket.update({ where: { id }, data: { status } });
  } catch (error: unknown) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", "Status updated");
}
