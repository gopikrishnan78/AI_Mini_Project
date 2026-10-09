import React from 'react';
import { Network, Search, Calculator, Sliders, Sparkles, RefreshCw } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'CONNECT',
      icon: Network,
      desc: 'Receive source, destination, and multi-objective routing preferences.',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      num: '02',
      title: 'SEARCH',
      icon: Search,
      desc: 'Explore candidate paths using weighted Dijkstra and A* algorithms.',
      color: 'from-cyan-400 to-teal-400'
    },
    {
      num: '03',
      title: 'SCORE',
      icon: Calculator,
      desc: 'Evaluate time, cost, distance, safety risk, and traffic congestion.',
      color: 'from-teal-400 to-emerald-400'
    },
    {
      num: '04',
      title: 'COMPARE',
      icon: Sliders,
      desc: 'Normalize multi-attribute metrics and rank top candidate corridors.',
      color: 'from-emerald-400 to-amber-400'
    },
    {
      num: '05',
      title: 'EXPLAIN',
      icon: Sparkles,
      desc: 'Generate human-readable Explainable AI rationale detailing trade-offs.',
      color: 'from-amber-400 to-purple-400'
    },
    {
      num: '06',
      title: 'ADAPT',
      icon: RefreshCw,
      desc: 'Dynamically recalculate paths when live traffic or road hazards change.',
      color: 'from-purple-400 to-rose-400'
    }
  ];

  return (
    <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 shadow-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          SYSTEM WORKFLOW
        </span>
        <h2 className="text-2xl font-extrabold text-white mt-2 tracking-tight">HOW THE AI ENGINE WORKS</h2>
        <p className="text-xs text-slate-400 mt-1">
          Six-stage multi-objective route optimization pipeline
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 hover:border-cyan-500/40 transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-extrabold font-mono text-slate-600 group-hover:text-cyan-400 transition-colors">
                  {step.num}
                </span>
                <div className={`p-2 rounded-lg bg-gradient-to-tr ${step.color} text-slate-950 font-bold shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h4 className="font-extrabold text-sm text-white mb-1.5">{step.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
