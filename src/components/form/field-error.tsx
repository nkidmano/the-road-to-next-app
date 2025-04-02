import { ActionState } from "@/components/form/utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

export function FieldError({ actionState, name }: FieldErrorProps) {
  if (!actionState.fieldErrors[name]) {
    return null;
  }

  return (
    <span className="text-xs text-red-500">
      {actionState.fieldErrors[name]?.[0]}
    </span>
  );
}
