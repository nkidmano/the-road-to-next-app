import { Ticket } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getTickets(): Promise<Ticket[]> {
  return prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
