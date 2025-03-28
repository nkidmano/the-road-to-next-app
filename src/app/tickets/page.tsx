import { Heading } from "@/components/heading";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";

export default function TicketsPage() {
  return (
    <div className="flex flex-col gap-y-8">
      <Heading
        title="Tickets Page"
        description="All your tickets in one place"
      />

      <div className="flex flex-col gap-y-4 w-full max-w-[420px] mx-auto animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
