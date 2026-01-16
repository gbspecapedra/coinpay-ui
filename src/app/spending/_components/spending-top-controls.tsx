import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

export function SpendingTopControls({
  month,
  months,
  onMonthChange,
}: {
  month: string;
  months: readonly string[];
  onMonthChange: (m: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 items-center">
      <Button variant="ghost" size="icon" asChild aria-label="Back to home">
        <Link href="/home">
          <ArrowLeft className="size-5" />
        </Link>
      </Button>

      <div className="flex justify-end">
        <Select value={month} onValueChange={onMonthChange}>
          <SelectTrigger className="h-10 w-[150px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
