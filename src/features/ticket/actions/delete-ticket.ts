"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";

export async function deleteTicket(id: string) {
  await prisma.ticket.delete({ where: { id } });

  await setCookieByKey("toast", "Ticket deleted");
  revalidatePath(ticketsPath());
  redirect(ticketsPath());
}
