"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/components/heading";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { Ticket } from "@/features/ticket/types";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getTickets();
      setTickets(result);
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col gap-y-8">
      <Heading
        title="Tickets Page"
        description="All your tickets in one place"
      />

      <div className="flex flex-col gap-y-4 w-full max-w-[420px] mx-auto animate-fade-from-top">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
