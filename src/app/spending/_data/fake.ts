import { faker } from "@faker-js/faker";
import type { CategoryKey, Transaction, WeekBar } from "./types";

const MERCHANT_SEEDS: Array<{ name: string; category: CategoryKey }> = [
  { name: "Netflix", category: "spending" },
  { name: "Google", category: "bills" },
  { name: "Namecheap", category: "bills" },
  { name: "Bluehost", category: "bills" },
  { name: "Foodpanda", category: "spending" },
  { name: "Uber", category: "spending" },
  { name: "Spotify", category: "bills" },
  { name: "Apple", category: "bills" },
  { name: "Amazon", category: "spending" },
  { name: "Payroll", category: "income" },
  { name: "Savings Transfer", category: "savings" },
];

function monthIndex(month: string) {
  const idx = [
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
  ].indexOf(month);
  return idx >= 0 ? idx : 0;
}

function makeSeed(month: string, category: CategoryKey) {
  return monthIndex(month) * 1000 + category.length * 1337 + 42;
}

function formatWhen(date: Date) {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const mon = date.toLocaleString("en-US", { month: "short" });
  const time = date
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    .toLowerCase()
    .replace(" ", "");

  return `${day}${suffix} ${mon} at ${time}`;
}

function merchantName(i: number) {
  const useSeed = faker.number.int({ min: 1, max: 100 }) <= 60;
  if (useSeed) return MERCHANT_SEEDS[i % MERCHANT_SEEDS.length].name;
  return faker.company.name();
}

function merchantCategory(i: number, fallback: CategoryKey) {
  const useSeed = faker.number.int({ min: 1, max: 100 }) <= 65;
  if (useSeed) return MERCHANT_SEEDS[i % MERCHANT_SEEDS.length].category;
  return fallback;
}

function logoMark(name: string) {
  const first = name.trim().charAt(0).toUpperCase();
  if (!first) return "•";
  return /[A-Z0-9]/.test(first) ? first : "•";
}

export function buildSpendingDataset(params: {
  month: string;
  active: CategoryKey;
  count?: number;
}) {
  const { month, active, count = 16 } = params;

  faker.seed(makeSeed(month, active));

  // Build transactions
  const year = new Date().getFullYear();
  const mIdx = monthIndex(month);

  const tx: Transaction[] = Array.from({ length: count }).map((_, i) => {
    const day = faker.number.int({ min: 1, max: 28 });
    const hour = faker.number.int({ min: 8, max: 21 });
    const minute = faker.helpers.arrayElement([
      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
    ]);

    const dt = new Date(year, mIdx, day, hour, minute, 0, 0);

    const name = merchantName(i);
    const category = merchantCategory(i, active);

    // amount:
    // - income positive
    // - savings can be positive (deposit) or negative (withdrawal), we keep it mostly positive
    // - bills/spending mostly negative
    const raw = faker.number.float({ min: 5, max: 220, fractionDigits: 2 });

    let amount = -raw;
    if (category === "income")
      amount = faker.number.float({ min: 500, max: 4500, fractionDigits: 2 });
    if (category === "savings")
      amount = faker.number.float({ min: 20, max: 900, fractionDigits: 2 });

    return {
      id: faker.string.uuid(),
      name,
      when: formatWhen(dt),
      amount,
      logo: logoMark(name),
      category,
      dateISO: dt.toISOString(),
    };
  });

  // Totals
  const totalSpend = tx
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const availableBalance =
    faker.number.float({ min: 5000, max: 60000, fractionDigits: 2 }) +
    faker.number.float({ min: 0, max: 999, fractionDigits: 2 });

  // Weekly bars for the chart
  const weeks: WeekBar[] = [
    {
      label: "2–8",
      value: faker.number.int({ min: 40, max: 180 }),
      tone: "primary",
    },
    {
      label: "9–15",
      value: faker.number.int({ min: 40, max: 180 }),
      tone: "secondary",
    },
    {
      label: "16–22",
      value: faker.number.int({ min: 40, max: 180 }),
      tone: "primary",
    },
    {
      label: "23–29",
      value: faker.number.int({ min: 40, max: 180 }),
      tone: "secondary",
    },
    {
      label: "30–1",
      value: faker.number.int({ min: 40, max: 180 }),
      tone: "primary",
    },
  ];

  // Sort transactions newest-first for the list
  const txSorted = [...tx].sort((a, b) => b.dateISO.localeCompare(a.dateISO));

  return {
    totalSpend,
    availableBalance,
    weeks,
    transactions: txSorted,
  };
}
