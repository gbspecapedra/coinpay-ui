import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  CreditCard,
  Landmark,
  PiggyBank,
  Receipt,
  SlidersHorizontal,
} from "lucide-react";

type CategoryKey = "spending" | "income" | "bills" | "savings";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const categories: Array<{
  key: CategoryKey;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  chipClassName: string;
}> = [
  {
    key: "spending",
    label: "Spending",
    Icon: CreditCard,
    chipClassName:
      "bg-[color-mix(in_oklch,var(--primary)_12%,transparent)] text-primary dark:text-[#A4ABFF]",
  },
  {
    key: "income",
    label: "Income",
    Icon: Landmark,
    chipClassName:
      "bg-[color-mix(in_oklch,var(--chart-3)_14%,transparent)] text-[color:var(--chart-3)]",
  },
  {
    key: "bills",
    label: "Bills",
    Icon: Receipt,
    chipClassName:
      "bg-[color-mix(in_oklch,var(--secondary)_18%,transparent)] text-secondary-foreground",
  },
  {
    key: "savings",
    label: "Savings",
    Icon: PiggyBank,
    chipClassName:
      "bg-[color-mix(in_oklch,var(--chart-4)_14%,transparent)] text-[color:var(--chart-4)]",
  },
];

const chartData = [
  { label: "2–8", value: 100, tone: "primary" as const },
  { label: "9–15", value: 100, tone: "secondary" as const },
  { label: "16–22", value: 100, tone: "primary" as const },
  { label: "23–29", value: 100, tone: "secondary" as const },
  { label: "30–1", value: 100, tone: "primary" as const },
];

const mockTx = [
  { name: "Netflix", when: "1st Jan at 7:20pm", amount: -15.99, logo: "N" },
  { name: "Google", when: "5th Jan at 7:20pm", amount: -100, logo: "G" },
  { name: "Namecheap", when: "10th Jan at 7:20pm", amount: -100, logo: "N" },
  { name: "Bluehost", when: "15th Jan at 7:20pm", amount: -100, logo: "B" },
  { name: "Foodpanda", when: "20th Jan at 7:20pm", amount: -75, logo: "F" },
  { name: "Blah", when: "20th Jan at 7:20pm", amount: -75, logo: "F" },
  { name: "BlahBlah", when: "20th Jan at 7:20pm", amount: -75, logo: "F" },
  { name: "EitaNois", when: "20th Jan at 7:20pm", amount: -75, logo: "F" },
];

export default function SpendingPage() {
  const active: CategoryKey = "spending";
  const month = "January";

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
      {/* Top controls */}
      <div className="grid grid-cols-2 items-center">
        {/* Left: back button */}
        <Button variant="ghost" size="icon" asChild aria-label="Back to home">
          <Link href="/home">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>

        {/* Right: month select */}
        <div className="flex justify-end">
          <Select defaultValue={month}>
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

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Total Spend */}
            <Card className="overflow-hidden border-0 bg-primary text-primary-foreground shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Spend
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-3xl font-semibold tracking-tight">
                  $500.00
                </div>
              </CardContent>
            </Card>

            {/* Available Balance */}
            <Card className="overflow-hidden border-0 bg-secondary text-secondary-foreground shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-secondary-foreground/90">
                  Available Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-3xl font-semibold tracking-tight">
                  $20,000.00
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart card */}
          <Card className="border-b-2 border-b-primary overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Weekly breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="grid grid-cols-5 items-end gap-4 pb-6">
                {chartData.map((d) => (
                  <div
                    key={d.label}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="text-xs text-muted-foreground">
                      ${d.value}
                    </div>
                    <div
                      className={cn(
                        "w-8 rounded-md",
                        d.tone === "primary" ? "bg-primary" : "bg-secondary",
                        "h-28"
                      )}
                      aria-hidden="true"
                    />
                    <div className="text-xs text-muted-foreground">
                      {d.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category selector */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                className={cn(
                  "group flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 text-left transition",
                  "hover:bg-accent/30",
                  c.key === active &&
                    "border-primary/40 dark:border-[#A4ABFF] shadow-sm"
                )}
              >
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-full",
                    c.chipClassName
                  )}
                >
                  <c.Icon className="size-5" />
                </span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block truncate text-sm font-medium",
                      c.key === active
                        ? "text-primary dark:text-[#A4ABFF]"
                        : "text-foreground"
                    )}
                  >
                    {c.label}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right column: list */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">Spending list</CardTitle>
              <div className="mt-1 text-sm text-muted-foreground">
                Recent transactions
              </div>
            </div>

            <Button variant="outline" size="icon" aria-label="List filters">
              <SlidersHorizontal className="size-4" />
            </Button>
          </CardHeader>

          <CardContent className="max-h-[450px] overflow-y-auto">
            <div className="divide-y">
              {mockTx.map((t) => (
                <div
                  key={`${t.name}-${t.when}`}
                  className="flex items-center gap-4 py-4"
                >
                  <div className="grid size-11 place-items-center rounded-full bg-muted text-sm font-semibold">
                    {t.logo}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.when}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "text-sm font-semibold tabular-nums",
                      t.amount < 0
                        ? "text-destructive"
                        : "text-[color:var(--chart-3)]"
                    )}
                  >
                    {t.amount < 0 ? "-" : ""}${Math.abs(t.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
