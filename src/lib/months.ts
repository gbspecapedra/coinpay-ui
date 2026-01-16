export const MONTHS = [
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

export type MonthName = (typeof MONTHS)[number];

export function getCurrentMonthName(): MonthName {
  const idx = new Date().getMonth(); // 0..11
  return MONTHS[idx];
}

export function coerceMonth(value?: string | null): MonthName {
  if (!value) return getCurrentMonthName();
  const found = MONTHS.find((m) => m.toLowerCase() === value.toLowerCase());
  return found ?? getCurrentMonthName();
}
