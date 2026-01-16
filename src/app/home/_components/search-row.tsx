import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { ArrowUpRight, Search } from "lucide-react";

export function SearchRow() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <TextField
          label={undefined}
          placeholder='Search "Payments", "Cards", "Spending"...'
          leftIcon={<Search className="size-4" />}
          containerClassName="w-full"
        />
      </div>

      <Button className="h-11 rounded-full px-5">
        <ArrowUpRight className="size-4" />
        Add Money
      </Button>
    </div>
  );
}
