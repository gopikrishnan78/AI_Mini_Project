import React from 'react';
import { HelpCircle, CheckCircle, ArrowRightLeft, Sparkles, AlertCircle } from 'lucide-react';

export default function ExplanationCard({ explanation, mode }) {
  if (!explanation) return null;

  return (
    <div className="bg-slate-900/80 rounded-2xl p-6 border border-cyan-500/30 shadow-xl relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white tracking-tight">WHY {explanation.selected_route_name?.toUpperCase()}?</h3>
            <p className="text-xs text-slate-400 font-mono">Explainable AI (XAI) Decision Rationale • {mode} Mode</p>
          </div>
        </div>

        <span className="bg-cyan-500/10 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500/20 font-mono font-medium">
          Calculated Metric Rationale
        </span>
      </div>

      {/* Summary Box */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 mb-5 text-sm text-slate-200 leading-relaxed font-medium">
        "{explanation.summary}"
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        
        {/* Why Selected (Key Advantages) */}
        <div>
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Key Optimization Wins
          </h4>
          <ul className="space-y-2.5">
            {explanation.why_selected?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trade-offs & Comparative Notes */}
        <div>
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <ArrowRightLeft className="w-4 h-4 text-amber-400" /> Metric Trade-off Analysis
          </h4>
          <ul className="space-y-2.5">
            {explanation.trade_offs?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
