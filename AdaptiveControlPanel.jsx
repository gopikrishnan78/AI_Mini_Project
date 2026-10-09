import React from 'react';
import { RefreshCw, Zap, ShieldAlert, AlertOctagon, Gauge, Check } from 'lucide-react';

export default function AdaptiveControlPanel({
  trafficLevel,
  setTrafficLevel,
  roadCondition,
  setRoadCondition,
  riskLevel,
  setRiskLevel,
  onRecalculate,
  adaptiveChange,
  isRecalculating
}) {
  return (
    <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight">LIVE ROUTE CONDITIONS</h3>
            <p className="text-xs text-slate-400">Simulate Real-time Network Stress & Road Obstacles</p>
          </div>
        </div>

        <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-1 rounded-full border border-amber-500/20 font-mono font-medium">
          Adaptive Engine Active
        </span>
      </div>

      {/* Adaptive Change Notification Banner */}
      {adaptiveChange && (
        <div className={`p-4 rounded-xl mb-6 border transition-all duration-300 ${
          adaptiveChange.route_changed
            ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
            : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
        }`}>
          <div className="flex items-start gap-3">
            {adaptiveChange.route_changed ? (
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold text-xs uppercase tracking-wider">
                {adaptiveChange.route_changed ? 'ROUTE CHANGE DETECTED' : 'ROUTE STABLE & OPTIMAL'}
              </div>
              <p className="text-xs mt-1 text-slate-300">{adaptiveChange.reason}</p>
              {adaptiveChange.route_changed && (
                <div className="mt-2 text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                  <span>Prev: <span className="line-through text-slate-400">{adaptiveChange.previous_route_id}</span></span>
                  <span>→</span>
                  <span>New: <span className="text-emerald-400">{adaptiveChange.new_route_name}</span></span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Control Knobs Grid */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        
        {/* 1. Traffic Controls */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-cyan-400" /> Traffic Level
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            {['LOW', 'MEDIUM', 'HIGH'].map((t) => (
              <button
                key={t}
                onClick={() => setTrafficLevel(t)}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  trafficLevel === t
                    ? (t === 'HIGH' ? 'bg-rose-500 text-white' : (t === 'MEDIUM' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'))
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Road Condition Controls */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4 text-amber-400" /> Road Condition
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            {['NORMAL', 'SLOW', 'BLOCKED'].map((r) => (
              <button
                key={r}
                onClick={() => setRoadCondition(r)}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  roadCondition === r
                    ? (r === 'BLOCKED' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : (r === 'SLOW' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'))
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Risk Controls */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-indigo-400" /> Road Hazard / Risk
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            {['LOW', 'MEDIUM', 'HIGH'].map((rk) => (
              <button
                key={rk}
                onClick={() => setRiskLevel(rk)}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  riskLevel === rk
                    ? (rk === 'HIGH' ? 'bg-rose-500 text-white' : (rk === 'MEDIUM' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'))
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {rk}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Recalculate Trigger Button */}
      <button
        onClick={onRecalculate}
        disabled={isRecalculating}
        className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
      >
        <RefreshCw className={`w-4 h-4 ${isRecalculating ? 'animate-spin' : ''}`} />
        <span>{isRecalculating ? 'Recalculating Path...' : 'RECALCULATE ROUTE'}</span>
      </button>

    </div>
  );
}
