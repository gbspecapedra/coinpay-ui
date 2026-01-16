import { SectionCard } from "./section-card";

function money(v: number) {
  return v.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
    </div>
  );
}

export function Insights({
  monthSpent,
  savedSoFar,
  upcomingBills,
  budgetRemaining,
}: {
  monthSpent: number;
  savedSoFar: number;
  upcomingBills: number;
  budgetRemaining: number;
}) {
  return (
    <SectionCard>
      <h3 className="text-lg font-semibold tracking-tight">Insights</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Track your month at a glance.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <StatPill label="This month spent" value={money(monthSpent)} />
        <StatPill label="Saved so far" value={money(savedSoFar)} />
        <StatPill label="Upcoming bills" value={money(upcomingBills)} />
        <StatPill label="Budget remaining" value={money(budgetRemaining)} />
      </div>
    </SectionCard>
  );
}
