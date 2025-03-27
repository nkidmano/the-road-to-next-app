import Link from 'next/link'
import { initialTickets } from '@/data'
import { ticketPath } from '@/path'

export default function TicketsPage() {
  return (
    <div>
      <h2 className="text-lg">Tickets Page</h2>
      <ul>
        {initialTickets.map(ticket => (
          <li key={ticket.id}>
            <h2>{ticket.title}</h2>
            <Link href={ticketPath(ticket.id)} className="underline">View</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
