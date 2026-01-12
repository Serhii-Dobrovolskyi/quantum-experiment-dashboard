# Quantum Experiment Performance Dashboard

Internal visualization tool prototype for exploring and reporting quantum experiment performance data.

This project demonstrates how frontend engineering can support experimental R&D workflows by providing clear, data-driven visualizations of quantum processor metrics. The prototype is intentionally scoped as a lightweight internal tool rather than a full production system.

---

## Project Context

This project was prepared as part of an application for a frontend-focused internship in quantum technology.

It simulates an internal dashboard used by engineers and researchers to inspect experimental results, compare qubit performance across runs, and quickly identify trends or anomalies during iterative experimentation.

The full source code is available in this repository.

---

## Relevance to IQM QPU Performance Group

This project was intentionally scoped as a lightweight internal tool, designed to support experimental QPU performance analysis.

**Key design considerations:**
- **Fast iteration:** optimized for quick inspection of experiment results rather than long-term production analytics
- **Clear signal visibility:** focuses on exposing performance trends and anomalies without visual noise
- **Low cognitive load:** prioritizes simple layouts and familiar patterns for rapid interpretation

**Why this matters for QPU performance work:**
- Enables quick comparison across experiment runs and individual qubits
- Helps identify performance trends and outliers without additional data preprocessing
- Reflects workflows commonly used in experimental physics and quantum hardware development teams

Overall, the project demonstrates how frontend engineering can support experimental research by making complex quantum performance data easy to access and interpret.

---

## What the Project Demonstrates

- Visualization of quantum experiment metrics such as **qubit fidelity**, **error rates**, and **stability**
- Interactive exploration by **experiment run** and **individual qubit**
- Scientific-style visualizations using **line charts, bar charts, and heatmaps**
- Clear separation between **data generation (Python)** and **data visualization (frontend)**

The UI prioritizes clarity, low cognitive load, and fast interpretation of experimental signals.

---

## Data & Workflow Overview

The project mirrors a simplified experimental workflow commonly used in quantum hardware and experimental physics environments:

A Python script is used to generate simulated experiment data, reflecting how experimental results are often prepared or preprocessed before visualization.

---

## Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts

**Data Generation**
- Python
- NumPy

---

## How to Run the Project

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.x

###  1. Install frontend dependencies
npm install

###  2. (Optional) Generate mock experiment data
python -m pip install numpy

python scripts/generate_experiment_data.py

###  3. Start the development server
npm run dev

Open the application in your browser:
http://localhost:5173
