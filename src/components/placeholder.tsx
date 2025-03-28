import { clsx } from "clsx";
import { MessageSquareWarning } from "lucide-react";
import React, { cloneElement, JSX } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>, "svg">;
  button?: JSX.Element;
};

export function Placeholder({
  label,
  icon = <MessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, {
        className: clsx("w-16 h-16", icon?.props.className),
      })}
      <p>{label}</p>
      {cloneElement(button, {
        className: clsx("h-10", button?.props.className),
      })}
    </div>
  );
}
