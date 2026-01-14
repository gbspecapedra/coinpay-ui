import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextField } from "@/components/ui/text-field";
import { Mail, Eye, Search, ArrowLeft } from "lucide-react";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function TokenSwatch({
  label,
  className,
  valueHint,
}: {
  label: string;
  className: string;
  valueHint?: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{label}</p>
          {valueHint ? (
            <p className="text-xs text-muted-foreground">{valueHint}</p>
          ) : null}
        </div>
        <code className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs text-muted-foreground">
          {className}
        </code>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className={`h-12 rounded-xl border ${className}`} />
        <div className={`rounded-xl border p-3 ${className}`}>
          <p className="text-sm font-medium">Aa 123</p>
          <p className="text-xs opacity-80">Quick contrast check</p>
        </div>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="space-y-0.5">
            <h1 className="text-xl font-semibold">Design System</h1>
            <p className="text-sm text-muted-foreground">
              Tokens + primitives (shadcn) aligned with Figma palette
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-10 px-6 py-10">
        {/* TOKENS */}
        <Section
          title="Tokens"
          description="These use shadcn token classes. If any swatch looks off, update globals.css tokens."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <TokenSwatch label="Background" className="bg-background" />
            <TokenSwatch
              label="Foreground (text sample)"
              className="bg-background text-foreground"
              valueHint="Text should be readable on background"
            />

            <TokenSwatch label="Card" className="bg-card" />
            <TokenSwatch
              label="Card Foreground"
              className="bg-card text-card-foreground"
            />

            <TokenSwatch label="Popover" className="bg-popover" />
            <TokenSwatch
              label="Popover Foreground"
              className="bg-popover text-popover-foreground"
            />

            <TokenSwatch label="Muted" className="bg-muted" />
            <TokenSwatch
              label="Muted Foreground"
              className="bg-background text-muted-foreground"
            />

            <TokenSwatch label="Accent" className="bg-accent" />
            <TokenSwatch
              label="Accent Foreground"
              className="bg-accent text-accent-foreground"
            />

            <TokenSwatch
              label="Primary"
              className="bg-primary text-primary-foreground"
              valueHint="Primary / Accent"
            />
            <TokenSwatch
              label="Secondary"
              className="bg-secondary text-secondary-foreground"
              valueHint="Secondary"
            />

            <TokenSwatch
              label="Destructive"
              className="bg-destructive text-destructive-foreground"
              valueHint="Error / destructive"
            />
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm font-medium">Focus ring sanity check</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Click the input to confirm ring color matches your Figma accent.
            </p>
            <div className="mt-4 max-w-sm">
              <Input placeholder="Click me" />
            </div>
          </div>
        </Section>

        {/* BUTTONS */}
        <Section
          title="Buttons"
          description="Validates your shadcn button styles + token mapping."
        >
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Icon button">
                <ArrowLeft className="size-4" />
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button>
                <Mail className="size-4" />
                With icon
              </Button>
              <Button isLoading aria-label="Loading">
                Loading
              </Button>
            </div>
          </div>
        </Section>

        {/* INPUTS */}
        <Section title="Inputs" description="Default shadcn Input states.">
          <div className="rounded-2xl border bg-card p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">Default</p>
                <Input placeholder="name@email.com" />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Disabled</p>
                <Input disabled placeholder="Disabled" />
              </div>
            </div>
          </div>
        </Section>

        {/* TEXT FIELD (NEW SHADCN-PATTERN COMPONENT) */}
        <Section
          title="TextField"
          description="Single component (label + helper/error + icon slots), aligned with shadcn tokens and your palette."
        >
          <div className="rounded-2xl border bg-card p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <TextField
                label="Email"
                placeholder="name@email.com"
                helperText="We’ll never share your email."
                leftIcon={<Mail className="size-4" />}
                autoComplete="email"
              />

              <TextField
                label="Password"
                type="password"
                placeholder="••••••••"
                helperText="Use at least 8 characters."
                rightIcon={<Eye className="size-4" />}
              />

              <TextField
                label="Password (error)"
                type="password"
                placeholder="••••••••"
                error="Wrong password"
              />

              <TextField label="Disabled" disabled placeholder="Disabled" />

              <div className="md:col-span-2">
                <TextField
                  label="Search"
                  placeholder="Search transactions"
                  leftIcon={<Search className="size-4" />}
                  rightIcon={
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 px-3"
                    >
                      Go
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </Section>

        {/* QUICK VISUAL REGRESSION */}
        <Section
          title="Quick visual regression"
          description="A small snapshot block to quickly spot theme issues."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-card p-5">
              <p className="text-sm font-semibold">Card</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Muted foreground example
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="sm">CTA</Button>
                <Button size="sm" variant="outline">
                  Later
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <p className="text-sm font-semibold">Form snippet</p>
              <div className="mt-4 space-y-3">
                <TextField label="Email" placeholder="Email" />
                <TextField
                  label="Password"
                  placeholder="Password"
                  type="password"
                />
                <Button className="w-full">Sign in</Button>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <p className="text-sm font-semibold">Destructive</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Error + action
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
