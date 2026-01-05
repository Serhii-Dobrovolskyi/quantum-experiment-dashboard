import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";


type Point = {
  t: string;
  fidelity: number;
};

export function FidelityLineChart({ data }: { data: Point[] }) {
  const formatValue: TooltipProps<number, string>["formatter"] = (value) => {
  if (typeof value !== "number") return "—";
  return `${(value * 100).toFixed(2)}%`;
};

const formatLabel: TooltipProps<number, string>["labelFormatter"] = (label) => {
  return `Time: ${label}`;
};


  return (
    <div className="mt-4 h-64">
      <ResponsiveContainer width="100%" height={256}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" />
          <YAxis
            domain={[0.97, 1]}
            tickFormatter={(v) => `${Math.round(v * 100)}%`}
          />
          <Tooltip
            formatter={formatValue}
            labelFormatter={formatLabel}
          />
          <Line
            type="monotone"
            dataKey="fidelity"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
