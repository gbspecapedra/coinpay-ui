"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { CountryCodeSelect } from "@/components/country-code-select";
import {
  COUNTRIES,
  type CountryCode,
  DEFAULT_COUNTRY,
  getCountryFromLocale,
} from "@/lib/countries";
import { formatPhoneAsYouType, isValidPhone, toE164 } from "@/lib/phone";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [phone, setPhone] = useState(""); // formatted display value
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);

  useEffect(() => {
    const localeCountry = getCountryFromLocale();
    if (!localeCountry) return;

    const match = COUNTRIES.find((c) => c.code === localeCountry);
    if (match) setCountry(match);
  }, []);

  useEffect(() => {
    if (!phone) return;
    setPhone(formatPhoneAsYouType(phone, country.code));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country.code]);

  const phoneValid = useMemo(() => {
    if (!phone.trim()) return true;
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
      await new Promise((r) => setTimeout(r, 600));
      // push("/home") later
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell
      size="lg"
      variant="plain"
      title="Welcome back"
      description="Log in to access your dashboard, cards, and spending insights."
      contentClassName="space-y-6"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Form column */}
        <section className="lg:col-span-5">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-5 space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">
                Log in to Coinpay
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your registered mobile number to log in.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Phone
                </label>

                <div className="flex items-start gap-2">
                  <CountryCodeSelect
                    value={country}
                    onChange={setCountry}
                    countries={COUNTRIES}
                    className="shrink-0"
                  />

                  <TextField
                    label={undefined}
                    placeholder="Mobile number"
                    value={phone}
                    onChange={(e) => {
                      const next = formatPhoneAsYouType(
                        e.target.value,
                        country.code
                      );
                      setPhone(next);
                    }}
                    inputMode="tel"
                    autoComplete="tel"
                    leftIcon={<Phone className="size-4" />}
                    className="w-full"
                    containerClassName="flex-1 min-w-0"
                    error={
                      !phoneValid ? "Enter a valid phone number." : undefined
                    }
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

              <p className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link href="#" className="underline underline-offset-4">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </section>

        {/* Right panel */}
        <aside className="lg:col-span-7">
          <div
            className={cn(
              "h-full rounded-2xl border bg-card p-6 shadow-sm",
              "overflow-hidden"
            )}
          >
            {/* Banner */}
            <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Sparkles className="size-4" />
                Sleek, modern, intuitive
              </div>

              <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Your money, organized.
              </h3>

              <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
                Coinpay helps you track spending, plan ahead, and manage cards
                in one clean dashboard.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white/10 px-4 py-3">
                  <div className="text-xs text-white/80">Balance</div>
                  <div className="mt-1 text-lg font-semibold">$20,000</div>
                </div>
                <div className="rounded-xl bg-white/10 px-4 py-3">
                  <div className="text-xs text-white/80">This month</div>
                  <div className="mt-1 text-lg font-semibold">-$500</div>
                </div>
                <div className="rounded-xl bg-white/10 px-4 py-3">
                  <div className="text-xs text-white/80">Savings</div>
                  <div className="mt-1 text-lg font-semibold">$1,000</div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border bg-background p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" />
                  <h4 className="text-sm font-semibold">Secure by default</h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Clean authentication flows with sensible validation and safe
                  defaults.
                </p>
              </div>

              <div className="rounded-2xl border bg-background p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-warning" />
                  <h4 className="text-sm font-semibold">
                    Designed to feel good
                  </h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dark/light themes, crisp spacing, and components aligned with
                  the system palette.
                </p>
              </div>
            </div>

            {/* Small footer note */}
            <div className="mt-6 text-xs text-muted-foreground">
              Tip: Use the theme toggle in the top-right to preview both themes.
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
