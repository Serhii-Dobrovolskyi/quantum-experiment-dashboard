import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";

type QubitBar = {
  id: string;
  error: number; // 0..1
};

export function ErrorBarChart({ data }: { data: QubitBar[] }) {
  const formatValue: TooltipProps<number, string>["formatter"] = (value) => {
    if (typeof value !== "number") return "—";
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatLabel: TooltipProps<number, string>["labelFormatter"] = (label) => {
    return `Qubit: ${label}`;
  };

  return (
    <div className="mt-4 h-64 min-h-[256px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={18}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis
            domain={[0, 0.03]}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          />
          <Tooltip formatter={formatValue} labelFormatter={formatLabel} />
          <Bar dataKey="error" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
