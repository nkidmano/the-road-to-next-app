import { Ticket } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getTicket(id: string): Promise<Ticket | null> {
  return prisma.ticket.findUnique({ where: { id } });
}
