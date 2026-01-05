import { KpiCard } from "./KpiCard";

export function DashboardShell() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-medium text-slate-500">
              Internal Tool Prototype
            </div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              Quantum Experiment Performance Dashboard
            </h1>
            <div className="mt-2 text-sm text-slate-600">
              QPU performance-style reporting • Visualization-focused UI
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 px-4 py-3">
              <div className="text-xs text-slate-500">Experiment Run</div>
              <select
                className="mt-1 w-52 bg-transparent text-sm font-medium text-slate-900 outline-none"
                defaultValue="RUN-001"
              >
                <option value="RUN-001">RUN-001</option>
                <option value="RUN-002">RUN-002</option>
              </select>
              <div className="mt-1 text-xs text-slate-500">Mock timestamp</div>
            </div>

            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 px-4 py-3">
              <div className="text-xs text-slate-500">Qubit</div>
              <select
                className="mt-1 w-52 bg-transparent text-sm font-medium text-slate-900 outline-none"
                defaultValue="Q3"
              >
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
                <option value="Q5">Q5</option>
              </select>
              <div className="mt-1 text-xs text-slate-500">
                Selected: Q3 • Avg fidelity 99.3%
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard
            label="Avg Gate Fidelity (Run)"
            value="99.10%"
            sub="Mean across qubits"
          />
          <KpiCard
            label="Avg Error Rate (Run)"
            value="0.95%"
            sub="Lower is better"
          />
          <KpiCard
            label="Qubit Stability (Run)"
            value="93.0%"
            sub="Heuristic stability index"
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
            <div className="text-sm font-semibold text-slate-900">
              Fidelity over time
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Placeholder (next step: line chart)
            </div>
            <div className="mt-4 h-64 rounded-xl bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center text-sm text-slate-500">
              Line chart goes here
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
            <div className="text-sm font-semibold text-slate-900">
              Error rate per qubit
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Placeholder (next step: bar chart)
            </div>
            <div className="mt-4 h-64 rounded-xl bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center text-sm text-slate-500">
              Bar chart goes here
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
          <div className="text-sm font-semibold text-slate-900">
            Calibration quality heatmap
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Placeholder (next step: heatmap table)
          </div>
          <div className="mt-4 h-44 rounded-xl bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center text-sm text-slate-500">
            Heatmap goes here
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-500">
          Note: This dashboard uses simulated data to demonstrate visualization patterns for scientific/quantum experiment
          reporting tools.
        </div>
      </div>
    </div>
  );
}
