"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

export function DatePicker({ id, name, defaultValue }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <>
      <input type="hidden" name={name} value={formattedStringDate} />
      <Popover>
        <PopoverTrigger id={id} asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedStringDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
