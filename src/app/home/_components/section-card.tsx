import { cn } from "@/lib/utils";

export function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("rounded-2xl border bg-card p-5 shadow-sm", className)}
    >
      {children}
    </section>
  );
}
