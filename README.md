# AI-Based Adaptive Optimal Path Detection and Route Optimization System

A comprehensive multi-objective, explainable AI (XAI) route optimization platform built as a **B.Tech Artificial Intelligence and Data Science Mini-Project**.

---

## 🌟 Key Features

1. **Multi-Objective Optimization**: Evaluates candidate corridors by balancing **Travel Time, Toll Cost, Distance, Safety Hazard Risk, and Live Traffic Congestion**.
2. **AI Search Algorithms**: Real graph-search implementations using **Dijkstra's Algorithm**, **A\* Search Algorithm**, and **K-Shortest Path Edge Penalization**.
3. **Six Routing Modes**:
   - ⚡ **FASTEST** (Time: 55%, Distance: 20%, Risk: 15%, Cost: 10%)
   - 💰 **CHEAPEST** (Cost: 55%, Distance: 20%, Risk: 15%, Time: 10%)
   - 🛡️ **SAFEST** (Risk: 60%, Time: 15%, Distance: 15%, Cost: 10%)
   - ⚖️ **BALANCED** (Time: 30%, Distance: 25%, Cost: 20%, Risk: 25%)
   - 🚨 **EMERGENCY** (Time: 65%, Risk: 25%, Distance: 10%, Cost: 0%)
   - 🌱 **ECO** (Distance: 45%, Cost: 30%, Time: 15%, Risk: 10%)
4. **Adaptive Routing Simulation**: Live controls for Traffic Level, Road Condition (Normal/Slow/Blocked), and Hazard Risk Level with dynamic edge recalculations.
5. **Route DNA Profiling**: Visual cards with score gauges, distance, travel time, cost, safety risk, traffic factor, fuel consumption, and CO2 emissions.
6. **Explainable AI (XAI)**: Calculates human-readable mathematical trade-off rationale explaining *why* the optimal route was chosen over alternatives.
7. **Interactive Visual Map**: Canvas/SVG road network visualization mapping 14 nodes, 22+ weighted edges, glowing optimal paths, and interactive node selection.

---

## 📐 Project Architecture

```
ai/
├── backend/
│   ├── main.py                   # FastAPI Application Server
│   ├── requirements.txt          # Python Dependencies
│   ├── algorithms/
│   │   ├── dijkstra.py           # Multi-objective Dijkstra Search
│   │   ├── astar.py              # A* Search with Euclidean Heuristic
│   │   └── k_paths.py            # K-Shortest Path Generator
│   ├── models/
│   │   └── route.py              # Pydantic Schemas & DTOs
│   ├── data/
│   │   └── graph_data.py         # Chennai Road Network Graph
│   └── services/
│       ├── graph_service.py      # Adjacency Graph & Weight Calculators
│       ├── route_service.py      # Path Ranking & Normalization
│       └── explanation_service.py# Explainable AI (XAI) Rationale
└── frontend/
    ├── package.json              # Node dependencies
    ├── vite.config.js            # Vite configuration
    ├── tailwind.config.js        # Tailwind UI styling
    └── src/
        ├── App.jsx               # Main Application Shell
        ├── components/
        │   ├── Navbar.jsx        # Navigation & Emergency Mode
        │   ├── GraphMap.jsx      # Interactive SVG Road Graph
        │   ├── RouteDNA.jsx      # Route DNA Profile Cards
        │   ├── ExplanationCard.jsx# "WHY THIS ROUTE?" XAI Card
        │   ├── AdaptiveControlPanel.jsx # Live Condition Knobs
        │   ├── ComparisonTable.jsx# Route Matrix & Visual Bar Charts
        │   ├── HowItWorks.jsx    # 6-Step Workflow Presentation
        │   └── AlgorithmExplanation.jsx # Academic Viva Notes
        ├── pages/
        │   ├── DashboardPage.jsx # Main Dashboard
        │   ├── PlannerPage.jsx   # Route Planner & Mode Selector
        │   ├── ComparisonPage.jsx# Candidate Route Comparison
        │   ├── AdaptivePage.jsx  # Adaptive Routing Panel
        │   ├── AnalyticsPage.jsx # Benchmark Analytics
        │   └── AboutPage.jsx     # Project Documentation
        └── services/
            ├── api.js            # FastAPI Service Integration
            └── routeEngine.js    # Client-side Standalone AI Engine
```

---

## 🚀 How to Run the Application

### 1. Run Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn backend.main:app --reload --port 8000
```
- API Docs: `http://localhost:8000/docs`

### 2. Run Frontend (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
```
- App UI: `http://localhost:3000`

---

## 🔬 Sample Demonstration Scenario (For Viva)

1. **Source**: Chennai Central
2. **Destination**: RMK Engineering College
3. **Mode**: BALANCED
4. **Step 1**: Observe candidate routes generated (Route A via Kolkata Highway NH-16 vs Route B via Outer Ring Road ORR).
5. **Step 2**: Inspect **Route DNA** profile cards showing calculated score, distance, time, cost, risk, and traffic factor.
6. **Step 3**: Review **"WHY ROUTE A?"** Explainable AI card detailing mathematical trade-off rationale.
7. **Step 4**: Go to **Adaptive Routing**, change Road Condition to `BLOCKED` or Traffic to `HIGH`. Click **RECALCULATE ROUTE**.
8. **Step 5**: Notice the dynamic recalculation message: *"Route change detected: Alternative Route B is now recommended due to increased traffic on NH-16"*.
