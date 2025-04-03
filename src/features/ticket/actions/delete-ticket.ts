"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";

export async function deleteTicket(id: string) {
  try {
    await prisma.ticket.delete({ where: { id } });
  } catch (error: unknown) {
    return fromErrorToActionState(error);
  }

  await setCookieByKey("toast", "Ticket deleted");
  revalidatePath(ticketsPath());
  redirect(ticketsPath());
}
