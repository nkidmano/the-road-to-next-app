import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";

export async function TicketList() {
  const tickets = await getTickets();

  return (
    <div className="flex flex-col gap-y-4 w-full max-w-[420px] mx-auto animate-fade-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
