import { clsx } from "clsx";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardCompactType = {
  title: string;
  description: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function CardCompact({
  title,
  description,
  content,
  footer,
  className,
}: CardCompactType) {
  return (
    <Card className={clsx(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
