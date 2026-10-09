import React, { useState, useEffect } from 'react';
import { BarChart3, Activity, Clock, DollarSign, Shield, Zap } from 'lucide-react';
import { fetchAnalyticsData } from '../services/api';

export default function AnalyticsPage({ routeResult }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalyticsData().then(setData);
  }, []);

  if (!data) return null;

  const { summary, algorithm_performance, mode_distribution } = data;
  const selectedRoute = routeResult?.selected_route;
  const m = selectedRoute?.metrics;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">SYSTEM ANALYTICS & ALGORITHM PERFORMANCE</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">Empirical Benchmark Metrics & Pathfinding Performance</p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Total Routes Analyzed</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{summary.total_routes_analyzed}</div>
          <div className="text-[10px] text-cyan-400 mt-1">Graph queries</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Avg Execution Time</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{summary.avg_query_response_ms} ms</div>
          <div className="text-[10px] text-slate-400 mt-1">Sub-15ms search</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Avg Time Saved</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">{summary.avg_time_saved_percent}%</div>
          <div className="text-[10px] text-slate-400 mt-1">vs single-metric path</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Avg Cost Saved</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">{summary.avg_cost_saved_percent}%</div>
          <div className="text-[10px] text-slate-400 mt-1">Toll & fuel savings</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Emergency Mode</div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono mt-1">{summary.emergency_mode_activations}</div>
          <div className="text-[10px] text-slate-400 mt-1">Priority overrides</div>
        </div>
      </div>

      {/* Current Journey Metrics if available */}
      {m && (
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/30">
          <h3 className="font-extrabold text-base text-white mb-4">ACTIVE JOURNEY METRICS BENCHMARK</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">DISTANCE</span>
              <span className="text-white text-lg font-bold">{m.distance_km} km</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">TRAVEL TIME</span>
              <span className="text-cyan-400 text-lg font-bold">{m.travel_time_min} mins</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">ESTIMATED COST</span>
              <span className="text-emerald-400 text-lg font-bold">₹{m.cost_inr}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">COMPOSITE SCORE</span>
              <span className="text-amber-400 text-lg font-bold">{m.composite_score}</span>
            </div>
          </div>
        </div>
      )}

      {/* Algorithm Benchmark Performance Table */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
        <h3 className="font-extrabold text-base text-white mb-4">ALGORITHM BENCHMARK PERFORMANCE</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <th className="py-3 px-4">Algorithm</th>
                <th className="py-3 px-4">Avg Nodes Visited</th>
                <th className="py-3 px-4">Compute Time (ms)</th>
                <th className="py-3 px-4">Path Optimality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
              {algorithm_performance.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-400">{item.algorithm}</td>
                  <td className="py-3 px-4">{item.avg_nodes_visited}</td>
                  <td className="py-3 px-4 text-emerald-400">{item.time_ms} ms</td>
                  <td className="py-3 px-4 text-amber-400">{item.optimality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
