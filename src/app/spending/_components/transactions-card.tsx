import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import type { Transaction } from "../_data/types";

function money(v: number) {
  return Math.abs(v).toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function TransactionsCard({
  title = "Spending list",
  subtitle = "Recent transactions",
  transactions,
}: {
  title?: string;
  subtitle?: string;
  transactions: Transaction[];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>
        </div>

        <Button variant="outline" size="icon" aria-label="List filters">
          <SlidersHorizontal className="size-4" />
        </Button>
      </CardHeader>

      <CardContent className="max-h-[450px] overflow-y-auto">
        <div className="divide-y">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center gap-4 py-4">
              <div className="grid size-11 place-items-center rounded-full bg-muted text-sm font-semibold">
                {t.logo}
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.when}</div>
              </div>

              <div
                className={cn(
                  "text-sm font-semibold tabular-nums",
                  t.amount < 0
                    ? "text-destructive"
                    : "text-[color:var(--chart-3)]"
                )}
              >
                {t.amount < 0 ? "-" : ""}
                {money(t.amount)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
