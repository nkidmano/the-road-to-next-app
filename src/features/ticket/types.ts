export type Ticket = {
  id: string;
  status: "OPEN" | "DONE" | "IN_PROGRESS";
  title: string;
  content: string;
};
