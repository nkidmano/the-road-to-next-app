import { TicketStatus } from "@prisma/client";

export type Ticket = {
  id: string;
  status: TicketStatus;
  title: string;
  content: string;
};
