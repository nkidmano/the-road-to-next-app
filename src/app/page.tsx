import Link from 'next/link'
import { ticketsPath } from '@/path'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="text-3xl font-semibold tracking-tight">Home page</h2>
      <div className="text-center">
        <Link className="underline" href={ticketsPath()}>Go to tickets</Link>
      </div>
    </div>
  );
}
