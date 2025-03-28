import clsx from "clsx";
import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "@/path";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    />
  </svg>
);

const TICKET_ICONS = {
  OPEN: <DocumentIcon />,
  DONE: <CheckIcon />,
  IN_PROGRESS: <PencilIcon />,
};

export default function TicketsPage() {
  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="text-3xl font-semibold tracking-tight">Tickets Page</h2>
      <ul className="flex flex-col gap-y-4 w-full max-w-[420px] mx-auto animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <li key={ticket.id} className="border border-slate-100 rounded p-4">
            <p>{TICKET_ICONS[ticket.status]}</p>
            <h3 className="text-lg truncate">{ticket.title}</h3>
            <p
              className={clsx("text-sm text-slate-500 truncate", {
                "line-through": ticket.status === "DONE",
              })}
            >
              {ticket.content}
            </p>
            <Link href={ticketPath(ticket.id)} className="underline">
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
