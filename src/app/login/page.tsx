"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";
import { CountryCodeSelect } from "@/components/country-code-select";
import { COUNTRIES, CountryCode, DEFAULT_COUNTRY } from "@/lib/countries";
import { getCountryFromLocale } from "@/lib/get-country-from-locale";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);

  const canSubmit = phone.trim().length > 0 && password.trim().length > 0;

  useEffect(() => {
    const localeCountry = getCountryFromLocale();
    if (!localeCountry) return;

    const match = COUNTRIES.find((c) => c.code === localeCountry);

    if (match) {
      setCountry(match);
    }
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // TODO: replace with real auth
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
        {/* Phone row: country + phone input (mobile-first, matches the Figma layout) */}
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
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              leftIcon={<Phone className="size-4" />}
              className="w-full"
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
