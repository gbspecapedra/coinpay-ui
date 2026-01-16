import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, HandCoins, Landmark, Wallet } from "lucide-react";

import type { CategoryKey } from "@/app/spending/_data/types";
import { SectionCard } from "./section-card";

function moneySigned(v: number) {
  const abs = Math.abs(v).toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return v < 0 ? `-${abs}` : abs;
}

function iconFor(key: CategoryKey) {
  if (key === "income")
    return <HandCoins className="size-5 text-[color:var(--chart-3)]" />;
  if (key === "bills")
    return <Landmark className="size-5 text-secondary-foreground" />;
  if (key === "savings")
    return <Wallet className="size-5 text-[color:var(--chart-4)]" />;
  return <Wallet className="size-5 text-primary dark:text-[#A4ABFF]" />;
}

function amountClass(v: number, key: CategoryKey) {
  if (v < 0) return "text-destructive";
  if (key === "income") return "text-[color:var(--chart-3)]";
  if (key === "savings") return "text-[color:var(--chart-4)]";
  return "text-foreground";
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

export function RecentActivity({
  rows,
  month,
}: {
  rows: Array<{
    key: CategoryKey;
    title: string;
    subtitle: string;
    amount: number;
  }>;
  month: string;
}) {
  return (
    <SectionCard>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Recent activity
          </h2>
          <p className="text-sm text-muted-foreground">
            A quick view of what&apos;s happening today.
          </p>
        </div>

        <Link
          href={`/spending?month=${encodeURIComponent(month)}`}
          className="text-sm font-medium text-primary hover:underline dark:text-[#A4ABFF]"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-1">
        {rows.map((r) => (
          <TxRow
            key={r.key}
            title={r.title}
            subtitle={r.subtitle}
            amount={moneySigned(r.amount)}
            amountClassName={amountClass(r.amount, r.key)}
            icon={iconFor(r.key)}
            href={r.key === "spending" ? "/spending" : undefined}
          />
        ))}
      </div>
    </SectionCard>
  );
}
