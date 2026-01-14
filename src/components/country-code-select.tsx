"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CountryCode, COUNTRIES } from "@/lib/countries";

export function CountryCodeSelect({
  value,
  onChange,
  countries = COUNTRIES,
  className,
  disabled,
}: {
  value: CountryCode;
  onChange: (next: CountryCode) => void;
  countries?: CountryCode[];
  className?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  // In case caller passes a value that isn't in the list, keep it usable.
  const safeValue = React.useMemo(() => {
    const match = countries.find((c) => c.code === value.code);
    return match ?? value;
  }, [countries, value]);

  return (
    <Popover open={open} onOpenChange={(next) => !disabled && setOpen(next)}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Select country code"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "flex h-9 min-w-[116px] items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-sm text-foreground",
            "shadow-xs outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "hover:bg-accent/40",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <span className="flex items-center gap-2">
            <span className="text-base leading-none">{safeValue.flag}</span>
            <span className="font-medium">{safeValue.dial}</span>
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[min(360px,calc(100vw-2rem))] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search country…" />
          <CommandEmpty>No country found.</CommandEmpty>

          <CommandGroup>
            {countries.map((c) => {
              const selected = c.code === safeValue.code;

              return (
                <CommandItem
                  key={c.code}
                  value={`${c.name} ${c.dial} ${c.code}`}
                  onSelect={() => {
                    onChange(c);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span className="truncate text-sm">{c.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {c.dial}
                    </span>
                  </span>

                  <Check
                    className={cn(
                      "size-4 shrink-0",
                      selected ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
