import React from 'react';
import { Navigation, Zap, Shield, DollarSign, Clock, Sliders, CheckCircle2 } from 'lucide-react';
import GraphMap from '../components/GraphMap';
import RouteDNA from '../components/RouteDNA';

export default function PlannerPage({
  nodes,
  edges,
  source,
  setSource,
  destination,
  setDestination,
  mode,
  setMode,
  routeResult,
  onCalculate,
  isLoading
}) {
  const modes = [
    { id: 'FASTEST', label: 'FASTEST', icon: Clock, desc: 'Time: 55% | Cost: 10% | Dist: 20% | Risk: 15%', color: 'border-cyan-500 text-cyan-400' },
    { id: 'CHEAPEST', label: 'CHEAPEST', icon: DollarSign, desc: 'Cost: 55% | Time: 10% | Dist: 20% | Risk: 15%', color: 'border-emerald-500 text-emerald-400' },
    { id: 'SAFEST', label: 'SAFEST', icon: Shield, desc: 'Risk: 60% | Time: 15% | Cost: 10% | Dist: 15%', color: 'border-indigo-500 text-indigo-400' },
    { id: 'BALANCED', label: 'BALANCED', icon: Sliders, desc: 'Time: 30% | Risk: 25% | Dist: 25% | Cost: 20%', color: 'border-amber-500 text-amber-400' },
    { id: 'EMERGENCY', label: 'EMERGENCY', icon: Zap, desc: 'Time: 65% | Risk: 25% | Dist: 10% | Cost: 0%', color: 'border-rose-500 text-rose-400' },
  ];

  const selectedRoute = routeResult?.selected_route;
  const alternatives = routeResult?.alternatives || [];

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">ROUTE PLANNER & MODE CONFIGURATOR</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">Multi-Objective Decision Vector Configuration</p>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {isActive && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </div>
              <div className="font-extrabold text-xs text-white uppercase">{m.label}</div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{m.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Controls Form */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl grid md:grid-cols-3 gap-6 items-end">
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Source Location</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full bg-slate-950 text-white font-medium text-xs px-4 py-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          >
            {Object.values(nodes || {}).map((n) => (
              <option key={n.id} value={n.id}>{n.name} ({n.code}) - {n.type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Destination Location</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-slate-950 text-white font-medium text-xs px-4 py-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          >
            {Object.values(nodes || {}).map((n) => (
              <option key={n.id} value={n.id}>{n.name} ({n.code}) - {n.type}</option>
            ))}
          </select>
        </div>

        <button
          onClick={onCalculate}
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all"
        >
          <Navigation className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'SEARCHING PATHS...' : 'COMPUTE OPTIMAL ROUTE'}</span>
        </button>
      </div>

      {/* Results Header */}
      {selectedRoute && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-extrabold text-sm text-emerald-400">OPTIMAL ROUTE FOUND</span>
              <p className="text-xs text-slate-300">Selected {selectedRoute.name} with score {selectedRoute.metrics.composite_score}</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">Execution time: {routeResult.execution_time_ms} ms</span>
        </div>
      )}

      {/* Candidate Routes Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {selectedRoute && <RouteDNA route={selectedRoute} isSelected={true} />}
        {alternatives.map((alt) => (
          <RouteDNA key={alt.route_id} route={alt} isSelected={false} />
        ))}
      </div>

      {/* Map View */}
      <GraphMap
        nodes={nodes}
        edges={edges}
        selectedRoute={selectedRoute}
        alternatives={alternatives}
        sourceNodeId={source}
        targetNodeId={destination}
      />

    </div>
  );
}
