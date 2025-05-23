import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ReportState } from "@/redux/report/report.type";
import { useEffect, useState } from "react";
import { getSalesReport } from "@/redux/report/report.thunk";
import { Card } from "@/components/ui/card";
import { SalesStatsChart } from "./SalesStatsChart";
import { SALE_VALUES } from "@/types/report";
import { SelectFormField } from "@/components/form-fields";
import { Spinner } from "@/components/spinner";

export function SalesOverviewChart() {
  const dispatch = useAppDispatch();
  const { salesReport, loading } = useAppSelector<ReportState>((selector) => selector.report);
  const [type, setType] = useState<SALE_VALUES>(SALE_VALUES.LAST_WEEK);

  useEffect(() => {
    (async () => {
      await dispatch(getSalesReport({ type })).unwrap();
    })();
  }, [type]);

  return (
    <Card className="mt-6 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
        <div className="flex gap-2">
          <Spinner className="size-5" show={loading.getSalesReport} />
          <SelectFormField
            className="min-w-[140px]"
            name="type"
            value={type}
            onValueChange={(value) => setType(value || SALE_VALUES.LAST_WEEK)}
            options={Object.values(SALE_VALUES).map((item) => ({ title: item.replace(/-/g, " "), value: item }))}
          />
        </div>
      </div>
      <SalesStatsChart type={type} sales={salesReport} />
    </Card>
  );
}
