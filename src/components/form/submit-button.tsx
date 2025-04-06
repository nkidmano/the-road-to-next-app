"use client";

import { clsx } from "clsx";
import { LoaderCircle } from "lucide-react";
import React, { cloneElement, JSX } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type ButtonProps = React.ComponentProps<typeof Button>;

type SubmitButtonProps = {
  label?: string;
  icon?: JSX.Element;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
};

export function SubmitButton({
  label,
  icon,
  variant = "default",
  size = "default",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant={variant} size={size} type="submit">
      {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
      {label && label}
      {icon && !pending && (
        <>
          {cloneElement(icon, {
            className: clsx("h-4 w-4", icon.props.className),
          })}
        </>
      )}
    </Button>
  );
}
