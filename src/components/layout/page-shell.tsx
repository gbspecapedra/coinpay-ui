import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";

type ShellSize = "sm" | "md" | "lg" | "full";
type ShellVariant = "card" | "plain";

export type PageShellProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  backHref?: string;
  showThemeToggle?: boolean;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
  size?: ShellSize;
  variant?: ShellVariant;
  className?: string;
  contentClassName?: string;
};

const sizeMap: Record<ShellSize, string> = {
  sm: "max-w-md",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  full: "max-w-none",
};

export function PageShell({
  children,
  title,
  description,
  backHref,
  showThemeToggle = true,
  headerRight,
  headerLeft,
  size = "md",
  variant = "plain",
  className,
  contentClassName,
}: PageShellProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div
          className={cn(
            "mx-auto flex h-16 w-full items-center gap-3 px-4",
            sizeMap[size]
          )}
        >
          <div className="flex items-center gap-3">
            {backHref ? (
              <Button variant="ghost" size="icon" asChild aria-label="Back">
                <Link href={backHref}>
                  <ChevronLeft className="size-5" />
                </Link>
              </Button>
            ) : (
              // control logo height from here
              <Logo className="h-6 sm:h-7" />
            )}

            {headerLeft ? (
              <div className="flex items-center gap-2">{headerLeft}</div>
            ) : null}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {headerRight}
            {showThemeToggle ? <ThemeToggle /> : null}
          </div>
        </div>
      </div>

      {/* Page content */}
      <main className={cn("mx-auto w-full px-4 py-8", sizeMap[size])}>
        {(title || description) && (
          <div className="mb-6 space-y-2">
            {title ? (
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h1>
            ) : null}
            {description ? (
              <p className="text-sm text-muted-foreground sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
        )}

        {variant === "card" ? (
          <div
            className={cn(
              "rounded-2xl border bg-card p-5 shadow-sm sm:p-6",
              contentClassName
            )}
          >
            {children}
          </div>
        ) : (
          <div className={cn(contentClassName)}>{children}</div>
        )}
      </main>
    </div>
  );
}
