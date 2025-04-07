import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketEditPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function TicketEditPage({ params }: TicketEditPageProps) {
  const { ticketId } = await params;
  // const { user } = await getAuth();
  const ticket = await getTicket(ticketId);
  // const isTicketOwner = isOwner(user, ticket);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Edit ticket"
        description="Edit an existing ticket"
        className="w-full w-[420px] animate-fade-from-top"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
}
