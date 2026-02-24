"use client";

import { useSyncExternalStore } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ChartPoint } from "@/lib/landing-content";

type UsageChartProps = {
  data: ChartPoint[];
};

const emptySubscribe = () => () => {};

export default function UsageChart({ data }: UsageChartProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!isClient) {
    return <div className="h-64 w-full rounded-lg bg-bg-01" />;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="requestsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4fd1c5" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#4fd1c5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#223247" />
          <XAxis dataKey="day" stroke="#7f8ea5" tickLine={false} axisLine={false} />
          <YAxis stroke="#7f8ea5" tickLine={false} axisLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
          <Tooltip
            cursor={{ stroke: "#2f8f9b", strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #2d3a4f",
              backgroundColor: "#101826",
              color: "#f3f8ff",
            }}
          />
          <Area
            type="monotone"
            dataKey="requests"
            stroke="#4fd1c5"
            fillOpacity={1}
            fill="url(#requestsGradient)"
            strokeWidth={2}
            name="Requests"
          />
          <Area
            type="monotone"
            dataKey="cost"
            stroke="#60a5fa"
            fillOpacity={1}
            fill="url(#costGradient)"
            strokeWidth={2}
            name="Cost (JPY)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
