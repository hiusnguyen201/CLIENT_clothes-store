"use client";

import { SALE_VALUES, SaleReport } from "@/types/report";
import moment from "moment-timezone";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SalesStatsChart({ type, sales }: { type: SALE_VALUES; sales: SaleReport[] }) {
  let unit = "hours";
  let format = "H A";
  switch (type) {
    case SALE_VALUES.LAST_24_HOURS:
      unit = "hours";
      format = "MMM D, H A";
      break;
    case SALE_VALUES.LAST_WEEK:
      unit = "days";
      format = "MMM D";
      break;
    case SALE_VALUES.LAST_MONTH:
      unit = "weeks";
      format = "MMM D, YYYY";
      break;
    case SALE_VALUES.LAST_6_MONTH:
      unit = "months";
      format = "MMM D, YYYY";
      break;
    case SALE_VALUES.YEAR:
      unit = "months";
      format = "MMM D, YYYY";
      break;
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sales.map((item) => ({ value: item.sales, date: item.endDate }))}>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background shadow-sm">
                    <div className="grid grid-cols-2 gap-2 px-6 py-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Sales</span>
                        <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground capitalize">{unit}</span>
                        <span className="font-bold">
                          {moment(payload[0].payload.date).tz("Asia/Ho_Chi_Minh").format(format)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <XAxis
            dataKey="date"
            tickFormatter={(date) =>
              moment(date)
                .tz("Asia/Ho_Chi_Minh")
                .format(type === SALE_VALUES.LAST_24_HOURS ? "H A" : format)
            }
          />
          <YAxis allowDecimals={false} />
          <Line type="monotone" dataKey="value" stroke="hsl(231 75.3% 57.1%)" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
