"use client";

import { useMemo, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

import { MONTHS, CATEGORIES } from "./_data/constants";
import type { CategoryKey } from "./_data/types";
import { buildSpendingDataset } from "./_data/fake";

import { SpendingTopControls } from "./_components/spending-top-controls";
import { SummaryCards } from "./_components/summary-cards";
import { WeeklyBreakdownCard } from "./_components/weekly-breakdown-card";
import { CategorySelector } from "./_components/category-selector";
import { TransactionsCard } from "./_components/transactions-card";

export default function SpendingPage() {
  const [active, setActive] = useState<CategoryKey>("spending");
  const [month, setMonth] = useState<string>("January");

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
      backHref="/home"
      headerRight={
        <Button variant="outline" size="icon" aria-label="Filters">
          <SlidersHorizontal className="size-4" />
        </Button>
      }
      contentClassName="space-y-6"
    >
      <SpendingTopControls
        month={month}
        months={MONTHS}
        onMonthChange={setMonth}
      />

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
