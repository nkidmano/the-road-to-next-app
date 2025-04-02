import React from "react";
import { toast } from "sonner";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { ActionState } from "@/components/form/utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  children: React.ReactNode;
  actionState: ActionState;
};

export function Form({ action, actionState, children }: FormProps) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => toast.success(actionState.message),
    onError: ({ actionState }) => toast.error(actionState.message),
  });

  return (
    <form action={action} className="flex flex-col gap-y-4">
      {children}
    </form>
  );
}
