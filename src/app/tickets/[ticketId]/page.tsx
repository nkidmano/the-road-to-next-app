import { redirect } from 'next/navigation'
import { initialTickets } from '@/data'
import { ticketsPath } from '@/path'

type TicketPageProps = {
  params: Promise<{ ticketId: string }>
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params

  if (!ticketId) {
    redirect(ticketsPath())
  }

  const ticket = initialTickets.find(ticket => ticket.id === ticketId)

  if (!ticket) {
    return (
      <p>Ticket not found</p>
    )
  }

  return (
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p>{ticket.content}</p>
    </div>
  )
}