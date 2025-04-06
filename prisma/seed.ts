import { hash } from "@node-rs/argon2";
import { PrismaClient, TicketStatus } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@gmail.com",
  },
  {
    username: "eias",
    email: "eias@gmail.com",
  },
];

const tickets = [
  {
    title: "Create a new project",
    content: "Create a new project using Angular CLI (Database)",
    status: TicketStatus.OPEN,
    bounty: 899,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "Create a new component",
    content: "Create a new component using Angular CLI (Database)",
    status: TicketStatus.OPEN,
    bounty: 199,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "Create a new service",
    content: "Create a new service using Angular CLI (Database)",
    status: TicketStatus.IN_PROGRESS,
    bounty: 600,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "Create a new module",
    content: "Create a new module using Angular CLI (Database)",
    status: TicketStatus.DONE,
    bounty: 499,
    deadline: new Date().toISOString().split("T")[0],
  },
];

async function seed() {
  console.time("seed-time");

  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const passwordHash = await hash("123456");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, passwordHash })),
  });
  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({ ...ticket, userId: dbUsers[0].id })),
  });

  console.timeEnd("seed-time");
}

seed();
