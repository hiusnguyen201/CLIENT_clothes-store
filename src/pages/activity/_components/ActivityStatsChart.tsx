"use client";

import { ACTIVITY_VALUES, ActivityReport } from "@/types/report";
import moment from "moment-timezone";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ActivityStatsChart({ data }: { data: ActivityReport[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map((item) => ({ value: item.amount, date: item.endDate }))}>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background shadow-sm">
                    <div className="flex flex-col px-6 py-2">
                      <span className="text-xs text-muted-foreground">
                        {moment(payload[0].payload.date).tz("Asia/Ho_Chi_Minh").format("MMM D")}
                      </span>
                      <span className="font-bold">{payload[0].value} Users</span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <XAxis dataKey="date" tickFormatter={(date) => moment(date).tz("Asia/Ho_Chi_Minh").format("MMM D")} />
          <YAxis allowDecimals={false} />
          <Line type="monotone" dataKey="value" stroke="hsl(231 75.3% 57.1%)" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
