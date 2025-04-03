"use client";

import React, { cloneElement, JSX, useActionState, useState } from "react";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  INITIAL_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type UseConfirmDialog = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: JSX.Element;
};

export function useConfirmDialog({
  title = "Are you absolutely sure? ",
  description = "This action cannot be undone. Make sure you understand the consequences.",
  action,
  trigger,
}: UseConfirmDialog) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [actionState, formAction] = useActionState<ActionState>(
    action,
    INITIAL_ACTION_STATE,
  );

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => {
      trigger?.props?.onClick?.();
      setIsOpen((state) => !state);
    },
  } as React.HTMLAttributes<HTMLElement>);

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form action={formAction} actionState={actionState}>
              <SubmitButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
}
