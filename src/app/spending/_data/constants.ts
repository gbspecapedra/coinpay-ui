import { CreditCard, Landmark, PiggyBank, Receipt } from "lucide-react";
import type { CategoryDef } from "./types";

export const CATEGORIES: CategoryDef[] = [
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
