import React from 'react';
import { Navigation, Sparkles, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';
import GraphMap from '../components/GraphMap';
import RouteDNA from '../components/RouteDNA';
import ExplanationCard from '../components/ExplanationCard';
import HowItWorks from '../components/HowItWorks';

export default function DashboardPage({
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
  isLoading,
  onNavigateToTab
}) {
  const selectedRoute = routeResult?.selected_route;
  const alternatives = routeResult?.alternatives || [];

  return (
    <div className="space-y-8">
      
      {/* Main Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-8 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Glowing Decorative Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> B.Tech AI & Data Science Mini-Project
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Find the route that <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">fits your journey.</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            AI-powered multi-objective route optimization evaluating travel time, cost, distance, safety hazards, and live traffic congestion.
          </p>

          {/* Quick Input Bar */}
          <div className="mt-8 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            
            {/* FROM */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">FROM</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full bg-slate-900 text-white font-medium text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                {Object.values(nodes || {}).map((n) => (
                  <option key={n.id} value={n.id}>{n.name} ({n.code})</option>
                ))}
              </select>
            </div>

            {/* TO */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">TO</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-900 text-white font-medium text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                {Object.values(nodes || {}).map((n) => (
                  <option key={n.id} value={n.id}>{n.name} ({n.code})</option>
                ))}
              </select>
            </div>

            {/* MODE */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">ROUTING MODE</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full bg-slate-900 text-cyan-400 font-bold text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                <option value="FASTEST">⚡ FASTEST</option>
                <option value="CHEAPEST">💰 CHEAPEST</option>
                <option value="SAFEST">🛡️ SAFEST</option>
                <option value="BALANCED">⚖️ BALANCED</option>
                <option value="EMERGENCY">🚨 EMERGENCY</option>
                <option value="ECO">🌱 ECO</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="md:pt-4">
              <button
                onClick={onCalculate}
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Navigation className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'CALCULATING...' : 'FIND OPTIMAL ROUTE'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Map & Primary Route DNA Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Map Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" /> Interactive Network Map
            </h2>
            <span className="text-xs font-mono text-slate-400">Source: {nodes[source]?.name} → Target: {nodes[destination]?.name}</span>
          </div>

          <GraphMap
            nodes={nodes}
            edges={edges}
            selectedRoute={selectedRoute}
            alternatives={alternatives}
            sourceNodeId={source}
            targetNodeId={destination}
          />
        </div>

        {/* Selected Route DNA Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-lg text-white tracking-tight">RECOMMENDED ROUTE DNA</h2>
            <button
              onClick={() => onNavigateToTab('comparison')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              Compare All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {selectedRoute ? (
            <RouteDNA route={selectedRoute} isSelected={true} />
          ) : (
            <div className="bg-slate-900/60 rounded-2xl p-8 border border-slate-800 text-center text-slate-400 text-xs">
              Select Source & Destination above and click 'FIND OPTIMAL ROUTE' to calculate.
            </div>
          )}
        </div>

      </div>

      {/* Explainable AI Rationale Section */}
      {routeResult?.explanation && (
        <ExplanationCard explanation={routeResult.explanation} mode={mode} />
      )}

      {/* Workflow Steps Presentation Section */}
      <HowItWorks />

    </div>
  );
}
