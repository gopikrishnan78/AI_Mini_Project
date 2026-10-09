import React from 'react';
import { Cpu, GitBranch, Layers, ShieldCheck, HelpCircle } from 'lucide-react';

export default function AlgorithmExplanation() {
  return (
    <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
      
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-extrabold text-xl text-white tracking-tight">ACADEMIC ALGORITHM BREAKDOWN</h2>
          <p className="text-xs text-slate-400 font-mono">B.Tech Artificial Intelligence and Data Science Project Context</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* 1. Dijkstra */}
        <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-2">
            <GitBranch className="w-4 h-4" /> 1. Dijkstra’s Search Algorithm
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Finds the absolute minimum-cost path in a weighted directed/undirected graph representation of the urban road network.
          </p>
          <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
            <code>d(v) = min(d(v), d(u) + weight(u, v))</code>
          </div>
        </div>

        {/* 2. A* Search */}
        <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
            <Cpu className="w-4 h-4" /> 2. A* Heuristic Pathfinding
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Combines path cost <code>g(n)</code> with spatial Euclidean heuristic distance <code>h(n)</code> toward destination coordinates to accelerate graph exploration.
          </p>
          <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300">
            <code>f(n) = g(n) + h(n)</code>
          </div>
        </div>

        {/* 3. Multi-objective scoring */}
        <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
            <Layers className="w-4 h-4" /> 3. Multi-Objective Scoring
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Normalizes diverse physical metrics (Time, Cost, Distance, Risk) using min-max scaling to produce a unified decision composite score.
          </p>
          <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300">
            <code>Score = 1 - Σ (w_i * Norm(Metric_i))</code>
          </div>
        </div>

        {/* 4. Adaptive Routing */}
        <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
            <ShieldCheck className="w-4 h-4" /> 4. Adaptive Re-routing Engine
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Dynamically updates edge weights in real-time when traffic congestion, road blockages, or safety risks change, recalculating optimal path deltas.
          </p>
          <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-purple-300">
            <code>Eff_Time = Base_Time * Traffic_Mult * Road_Mult</code>
          </div>
        </div>

      </div>

    </div>
  );
}
