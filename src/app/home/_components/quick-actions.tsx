import Link from "next/link";
import { ChevronRight, HandCoins, Landmark, Send } from "lucide-react";
import { SectionCard } from "./section-card";

function QuickAction({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3 transition-colors hover:bg-muted/30">
      <span className="grid size-10 place-items-center rounded-full bg-muted">
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
      <ChevronRight className="ml-auto size-5 text-muted-foreground" />
    </div>
  );

  return href ? (
    <Link href={href} aria-label={label}>
      {content}
    </Link>
  ) : (
    content
  );
}

export function QuickActions() {
  return (
    <SectionCard>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Quick actions</h3>
      </div>

      <div className="mt-4 space-y-3">
        <QuickAction
          label="Send money"
          icon={<Send className="size-5 text-primary dark:text-[#A4ABFF]" />}
        />
        <QuickAction
          label="Request money"
          icon={<HandCoins className="size-5 text-secondary-foreground" />}
        />
        <QuickAction
          label="Bank transfer"
          icon={<Landmark className="size-5 text-secondary-foreground" />}
        />
      </div>
    </SectionCard>
  );
}
