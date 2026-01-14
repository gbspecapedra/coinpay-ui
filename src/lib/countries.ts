import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import en from "react-phone-number-input/locale/en.json";

export type CountryCode = {
  code: string; // ISO2 (US, CA, BR)
  name: string;
  dial: string; // +1, +55
  flag: string; // 🇺🇸
};

// Turn ISO country code into emoji flag
function isoToFlagEmoji(iso: string) {
  // ISO must be A-Z
  const codePoints = iso
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function buildDefaultCountries(): CountryCode[] {
  const countries = getCountries();

  const list = countries.map((iso) => {
    const name = (en as Record<string, string>)[iso] ?? iso;
    const dial = `+${getCountryCallingCode(iso)}`;
    return {
      code: iso,
      name,
      dial,
      flag: isoToFlagEmoji(iso),
    };
  });

  // Sort by name, but keep common ones near top if you like
  const preferred = new Set(["CA", "US", "BR", "PT", "GB"]);
  return list.sort((a, b) => {
    const ap = preferred.has(a.code) ? 0 : 1;
    const bp = preferred.has(b.code) ? 0 : 1;
    if (ap !== bp) return ap - bp;
    return a.name.localeCompare(b.name);
  });
}

export const COUNTRIES = buildDefaultCountries();
export const DEFAULT_COUNTRY: CountryCode = {
  code: "US",
  name: "United States",
  dial: "+1",
  flag: "🇺🇸",
};
