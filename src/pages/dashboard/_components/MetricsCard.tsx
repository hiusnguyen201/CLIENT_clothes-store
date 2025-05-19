import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { COMPARISON_VALUES } from "@/types/report";
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    percentage: string;
    isPositive: boolean;
    unitCompare: COMPARISON_VALUES;
  };
  chart?: React.ReactNode;
}

const getCompareText = (unit: COMPARISON_VALUES) => {
  switch (unit) {
    case COMPARISON_VALUES.YESTERDAY:
      return "from yesterday";

    case COMPARISON_VALUES.MONTHLY:
      return "from last month";

    case COMPARISON_VALUES.YEARLY:
      return "from last year";

    default:
      return "";
  }
};

export function MetricsCard({ title, value, change, chart }: MetricsCardProps) {
  return (
    <Card className="p-4 bg-background/50 backdrop-blur h-[150px]">
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <h3>{title}</h3>
        {chart}
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-2xl font-bold">{value}</p>
          <div className="flex items-center gap-1 text-gray-500">
            <span className="text-sm">+{change.value}</span>
            <span className="text-sm">{getCompareText(change.unitCompare)}</span>
          </div>
          <span className={`text-sm flex items-center gap-1 ${change.isPositive ? "text-green-500" : "text-red-500"}`}>
            {change.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {change.percentage}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function MetricsCardSkeleton() {
  return (
    <Card className="p-4 bg-background/50 backdrop-blur h-[150px]">
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </Card>
  );
}
