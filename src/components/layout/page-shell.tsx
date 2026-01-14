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
  md: "max-w-2xl",
  lg: "max-w-4xl",
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
  size = "sm",
  variant = "card",
  className,
  contentClassName,
}: PageShellProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <div className={cn("mx-auto w-full px-4 py-6 sm:py-10", sizeMap[size])}>
        <header className="mb-6 flex h-14 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {backHref ? (
              <Button variant="ghost" size="icon" asChild aria-label="Back">
                <Link href={backHref}>
                  <ChevronLeft className="size-5" />
                </Link>
              </Button>
            ) : (
              <Logo className="h-6 sm:h-7" />
            )}

            {headerLeft ? (
              <div className="flex items-center gap-2">{headerLeft}</div>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {headerRight}
            {showThemeToggle ? <ThemeToggle /> : null}
          </div>
        </header>

        {(title || description) && (
          <div className="mb-6 space-y-2">
            {title ? (
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {title}
              </h1>
            ) : null}
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
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
      </div>
    </div>
  );
}
