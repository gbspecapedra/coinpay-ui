import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function money(v: number) {
  return v.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function SummaryCards({
  totalSpend,
  availableBalance,
}: {
  totalSpend: number;
  availableBalance: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="overflow-hidden border-0 bg-primary text-primary-foreground shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="text-3xl font-semibold tracking-tight">
            {money(totalSpend)}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 bg-secondary text-secondary-foreground shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-secondary-foreground/90">
            Available Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="text-3xl font-semibold tracking-tight">
            {money(availableBalance)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
