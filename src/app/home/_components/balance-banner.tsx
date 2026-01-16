import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";

function money(v: number) {
  return v.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function moneySigned(v: number) {
  const abs = Math.abs(v).toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return v < 0 ? `-${abs}` : abs;
}

export function BalanceBanner({
  availableBalance,
  currency,
  summary,
}: {
  availableBalance: number;
  currency: { flag: string; label: string };
  summary: { spending: number; income: number };
}) {
  return (
    <div className="rounded-2xl border border-transparent bg-primary p-5 text-primary-foreground shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm text-white/80">Available Balance</div>
          <div className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {money(availableBalance)}
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
            <span>{currency.flag}</span>
            <span className="font-medium">{currency.label}</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[240px]">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="text-xs text-white/80">Spending</div>
              <div className="mt-1 text-lg font-semibold">
                {moneySigned(summary.spending)}
              </div>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="text-xs text-white/80">Income</div>
              <div className="mt-1 text-lg font-semibold">
                {moneySigned(summary.income)}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className={cn(
              "h-11 w-full rounded-full bg-transparent",
              "border-white/50 text-white hover:bg-white/10"
            )}
          >
            <Wallet className="size-4" />
            Manage Balance
          </Button>
        </div>
      </div>
    </div>
  );
}
