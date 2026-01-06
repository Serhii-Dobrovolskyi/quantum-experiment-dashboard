type Props = {
  label: string;
  value: string;
  sub?: string;
};

export function KpiCard({ label, value, sub }: Props) {
  return (
    <div className="rounded-2xl bg-blue-50 shadow-sm ring-1 ring-blue-200 p-5">
      <div className="text-sm text-blue-700">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
      {sub ? <div className="mt-2 text-sm text-slate-500">{sub}</div> : null}
    </div>
  );
}
