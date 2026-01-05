type HeatmapRow = {
  row: string;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
};

const cols: Array<keyof Omit<HeatmapRow, "row">> = ["c1", "c2", "c3", "c4", "c5"];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Переводим значение 0.84..0.97 в “интенсивность” фона (научный, спокойный вид)
function cellBg(v: number) {
  const t = (v - 0.84) / (0.97 - 0.84); // 0..1 примерно
  const k = clamp(t, 0, 1);
  const shade = Math.round(245 - k * 55); // 245..190
  return `rgb(${shade}, ${shade + 3}, 255)`; // легкий синеватый оттенок
}

export function CalibrationHeatmap({
  data,
  selectedRow,
}: {
  data: HeatmapRow[];
  selectedRow: string;
}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="text-left text-xs text-slate-500">Qubit</th>
            {cols.map((c) => (
              <th key={c} className="text-left text-xs text-slate-500">
                {c.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((r) => {
            const isSelected = r.row === selectedRow;

            return (
              <tr key={r.row}>
                <td
                  className={[
                    "text-sm font-medium",
                    isSelected ? "text-slate-900" : "text-slate-600",
                  ].join(" ")}
                >
                  {r.row}
                </td>

                {cols.map((c) => {
                  const v = r[c];
                  return (
                    <td
                      key={c}
                      className={[
                        "rounded-xl px-3 py-2 text-sm text-slate-900 ring-1 ring-slate-200",
                        isSelected ? "ring-slate-300" : "",
                      ].join(" ")}
                      style={{ backgroundColor: cellBg(v) }}
                      title={`${r.row} ${c.toUpperCase()}: ${v.toFixed(2)}`}
                    >
                      {v.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-6 rounded bg-[rgb(245,248,255)] ring-1 ring-slate-200" />
          Low
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-6 rounded bg-[rgb(190,193,255)] ring-1 ring-slate-200" />
          High
        </span>
        <span className="ml-auto">
          Hint: hover cells for exact values
        </span>
      </div>
    </div>
  );
}
