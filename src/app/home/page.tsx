"use client";

import { useMemo } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Bell, Trophy } from "lucide-react";

import { buildHomeModel } from "./_data/fake";
import { SearchRow } from "./_components/search-row";
import { BalanceBanner } from "./_components/balance-banner";
import { RecentActivity } from "./_components/recent-activity";
import { QuickActions } from "./_components/quick-actions";
import { Insights } from "./_components/insights";

export default function HomePage() {
  const model = useMemo(() => buildHomeModel({ month: "January" }), []);

  return (
    <PageShell
      size="lg"
      variant="plain"
      headerRight={
        <>
          <Button variant="ghost" size="icon" aria-label="Achievements">
            <Trophy className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-5" />
          </Button>
        </>
      }
      contentClassName="space-y-6"
    >
      <SearchRow />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <BalanceBanner
            availableBalance={model.availableBalance}
            currency={model.currency}
            summary={{
              spending: model.summary.spending,
              income: model.summary.income,
            }}
          />

          <RecentActivity rows={model.recent} />
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <QuickActions />
          <Insights
            monthSpent={model.insights.monthSpent}
            savedSoFar={model.insights.savedSoFar}
            upcomingBills={model.insights.upcomingBills}
            budgetRemaining={model.insights.budgetRemaining}
          />
        </aside>
      </div>
    </PageShell>
  );
}
