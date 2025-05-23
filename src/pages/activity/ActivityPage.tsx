import { ReportState } from "@/redux/report/report.type";
import { ActivityOverviewChart } from "./_components/ActivityOverviewChart";
import { ContentWrapper } from "@/components/ContentWrapper";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { getCustomerReport, getUserReport } from "@/redux/report/report.thunk";
import { COMPARISON_VALUES } from "@/types/report";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ActivityPage() {
  const dispatch = useAppDispatch();
  const { loading, userReport, customerReport } = useAppSelector<ReportState>((selector) => selector.report);

  useEffect(() => {
    (async () => {
      await dispatch(getCustomerReport({ compareTo: COMPARISON_VALUES.YESTERDAY })).unwrap();
      await dispatch(getUserReport({ compareTo: COMPARISON_VALUES.YESTERDAY })).unwrap();
    })();
  }, []);

  return (
    <ContentWrapper className="lg:max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Activity</h1>
      </div>

      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading.getUserReport ? (
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-8 w-24" />
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground mb-1">Total Users</p>
              <p className="text-3xl font-semibold">{userReport?.totalUserOverall || 0}</p>
            </div>
          )}

          {loading.getCustomerReport ? (
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-8 w-24" />
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground mb-1">Total Customers</p>
              <p className="text-3xl font-semibold">{customerReport?.totalCustomerOverall || 0}</p>
            </div>
          )}
        </div>
      </Card>

      <ActivityOverviewChart />
    </ContentWrapper>
  );
}
