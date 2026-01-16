import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WeekBar } from "../_data/types";

export function WeeklyBreakdownCard({ data }: { data: WeekBar[] }) {
  return (
    <Card className="overflow-hidden border-b-2 border-b-primary">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Weekly breakdown</CardTitle>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="grid grid-cols-5 items-end gap-4 pb-6">
          {data.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-2">
              <div className="text-xs text-muted-foreground">${d.value}</div>

              <div
                className={cn(
                  "h-28 w-8 rounded-md",
                  d.tone === "primary" ? "bg-primary" : "bg-secondary"
                )}
                aria-hidden="true"
              />

              <div className="text-xs text-muted-foreground">{d.label}</div>
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-primary/60 dark:bg-[#A4ABFF]/60" />
      </CardContent>
    </Card>
  );
}
