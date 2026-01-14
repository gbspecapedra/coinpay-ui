"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";
import { CountryCodeSelect } from "@/components/country-code-select";
import {
  COUNTRIES,
  type CountryCode,
  DEFAULT_COUNTRY,
  getCountryFromLocale,
} from "@/lib/countries";
import { formatPhoneAsYouType, isValidPhone, toE164 } from "@/lib/phone";

export default function LoginPage() {
  const [phone, setPhone] = useState(""); // formatted display value
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);

  // Infer default country from user locale
  useEffect(() => {
    const localeCountry = getCountryFromLocale();
    if (!localeCountry) return;

    const match = COUNTRIES.find((c) => c.code === localeCountry);
    if (match) setCountry(match);
  }, []);

  // If user switches country after typing, reformat the same input under the new rules
  useEffect(() => {
    if (!phone) return;
    setPhone(formatPhoneAsYouType(phone, country.code));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country.code]);

  const phoneValid = useMemo(() => {
    if (!phone.trim()) return true; // don’t show error when empty
    return isValidPhone(phone, country.code);
  }, [phone, country.code]);

  const canSubmit =
    phone.trim().length > 0 &&
    password.trim().length > 0 &&
    phoneValid &&
    !isSubmitting;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const e164 = toE164(phone, country.code);
    if (!e164) return;

    setIsSubmitting(true);
    try {
      // TODO: replace with real auth
      // Send: { phone: e164, country: country.code, password }
      await new Promise((r) => setTimeout(r, 600));
      // push("/home") later
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell
      title="Log in to Coinpay"
      description="Enter your registered mobile number to log in."
      size="sm"
      variant="card"
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Phone row: country + phone input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone</label>

          <div className="flex gap-2">
            <CountryCodeSelect
              value={country}
              onChange={setCountry}
              countries={COUNTRIES}
            />

            <TextField
              label={undefined}
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => {
                const next = formatPhoneAsYouType(e.target.value, country.code);
                setPhone(next);
              }}
              inputMode="tel"
              autoComplete="tel"
              leftIcon={<Phone className="size-4" />}
              className="w-full"
              error={!phoneValid ? "Enter a valid phone number." : undefined}
            />
          </div>
        </div>

        {/* Password */}
        <TextField
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          leftIcon={<Lock className="size-4" />}
          rightIcon={
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          }
        />

        <div className="flex items-center justify-between">
          <Link
            href="#"
            className="text-sm text-primary hover:underline dark:text-[#A4ABFF]"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-full"
          disabled={!canSubmit}
          isLoading={isSubmitting}
        >
          Log in
        </Button>
      </form>
    </PageShell>
  );
}
