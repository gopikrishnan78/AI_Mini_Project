import React from 'react';
import { Dna, Clock, DollarSign, Shield, Activity, Fuel, Leaf, CheckCircle2, Award } from 'lucide-react';

export default function RouteDNA({ route, isSelected = false, onSelect }) {
  if (!route) return null;

  const m = route.metrics;
  const scorePercent = Math.round((m.composite_score || 0) * 100);

  // Color mapping based on risk level
  const riskColors = {
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    High: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  const trafficColors = {
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    High: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
        isSelected
          ? 'bg-slate-900/90 border-2 border-cyan-500 shadow-xl shadow-cyan-500/15 ring-1 ring-cyan-500/30'
          : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
      }`}
    >
      {/* Top Banner Accent */}
      <div className={`h-1.5 w-full ${isSelected ? 'bg-gradient-to-r from-cyan-500 via-emerald-400 to-blue-500' : 'bg-slate-800'}`}></div>

      <div className="p-5">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Dna className="w-4 h-4 text-cyan-400" />
              <h3 className="font-extrabold text-base text-white tracking-tight">{route.name}</h3>
              {isSelected && (
                <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <Award className="w-3 h-3" /> BEST MATCH
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">Algorithm: {route.algorithm || 'Multi-Objective A*'}</p>
          </div>

          {/* Route DNA Composite Score Badge */}
          <div className="text-right bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Route Score</div>
            <div className={`text-lg font-black font-mono ${scorePercent >= 75 ? 'text-emerald-400' : (scorePercent >= 50 ? 'text-cyan-400' : 'text-amber-400')}`}>
              {m.composite_score.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Score Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full mb-5 overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ${
              scorePercent >= 75
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                : 'bg-gradient-to-r from-amber-500 to-cyan-400'
            }`}
            style={{ width: `${scorePercent}%` }}
          ></div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
              <Clock className="w-3 h-3 text-cyan-400" /> Time
            </div>
            <div className="text-sm font-bold font-mono text-white">{m.travel_time_min} <span className="text-xs font-normal text-slate-400">min</span></div>
          </div>

          <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
              <DollarSign className="w-3 h-3 text-emerald-400" /> Cost
            </div>
            <div className="text-sm font-bold font-mono text-white">₹{m.cost_inr}</div>
          </div>

          <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
              <Activity className="w-3 h-3 text-indigo-400" /> Distance
            </div>
            <div className="text-sm font-bold font-mono text-white">{m.distance_km} <span className="text-xs font-normal text-slate-400">km</span></div>
          </div>
        </div>

        {/* Badges: Risk & Traffic */}
        <div className="flex items-center justify-between gap-2 mb-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Risk:</span>
            <span className={`px-2 py-0.5 rounded-md border font-mono ${riskColors[m.risk_level] || riskColors.Low}`}>
              {m.risk_level} ({m.risk_score})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Traffic:</span>
            <span className={`px-2 py-0.5 rounded-md border font-mono ${trafficColors[m.traffic_level] || trafficColors.Low}`}>
              {m.traffic_level}
            </span>
          </div>
        </div>

        {/* Eco metrics pill */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/40 px-3 py-2 rounded-xl border border-slate-800/60 mb-3 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Leaf className="w-3 h-3" /> {m.co2_emissions_kg} kg CO2
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Fuel className="w-3 h-3 text-amber-400" /> {m.fuel_consumption_liters} L Fuel
          </span>
        </div>

        {/* Highlights */}
        {route.highlights && route.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
            {route.highlights.map((h, i) => (
              <span key={i} className="flex items-center gap-1 text-[10px] text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/50">
                <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" /> {h}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
