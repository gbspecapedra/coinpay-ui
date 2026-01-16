"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { coerceMonth, MONTHS, type MonthName } from "@/lib/months";

export function MonthSelect({
  value,
  widthClassName = "w-[150px]",
}: {
  value: MonthName;
  widthClassName?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(next: string) {
    const coerced = coerceMonth(next);
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", coerced);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`h-10 ${widthClassName}`}>
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {MONTHS.map((m) => (
          <SelectItem key={m} value={m}>
            {m}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
