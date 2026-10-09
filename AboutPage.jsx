import React from 'react';
import { Info, Cpu, CheckCircle2, Globe, Rocket, ShieldCheck } from 'lucide-react';
import AlgorithmExplanation from '../components/AlgorithmExplanation';

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">ABOUT THE PROJECT</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">B.Tech Artificial Intelligence and Data Science Project Documentation</p>
      </div>

      <div className="bg-slate-900/80 rounded-2xl p-8 border border-slate-800 shadow-xl space-y-6">
        
        {/* Project Title Header */}
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            PROJECT OVERVIEW
          </span>
          <h2 className="text-2xl font-black text-white mt-3">
            AI-Based Adaptive Optimal Path Detection and Route Optimization System
          </h2>
        </div>

        {/* Core Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-6 pt-2">
          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
            <h3 className="text-sm font-extrabold text-rose-400 uppercase tracking-wider mb-2">Core Problem</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Traditional navigation systems rely primarily on minimizing geographical distance or single static metrics. In real-world urban transit, shortest distance frequently leads to heavily congested bottlenecks, unpaved high-hazard roads, excessive toll costs, or dangerous intersections.
            </p>
          </div>

          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
            <h3 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wider mb-2">Proposed AI Solution</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              An intelligent multi-objective route optimization engine combining weighted graph search (Dijkstra + A*), multi-attribute normalization, real-time adaptive rerouting, compact Route DNA profiling, and Explainable AI (XAI) rationale generation.
            </p>
          </div>
        </div>

        {/* Key Innovations */}
        <div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">Main Project Innovations</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <div className="font-bold text-cyan-400 mb-1">Multi-Objective Optimization</div>
              <p className="text-slate-400">Evaluates composite scores incorporating distance, travel time, toll cost, safety hazards, and traffic density.</p>
            </div>
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <div className="font-bold text-amber-400 mb-1">Adaptive Re-routing Engine</div>
              <p className="text-slate-400">Dynamically recalibrates edge weights upon detecting road blockages or traffic spikes.</p>
            </div>
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <div className="font-bold text-emerald-400 mb-1">Explainable AI (XAI)</div>
              <p className="text-slate-400">Calculates and presents human-readable mathematical justification for selecting the optimal corridor.</p>
            </div>
          </div>
        </div>

        {/* Practical Applications */}
        <div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">Real-World Applications</h3>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {['Emergency Dispatch & Ambulances', 'Logistics & Fleet Dispatch', 'Smart City Traffic Management', 'Ride-Hailing Optimization', 'Eco-conscious Navigation', 'Hazard-Avoidance Transit'].map((app, i) => (
              <span key={i} className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> {app}
              </span>
            ))}
          </div>
        </div>

        {/* Future Scope */}
        <div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-purple-400" /> Future Scope & Extensions
          </h3>
          <ul className="grid md:grid-cols-2 gap-2 text-xs text-slate-300">
            <li className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">• Real-time GPS & IoT sensor feed integration</li>
            <li className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">• Deep Reinforcement Learning for predictive traffic modeling</li>
            <li className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">• Weather-aware dynamic hazard calibration</li>
            <li className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">• Multi-modal public transit & electric vehicle charging stops</li>
          </ul>
        </div>

      </div>

      {/* Academic Algorithm Breakdown */}
      <AlgorithmExplanation />

    </div>
  );
}
