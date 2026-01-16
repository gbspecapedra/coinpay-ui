import type * as React from "react";

export type CategoryKey = "spending" | "income" | "bills" | "savings";

export type CategoryDef = {
  key: CategoryKey;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  chipClassName: string;
};

export type WeekBarTone = "primary" | "secondary";

export type WeekBar = {
  label: string;
  value: number;
  tone: WeekBarTone;
};

export type Transaction = {
  id: string;
  name: string;
  when: string;
  amount: number;
  logo: string;
  category: CategoryKey;
  dateISO: string;
};
