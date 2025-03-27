import Link from 'next/link'
import { ticketsPath } from '@/path'

export default function HomePage() {
  return (
    <div>
      <p className="text-lg">Home page</p>
      <Link className="underline" href={ticketsPath()}>Go to tickets</Link>
    </div>
  );
}
