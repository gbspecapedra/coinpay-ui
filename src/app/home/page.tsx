import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Bell,
  ChevronRight,
  HandCoins,
  Landmark,
  Search,
  Send,
  Trophy,
  Wallet,
} from "lucide-react";

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("rounded-2xl border bg-card p-5 shadow-sm", className)}
    >
      {children}
    </section>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3 transition-colors hover:bg-muted/30">
      <span className="grid size-10 place-items-center rounded-full bg-muted">
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
      <ChevronRight className="ml-auto size-5 text-muted-foreground" />
    </div>
  );

  return href ? (
    <Link href={href} aria-label={label}>
      {content}
    </Link>
  ) : (
    content
  );
}

function TxRow({
  title,
  subtitle,
  amount,
  amountClassName,
  icon,
  href,
}: {
  title: string;
  subtitle: string;
  amount: string;
  amountClassName?: string;
  icon: React.ReactNode;
  href?: string;
}) {
  const row = (
    <div className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-muted/30">
      <span className="grid size-11 place-items-center rounded-full bg-muted">
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{title}</div>
        <div className="truncate text-xs text-muted-foreground">{subtitle}</div>
      </div>

      <div className="text-right">
        <div className={cn("text-sm font-semibold", amountClassName)}>
          {amount}
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">Today</div>
      </div>

      <ChevronRight className="size-5 text-muted-foreground" />
    </div>
  );

  return href ? (
    <Link href={href} aria-label={title}>
      {row}
    </Link>
  ) : (
    row
  );
}

export default function HomePage() {
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
      {/* Search row */}
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

      {/* Dashboard grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Balance banner */}
          <Card className="bg-primary text-primary-foreground border-transparent">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-sm text-white/80">Available Balance</div>
                <div className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                  $20,000
                </div>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
                  <span>🇺🇸</span>
                  <span className="font-medium">US Dollar</span>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[240px]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/10 px-4 py-3">
                    <div className="text-xs text-white/80">Spending</div>
                    <div className="mt-1 text-lg font-semibold">-$500</div>
                  </div>
                  <div className="rounded-xl bg-white/10 px-4 py-3">
                    <div className="text-xs text-white/80">Income</div>
                    <div className="mt-1 text-lg font-semibold">$3,000</div>
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
          </Card>

          {/* Transactions */}
          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Recent activity
                </h2>
                <p className="text-sm text-muted-foreground">
                  A quick view of what’s happening today.
                </p>
              </div>

              <Link
                href="/spending"
                className="text-sm font-medium text-primary hover:underline dark:text-[#A4ABFF]"
              >
                View all
              </Link>
            </div>

            <div className="mt-4 space-y-1">
              <TxRow
                title="Spending"
                subtitle="Coinpay card • Groceries"
                amount="-$500"
                amountClassName="text-destructive"
                icon={<Wallet className="size-5 text-primary" />}
                href="/spending"
              />
              <TxRow
                title="Income"
                subtitle="Transfer • Salary"
                amount="$3,000"
                amountClassName="text-success"
                icon={<HandCoins className="size-5 text-success" />}
              />
              <TxRow
                title="Bills"
                subtitle="Utilities • Electricity"
                amount="-$800"
                amountClassName="text-destructive"
                icon={<Landmark className="size-5 text-warning" />}
              />
              <TxRow
                title="Savings"
                subtitle="Auto-save • Weekly"
                amount="$1,000"
                amountClassName="text-warning"
                icon={<Wallet className="size-5 text-warning" />}
              />
            </div>
          </Card>
        </div>

        {/* Right rail */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Quick actions */}
          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">
                Quick actions
              </h3>
            </div>

            <div className="mt-4 space-y-3">
              <QuickAction
                label="Send money"
                icon={<Send className="size-5 text-primary" />}
              />
              <QuickAction
                label="Request money"
                icon={<HandCoins className="size-5 text-warning" />}
              />
              <QuickAction
                label="Bank transfer"
                icon={<Landmark className="size-5 text-warning" />}
              />
            </div>
          </Card>

          {/* Insights */}
          <Card>
            <h3 className="text-lg font-semibold tracking-tight">Insights</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your month at a glance.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <StatPill label="This month spent" value="$2,140" />
              <StatPill label="Saved so far" value="$620" />
              <StatPill label="Upcoming bills" value="$410" />
              <StatPill label="Budget remaining" value="$860" />
            </div>
          </Card>
        </aside>
      </div>
    </PageShell>
  );
}
