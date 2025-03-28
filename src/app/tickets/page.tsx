import { CircleCheck, FileText, Pencil } from "lucide-react";
import Link from "next/link";
import { Heading } from "@/components/heading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { initialTickets } from "@/data";
import { ticketPath } from "@/path";

const TICKET_ICONS = {
  OPEN: <FileText />,
  DONE: <CircleCheck />,
  IN_PROGRESS: <Pencil />,
};

export default function TicketsPage() {
  return (
    <div className="flex flex-col gap-y-8">
      <Heading
        title="Tickets Page"
        description="All your tickets in one place"
      />

      <ul className="flex flex-col gap-y-4 w-full max-w-[420px] mx-auto animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <li key={ticket.id} className="w-full max-w-[420px]">
            <Card>
              <CardHeader className="flex items-center">
                <span>{TICKET_ICONS[ticket.status]}</span>
                <span className="truncate">{ticket.title}</span>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 whitespace-break-spaces">
                  {ticket.content}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={ticketPath(ticket.id)} className="underline">
                  View
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
