import { PrismaClient, TicketStatus } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Create a new project",
    content: "Create a new project using Angular CLI (Database)",
    status: TicketStatus.OPEN,
  },
  {
    title: "Create a new component",
    content: "Create a new component using Angular CLI (Database)",
    status: TicketStatus.OPEN,
  },
  {
    title: "Create a new service",
    content: "Create a new service using Angular CLI (Database)",
    status: TicketStatus.IN_INPROGRESS,
  },
  {
    title: "Create a new module",
    content: "Create a new module using Angular CLI (Database)",
    status: TicketStatus.DONE,
  },
];

async function seed() {
  console.time("seed-time");
  await prisma.ticket.deleteMany();
  await prisma.ticket.createMany({ data: tickets });
  console.timeEnd("seed-time");
}

seed();
