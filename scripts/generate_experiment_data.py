import json
from datetime import datetime, timezone
from pathlib import Path

import numpy as np


def clamp(x: float, a: float, b: float) -> float:
    return max(a, min(b, x))


def gen_run(run_id: str, base_hour: int) -> dict:
    # Qubits
    qubits = []
    for q in range(1, 6):
        fidelity = float(np.random.uniform(0.984, 0.995))
        error = float(clamp(1.0 - fidelity + np.random.uniform(0.000, 0.004), 0.004, 0.020))
        stability = float(np.random.uniform(0.85, 0.97))
        qubits.append(
            {
                "id": f"Q{q}",
                "fidelity": round(fidelity, 3),
                "error": round(error, 3),
                "stability": round(stability, 2),
            }
        )

    # Time series
    timeseries = []
    base = float(np.random.uniform(0.986, 0.992))
    for i in range(5):
        t_label = f"{base_hour}:{15 + i * 10:02d}"
        f = float(clamp(base + np.random.uniform(-0.002, 0.002), 0.97, 0.999))
        timeseries.append({"t": t_label, "fidelity": round(f, 3)})

    # Heatmap (0.84..0.97)
    heatmap = []
    for q in range(1, 6):
        row = {"row": f"Q{q}"}
        for c in range(1, 6):
            row[f"c{c}"] = round(float(np.random.uniform(0.84, 0.97)), 2)
        heatmap.append(row)

    return {
        "runId": run_id,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "qubits": qubits,
        "timeseries": timeseries,
        "heatmap": heatmap,
    }


def main() -> None:
    np.random.seed(42)

    payload = {
        "runs": [
            gen_run("RUN-001", 10),
            gen_run("RUN-002", 14),
        ]
    }

    out_path = Path("src/data/experimentData.json")
    out_path.parent.mkdir(parents=True, exist_ok=True)

    out_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"✅ Generated mock dataset: {out_path}")


if __name__ == "__main__":
    main()
