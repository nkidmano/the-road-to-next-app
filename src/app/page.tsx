import Link from "next/link";
import { Heading } from "@/components/heading";
import { ticketsPath } from "@/path";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-8">
      <Heading title="Home" description="Your home place to start" />
      <div className="text-center">
        <Link className="underline" href={ticketsPath()}>
          Go to tickets
        </Link>
      </div>
    </div>
  );
}
