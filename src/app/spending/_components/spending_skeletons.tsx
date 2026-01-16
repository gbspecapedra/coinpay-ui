import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SummaryCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="overflow-hidden border-0 bg-primary text-primary-foreground shadow-sm">
        <CardHeader>
          <Skeleton className="h-4 w-24 bg-primary-foreground/20" />
        </CardHeader>
        <CardContent className="pb-6">
          <Skeleton className="h-9 w-36 bg-primary-foreground/20" />
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 bg-secondary text-secondary-foreground shadow-sm">
        <CardHeader>
          <Skeleton className="h-4 w-32 bg-secondary-foreground/20" />
        </CardHeader>
        <CardContent className="pb-6">
          <Skeleton className="h-9 w-44 bg-secondary-foreground/20" />
        </CardContent>
      </Card>
    </div>
  );
}

export function WeeklyChartSkeleton() {
  return (
    <Card className="overflow-hidden border-b-2 border-b-primary">
      <CardHeader className="pb-3">
        <Skeleton className="h-4 w-36" />
      </CardHeader>

      <CardContent className="pb-6">
        <div className="grid grid-cols-5 items-end gap-4 pb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-28 w-8 rounded-md" />
              <Skeleton className="h-3 w-10" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3"
        >
          <Skeleton className="size-10 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TransactionListSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>
        <Skeleton className="size-9 rounded-md" />
      </CardHeader>

      <CardContent className="max-h-[450px] overflow-y-auto">
        <div className="divide-y">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4">
              <Skeleton className="size-11 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
