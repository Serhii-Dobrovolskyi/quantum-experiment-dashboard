import { useState } from "react";
import data from "../data/experimentData.json";
import { KpiCard } from "./KpiCard";
import { FidelityLineChart } from "./FidelityLineChart";
import { ErrorBarChart } from "./ErrorBarChart";
import { CalibrationHeatmap } from "./CalibrationHeatmap";

type Run = (typeof data)["runs"][number];

function avg(values: number[]) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function DashboardShell() {
  const runs = data.runs;
  const [runId, setRunId] = useState(runs[0].runId);
  const run: Run = runs.find((r) => r.runId === runId)!;

  const qubits = run.qubits;
  const [qubitId, setQubitId] = useState(qubits[0].id);
  const qubit = qubits.find((q) => q.id === qubitId)!;

  const avgFidelity = avg(qubits.map((q) => q.fidelity));
  const avgError = avg(qubits.map((q) => q.error));
  const avgStability = avg(qubits.map((q) => q.stability));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Top control panel (header + filters) */}
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-medium text-slate-500">
                Internal Tool Prototype
              </div>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-blue-900">
                Quantum Experiment Performance Dashboard
              </h1>
              <div className="mt-2 text-sm text-slate-600">
                Data-driven mock experiment results
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 px-4 py-3">
                <div className="text-xs font-medium text-slate-500">Select Experiment Run</div>
                <select
                  className="mt-1 w-44 bg-transparent text-sm font-semibold text-slate-900 outline-none"
                  value={runId}
                  onChange={(e) => {
                    const next = e.target.value;
                    setRunId(next);
                    const nextRun = runs.find((r) => r.runId === next)!;
                    setQubitId(nextRun.qubits[0].id);
                  }}
                >
                  {runs.map((r) => (
                    <option key={r.runId} value={r.runId}>
                      {r.runId}
                    </option>
                  ))}
                </select>
                <div className="mt-1 text-[11px] text-slate-500">
                  {new Date(run.timestamp).toUTCString()}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 px-4 py-3">
                <div className="text-xs font-medium text-slate-500">Select Qubit</div>
                <select
                  className="mt-1 w-44 bg-transparent text-sm font-semibold text-slate-900 outline-none"
                  value={qubitId}
                  onChange={(e) => setQubitId(e.target.value)}
                >
                  {qubits.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.id}
                    </option>
                  ))}
                </select>
                <div className="mt-1 text-[11px] text-slate-500">
                  Selected: {qubit.id} • Fidelity {(qubit.fidelity * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Если хочешь сделать KPI более "синими", поменяй стили в KpiCard (я ниже напишу как) */}
          <KpiCard label="Gate Fidelity" value={`${(avgFidelity * 100).toFixed(2)}%`} sub="Current fidelity level" />
          <KpiCard label="Error Rate" value={`${(avgError * 100).toFixed(2)}%`} sub="Avg. error rate" />
          <KpiCard label="Qubit Stability" value={`${(avgStability * 100).toFixed(1)}%`} sub="Coherence proxy (mock)" />
        </div>

        {/* Small status line */}
        <div className="mt-4 text-sm text-slate-600">
          Selected qubit: <strong>{qubit.id}</strong> • Fidelity{" "}
          {(qubit.fidelity * 100).toFixed(2)}%
        </div>

        {/* Charts grid (more "embedded" like enterprise dashboards) */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {/* Line chart panel */}
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Fidelity Over Time</div>
              <div className="text-xs text-slate-500">Run {run.runId}</div>
            </div>
            <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 p-3">
              <FidelityLineChart data={run.timeseries} />
            </div>
          </div>

          {/* Bar chart panel */}
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Qubit Error Rates</div>
              <div className="text-xs text-slate-500">Run {run.runId}</div>
            </div>
            <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 p-3">
              <ErrorBarChart data={run.qubits} />
            </div>
          </div>
        </div>

        {/* Heatmap panel */}
        <div className="mt-4 rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Measurement Results Heatmap
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Simplified matrix view • higher = better (mock)
              </div>
            </div>
            <div className="text-xs text-slate-500">Selected: {qubitId}</div>
          </div>

          <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 p-3">
            <CalibrationHeatmap data={run.heatmap} selectedRow={qubitId} />
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-500">
          Note: This dashboard uses simulated data to demonstrate visualization patterns for scientific/quantum experiment reporting tools.
        </div>
      </div>
    </div>
  );
}
