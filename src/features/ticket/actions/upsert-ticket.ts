"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";

export async function upsertTicket(id: string | undefined, formData: FormData) {
  const { title, content } = Object.fromEntries(formData);
  const data = {
    title: title as string,
    content: content as string,
  };

  await prisma.ticket.upsert({
    create: data,
    update: data,
    where: { id: id ?? "" },
  });

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketsPath());
  }
}
