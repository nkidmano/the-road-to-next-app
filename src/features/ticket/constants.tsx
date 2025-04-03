import { CircleCheck, FileText, Pencil } from "lucide-react";

export const TICKET_ICONS = {
  OPEN: <FileText />,
  DONE: <CircleCheck />,
  IN_PROGRESS: <Pencil />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: "Open",
  DONE: "Done",
  IN_PROGRESS: "In Progress",
};
