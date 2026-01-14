export function getCountryFromLocale(): string | null {
  if (typeof navigator === "undefined") return null;

  const locale = navigator.languages?.[0] ?? navigator.language ?? null;

  if (!locale) return null;

  const parts = locale.split("-");
  return parts.length > 1 ? parts[1].toUpperCase() : null;
}
