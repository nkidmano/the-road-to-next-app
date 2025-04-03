"use client";

import { Ticket } from "@prisma/client";
import { useActionState, useRef } from "react";
import {
  DatePicker,
  ImperativeHandleFromDataPicker,
} from "@/components/date-picker";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { INITIAL_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { fromCent } from "@/utils/currency";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    INITIAL_ACTION_STATE,
  );

  const datePickerImperativeHandleRef =
    useRef<ImperativeHandleFromDataPicker>(null);

  const handleSuccess = () => {
    datePickerImperativeHandleRef.current?.reset();
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title ?? ""
        }
      />
      <FieldError name="title" actionState={actionState} />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ??
          ticket?.content ??
          ""
        }
      />
      <FieldError name="content" actionState={actionState} />

      <div className="flex gap-x-4">
        <div className="flex-1 flex flex-col gap-y-4">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            imperativeHandleRef={datePickerImperativeHandleRef}
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline ??
              ""
            }
          />
          <FieldError name="deadline" actionState={actionState} />
        </div>

        <div className="flex-1 flex flex-col gap-y-4">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step=".01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket.bounty) : "")
            }
          />
          <FieldError name="bounty" actionState={actionState} />
        </div>
      </div>

      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
}
