import React from 'react';
import { Navigation, Cpu, Sliders, BarChart3, Info, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, emergencyMode, setEmergencyMode }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Cpu },
    { id: 'planner', label: 'Route Planner', icon: Navigation },
    { id: 'comparison', label: 'Route Comparison', icon: Sliders },
    { id: 'adaptive', label: 'Adaptive Routing', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'about', label: 'About Project', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">AI ROUTE</span>
                <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2 py-0.5 rounded-full border border-cyan-500/20 font-mono font-medium">v2.0 AI Engine</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Adaptive Multi-Objective Path Detection</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Emergency Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEmergencyMode(!emergencyMode);
                if (!emergencyMode) setActiveTab('planner');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                emergencyMode
                  ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/40 animate-pulse'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-red-500/50 hover:text-red-400'
              }`}
            >
              {emergencyMode ? <AlertTriangle className="w-4 h-4 animate-bounce" /> : <ShieldCheck className="w-4 h-4 text-emerald-400" />}
              <span>{emergencyMode ? 'EMERGENCY MODE ACTIVE' : 'EMERGENCY MODE'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile nav subbar */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 bg-slate-900/90 border-t border-slate-800 gap-2 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1 rounded-lg text-xs font-medium ${
                isActive ? 'bg-cyan-500 text-white' : 'text-slate-400 bg-slate-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
