import { useState } from "react";
import data from "../data/experimentData.json";
import { KpiCard } from "./KpiCard";

import { ErrorBarChart } from "./ErrorBarChart";


import { FidelityLineChart } from "./FidelityLineChart";
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
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-medium text-slate-500">
              Internal Tool Prototype
            </div>
            <h1 className="mt-1 text-3xl font-semibold text-slate-900">
              Quantum Experiment Performance Dashboard
            </h1>
            <div className="mt-2 text-sm text-slate-600">
              Data-driven mock experiment results
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200"
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

            <select
              className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200"
              value={qubitId}
              onChange={(e) => setQubitId(e.target.value)}
            >
              {qubits.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.id}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* KPI */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard
            label="Avg Gate Fidelity"
            value={`${(avgFidelity * 100).toFixed(2)}%`}
          />
          <KpiCard
            label="Avg Error Rate"
            value={`${(avgError * 100).toFixed(2)}%`}
          />
          <KpiCard
            label="Qubit Stability"
            value={`${(avgStability * 100).toFixed(1)}%`}
          />
        </div>

        <div className="mt-6 text-sm text-slate-600">
          Selected qubit: <strong>{qubit.id}</strong> • Fidelity{" "}
          {(qubit.fidelity * 100).toFixed(2)}%
        </div>
        <div className="mt-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
         <div className="flex items-baseline justify-between">
            <div>
               <div className="text-sm font-semibold text-slate-900">
               Fidelity over time
               </div>
               <div className="mt-1 text-xs text-slate-500">
               Run: {run.runId} • time series (mock)
               </div>
            </div>
            <div className="text-xs text-slate-500">Metric: fidelity</div>
         </div>

         <FidelityLineChart data={run.timeseries} />
         </div>
         <div className="mt-4 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Error rate per qubit
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Run: {run.runId} • distribution across qubits (mock)
            </div>
          </div>
          <div className="text-xs text-slate-500">Metric: error</div>
        </div>

        <ErrorBarChart data={run.qubits} />
      </div>
      <div className="mt-4 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-900">
            Calibration quality heatmap
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Simplified matrix view • higher = better (mock)
          </div>
        </div>
        <div className="text-xs text-slate-500">Selected qubit: {qubitId}</div>
      </div>

      <CalibrationHeatmap data={run.heatmap} selectedRow={qubitId} />
    </div>


      </div>
    </div>
  );
}
