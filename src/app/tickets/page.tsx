import Link from 'next/link'
import { initialTickets } from '@/data'
import { ticketPath } from '@/path'

const TICKET_ICONS = {
  OPEN: 'O',
  DONE: 'X',
  IN_PROGRESS: '>'
}

export default function TicketsPage() {
  return (
    <div>
      <h2 className="text-lg">Tickets Page</h2>
      <ul>
        {initialTickets.map(ticket => (
          <li key={ticket.id}>
            <h2>{ticket.title}</h2>
            <p>{TICKET_ICONS[ticket.status]}</p>
            <Link href={ticketPath(ticket.id)} className="underline">View</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
