import React from 'react';
import ScoreGauge from './ScoreGauge';

const RouteCard = ({ route, recommended = false }) => {
  if (!route) return null;
  const m = route.metrics;
  const riskLabel = m.risk < 0.25 ? 'Low' : m.risk < 0.5 ? 'Medium' : 'High';
  const riskColor = m.risk < 0.25 ? 'text-emerald-400' : m.risk < 0.5 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className={`glass-card p-5 transition-all duration-300 hover:scale-[1.02] ${recommended ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/10' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-bold text-white text-lg">{route.name}</h4>
          {recommended && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              ✓ RECOMMENDED
            </span>
          )}
        </div>
        <ScoreGauge score={route.score} size={56} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex justify-between"><span className="text-slate-400">Distance</span><span className="font-semibold">{m.distance.toFixed(1)} km</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Time</span><span className="font-semibold">{m.time.toFixed(0)} min</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Cost</span><span className="font-semibold">₹{m.cost.toFixed(0)}</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Risk</span><span className={`font-semibold ${riskColor}`}>{riskLabel}</span></div>
      </div>
    </div>
  );
};

export default RouteCard;
