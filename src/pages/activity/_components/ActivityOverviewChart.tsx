import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ReportState } from "@/redux/report/report.type";
import { useEffect, useState } from "react";
import { getActivityReport } from "@/redux/report/report.thunk";
import { Card } from "@/components/ui/card";
import { ActivityStatsChart } from "./ActivityStatsChart";
import { ACTIVITY_VALUES } from "@/types/report";
import { SelectFormField } from "@/components/form-fields";
import { Spinner } from "@/components/spinner";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { Info } from "lucide-react";

export function ActivityOverviewChart() {
  const dispatch = useAppDispatch();
  const { activityReport, loading } = useAppSelector<ReportState>((selector) => selector.report);
  const [type, setType] = useState<ACTIVITY_VALUES>(ACTIVITY_VALUES.LAST_7_DAYS);

  useEffect(() => {
    (async () => {
      await dispatch(getActivityReport({ type })).unwrap();
    })();
  }, [type]);

  return (
    <Card className="mt-6 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-3">
          Daily Active Users{" "}
          <TooltipWrapper
            className=""
            content="Unique users with a successful authentication or authorization activity."
          >
            <Info />
          </TooltipWrapper>
        </h2>
        <div className="flex gap-2">
          <Spinner className="size-5" show={loading.getActivityReport} />
          <SelectFormField
            className="min-w-[140px]"
            name="type"
            value={type}
            onValueChange={(value) => setType(value || ACTIVITY_VALUES.LAST_7_DAYS)}
            options={Object.values(ACTIVITY_VALUES).map((item) => ({ title: item.replace(/-/g, " "), value: item }))}
          />
        </div>
      </div>
      <ActivityStatsChart data={activityReport} />
    </Card>
  );
}
