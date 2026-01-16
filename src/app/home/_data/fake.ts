import { faker } from "@faker-js/faker";
import type { CategoryKey, Transaction } from "@/app/spending/_data/types";
import { buildSpendingDataset } from "@/app/spending/_data/fake";

export type HomeInsights = {
  monthSpent: number;
  savedSoFar: number;
  upcomingBills: number;
  budgetRemaining: number;
};

export type HomeSummary = {
  spending: number; // negative
  income: number; // positive
  bills: number; // negative
  savings: number; // positive
};

export type HomeModel = {
  currency: { flag: string; label: string };
  availableBalance: number;
  summary: HomeSummary;
  insights: HomeInsights;
  recent: Array<{
    key: CategoryKey;
    title: string;
    subtitle: string;
    amount: number;
  }>;
  recentTransactions: Transaction[];
};

function sumByCategory(tx: Transaction[], key: CategoryKey) {
  return tx
    .filter((t) => t.category === key)
    .reduce((acc, t) => acc + t.amount, 0);
}

export function buildHomeModel(params: { month: string }) {
  const { month } = params;

  // Reutiliza o mesmo gerador do Spending para ficar consistente
  const base = buildSpendingDataset({
    month,
    active: "spending",
    count: 22,
  });

  const tx = base.transactions;

  const spending = sumByCategory(tx, "spending"); // negative
  const income = sumByCategory(tx, "income"); // positive
  const bills = sumByCategory(tx, "bills"); // negative
  const savings = sumByCategory(tx, "savings"); // positive

  // Deixa o Home “estável” para o mês (sem mudar a cada render)
  // (mesma lógica do spending: seed determinístico por mês)
  faker.seed(month.length * 999 + 77);

  const monthSpentAbs =
    Math.abs(spending) +
    Math.abs(bills) +
    faker.number.float({ min: 40, max: 220, fractionDigits: 2 });

  const savedSoFar =
    Math.max(0, savings) +
    faker.number.float({ min: 30, max: 120, fractionDigits: 2 });

  const upcomingBills = faker.number.float({
    min: 120,
    max: 680,
    fractionDigits: 2,
  });

  const budgetTotal = faker.number.float({
    min: 1800,
    max: 4500,
    fractionDigits: 2,
  });

  const budgetRemaining = Math.max(0, budgetTotal - monthSpentAbs);

  // Recent activity: 4 linhas principais (mesma ordem do seu UI)
  const recent = [
    {
      key: "spending" as const,
      title: "Spending",
      subtitle: "Coinpay card • Groceries",
      amount: spending, // negative
    },
    {
      key: "income" as const,
      title: "Income",
      subtitle: "Transfer • Salary",
      amount: income, // positive
    },
    {
      key: "bills" as const,
      title: "Bills",
      subtitle: "Utilities • Electricity",
      amount: bills, // negative
    },
    {
      key: "savings" as const,
      title: "Savings",
      subtitle: "Auto-save • Weekly",
      amount: savings, // positive
    },
  ];

  return {
    currency: { flag: "🇺🇸", label: "US Dollar" },
    availableBalance: base.availableBalance,
    summary: { spending, income, bills, savings },
    insights: {
      monthSpent: monthSpentAbs,
      savedSoFar,
      upcomingBills,
      budgetRemaining,
    },
    recent,
    recentTransactions: tx.slice(0, 6),
  } satisfies HomeModel;
}
