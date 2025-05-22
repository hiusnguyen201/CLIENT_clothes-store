import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function ImportResultsSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-slate-50 p-6 border-b">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Badge className="bg-muted text-muted-foreground hover:bg-muted">
              <Skeleton className="h-4 w-16" />
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-md border">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <Skeleton className="h-5 w-40 mb-3" />
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
