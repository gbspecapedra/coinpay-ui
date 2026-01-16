import { cn } from "@/lib/utils";
import type { CategoryDef, CategoryKey } from "../_data/types";

export function CategorySelector({
  categories,
  active,
  onChange,
}: {
  categories: CategoryDef[];
  active: CategoryKey;
  onChange: (k: CategoryKey) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {categories.map((c) => {
        const selected = c.key === active;

        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onChange(c.key)}
            className={cn(
              "group flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 text-left transition",
              "hover:bg-accent/30",
              selected && "border-primary/40 dark:border-[#A4ABFF] shadow-sm"
            )}
          >
            <span
              className={cn(
                "grid size-10 place-items-center rounded-full",
                c.chipClassName
              )}
            >
              <c.Icon className="size-5" />
            </span>

            <span className="min-w-0">
              <span
                className={cn(
                  "block truncate text-sm font-medium",
                  selected
                    ? "text-primary dark:text-[#A4ABFF]"
                    : "text-foreground"
                )}
              >
                {c.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
