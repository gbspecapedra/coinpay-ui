/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsYouType } from "libphonenumber-js";

export function formatPhoneAsYouType(value: string, countryCode?: string) {
  // value can include digits + spaces + punctuation; AsYouType handles it
  const ayt = new AsYouType(countryCode as any);
  return ayt.input(value);
}

export function toE164(value: string, countryCode?: string) {
  const ayt = new AsYouType(countryCode as any);
  ayt.input(value);
  const phone = ayt.getNumber();
  return phone?.number ?? null; // e.g. "+14165551234"
}

export function isValidPhone(value: string, countryCode?: string) {
  const ayt = new AsYouType(countryCode as any);
  ayt.input(value);
  const phone = ayt.getNumber();
  return phone?.isValid() ?? false;
}
