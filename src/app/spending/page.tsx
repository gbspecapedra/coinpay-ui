"use client";

import { useMemo, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

import { CATEGORIES } from "./_data/constants";
import type { CategoryKey } from "./_data/types";
import { buildSpendingDataset } from "./_data/fake";

import { SummaryCards } from "./_components/summary-cards";
import { WeeklyBreakdownCard } from "./_components/weekly-breakdown-card";
import { CategorySelector } from "./_components/category-selector";
import { TransactionsCard } from "./_components/transactions-card";
import { coerceMonth } from "@/lib/months";
import { useSearchParams } from "next/navigation";
import { MonthSelect } from "@/components/month-select";

export default function SpendingPage() {
  const searchParams = useSearchParams();
  const month = useMemo(() => {
    const raw = searchParams.get("month") ?? undefined;
    return coerceMonth(raw);
  }, [searchParams]);

  const [active, setActive] = useState<CategoryKey>("spending");

  const data = useMemo(() => {
    return buildSpendingDataset({
      month,
      active,
      count: 18,
    });
  }, [month, active]);

  return (
    <PageShell
      title="Spending"
      description="Overview of your activity, trends, and recent transactions."
      size="lg"
      variant="plain"
      backHref={`/home?month=${encodeURIComponent(month)}`}
      headerRight={
        <Button variant="outline" size="icon" aria-label="Filters">
          <SlidersHorizontal className="size-4" />
        </Button>
      }
      contentClassName="space-y-6"
    >
      <div className="flex justify-end">
        <MonthSelect value={month} widthClassName="w-[140px]" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <SummaryCards
            totalSpend={data.totalSpend}
            availableBalance={data.availableBalance}
          />

          <WeeklyBreakdownCard data={data.weeks} />

          <CategorySelector
            categories={CATEGORIES}
            active={active}
            onChange={setActive}
          />
        </div>

        <TransactionsCard transactions={data.transactions} />
      </div>
    </PageShell>
  );
}
