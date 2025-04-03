import { Ticket } from "@prisma/client";
import { clsx } from "clsx";
import { MoreVertical, Pencil, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TicketMoreMenu } from "@/features/ticket/components/ticket-more-menu";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { ticketEditPath, ticketPath } from "@/path";
import { toCurrency } from "@/utils/currency";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

export function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link href={ticketPath(ticket.id)}>
        <SquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketEditPath(ticket.id)}>
        <Pencil className="h-4 w-4" />
      </Link>
    </Button>
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  );

  return (
    <div
      className={clsx("w-full flex gap-x-3", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="flex-1">
        <CardHeader className="flex items-center ">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <span className="truncate">{ticket.title}</span>
        </CardHeader>
        <CardContent>
          <p
            className={clsx(" whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrency(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-2">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
}
