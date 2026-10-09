import React from 'react';
import { Award, Clock, DollarSign, Activity, Shield, ArrowRight } from 'lucide-react';

export default function ComparisonTable({ routes, selectedRouteId, onSelectRoute }) {
  if (!routes || routes.length === 0) return null;

  const maxTime = Math.max(...routes.map(r => r.metrics.travel_time_min));
  const maxCost = Math.max(...routes.map(r => r.metrics.cost_inr));

  return (
    <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-extrabold text-lg text-white tracking-tight">ROUTE COMPARISON MATRIX</h3>
          <p className="text-xs text-slate-400 font-mono">Multi-Attribute Candidate Route Evaluation</p>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          {routes.length} Candidate Paths Analyzed
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800">
              <th className="py-3 px-4">Route</th>
              <th className="py-3 px-4">Distance</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Cost</th>
              <th className="py-3 px-4">Traffic</th>
              <th className="py-3 px-4">Risk</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs">
            {routes.map((route) => {
              const isSelected = route.route_id === selectedRouteId;
              const m = route.metrics;

              return (
                <tr
                  key={route.route_id}
                  onClick={() => onSelectRoute && onSelectRoute(route)}
                  className={`transition-colors cursor-pointer ${
                    isSelected ? 'bg-cyan-500/10 text-white font-medium' : 'hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold flex items-center gap-2">
                      {route.name}
                      {isSelected && <Award className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{route.algorithm}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{m.distance_km} km</td>
                  <td className="py-3.5 px-4 font-mono">{m.travel_time_min} min</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400">₹{m.cost_inr}</td>
                  <td className="py-3.5 px-4">{m.traffic_level}</td>
                  <td className="py-3.5 px-4">{m.risk_level}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{m.composite_score.toFixed(2)}</td>
                  <td className="py-3.5 px-4 text-right">
                    {isSelected ? (
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                        RECOMMENDED
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Alternative</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Visual Bar Comparison Section */}
      <div className="grid md:grid-cols-2 gap-6 pt-2">
        
        {/* Time Bar Chart */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-3">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-cyan-400" /> Travel Time Comparison (Mins)</span>
            <span className="text-[10px] text-slate-400">Lower is better</span>
          </div>
          <div className="space-y-3">
            {routes.map(r => {
              const widthPct = Math.round((r.metrics.travel_time_min / maxTime) * 100);
              const isSelected = r.route_id === selectedRouteId;
              return (
                <div key={r.route_id} className="text-xs">
                  <div className="flex justify-between text-[11px] mb-1 font-mono text-slate-300">
                    <span>{r.name}</span>
                    <span className="font-bold text-white">{r.metrics.travel_time_min} min</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isSelected ? 'bg-cyan-400' : 'bg-slate-600'}`}
                      style={{ width: `${widthPct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cost Bar Chart */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-3">
            <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Total Cost Comparison (₹)</span>
            <span className="text-[10px] text-slate-400">Lower is better</span>
          </div>
          <div className="space-y-3">
            {routes.map(r => {
              const widthPct = Math.round((r.metrics.cost_inr / maxCost) * 100);
              const isSelected = r.route_id === selectedRouteId;
              return (
                <div key={r.route_id} className="text-xs">
                  <div className="flex justify-between text-[11px] mb-1 font-mono text-slate-300">
                    <span>{r.name}</span>
                    <span className="font-bold text-emerald-400">₹{r.metrics.cost_inr}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isSelected ? 'bg-emerald-400' : 'bg-slate-600'}`}
                      style={{ width: `${widthPct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
