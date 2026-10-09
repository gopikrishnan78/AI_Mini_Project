import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import PlannerPage from './pages/PlannerPage';
import ComparisonPage from './pages/ComparisonPage';
import AdaptivePage from './pages/AdaptivePage';
import AnalyticsPage from './pages/AnalyticsPage';
import AboutPage from './pages/AboutPage';

import { fetchGraphData, findOptimalRoute, recalculateAdaptiveRoute } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Graph state
  const [graphData, setGraphData] = useState({ nodes: {}, edges: [] });

  // Route calculation parameters (Default Demo Scenario: Central -> RMK Engg College)
  const [source, setSource] = useState('central');
  const [destination, setDestination] = useState('rmk_engg');
  const [mode, setMode] = useState('BALANCED');

  // Adaptive routing parameters
  const [trafficLevel, setTrafficLevel] = useState('LOW');
  const [roadCondition, setRoadCondition] = useState('NORMAL');
  const [riskLevel, setRiskLevel] = useState('LOW');

  // Calculation results & state
  const [routeResult, setRouteResult] = useState(null);
  const [adaptiveChange, setAdaptiveChange] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Load graph data on init
  useEffect(() => {
    fetchGraphData().then(data => {
      setGraphData(data);
    });
  }, []);

  // Sync mode when emergencyMode toggled
  useEffect(() => {
    if (emergencyMode) {
      setMode('EMERGENCY');
    } else if (mode === 'EMERGENCY') {
      setMode('BALANCED');
    }
  }, [emergencyMode]);

  // Initial route computation on startup
  useEffect(() => {
    handleComputeRoute();
  }, [mode]);

  const handleComputeRoute = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const activeMode = emergencyMode ? 'EMERGENCY' : mode;
      const res = await findOptimalRoute({
        source,
        destination,
        mode: activeMode,
        traffic_level: trafficLevel,
        road_condition: roadCondition,
        risk_level: riskLevel
      });
      setRouteResult(res);
      setAdaptiveChange(null);
    } catch (err) {
      setErrorMsg(err.message || 'Error calculating route.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecalculateAdaptive = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const activeMode = emergencyMode ? 'EMERGENCY' : mode;
      const res = await recalculateAdaptiveRoute({
        source,
        destination,
        mode: activeMode,
        traffic_level: trafficLevel,
        road_condition: roadCondition,
        risk_level: riskLevel,
        previous_route_id: routeResult?.selected_route?.route_id || 'route_A'
      });
      setRouteResult(res);
      setAdaptiveChange(res.adaptive_change);
    } catch (err) {
      setErrorMsg(err.message || 'Error recalculating path.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRouteFromMatrix = (route) => {
    if (!routeResult) return;
    setRouteResult(prev => ({
      ...prev,
      selected_route: route,
      alternatives: prev.alternatives.filter(r => r.route_id !== route.route_id)
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        emergencyMode={emergencyMode}
        setEmergencyMode={setEmergencyMode}
      />

      {/* Emergency Mode Top Warning Banner */}
      {emergencyMode && (
        <div className="bg-red-600/90 text-white font-mono text-xs py-2 px-4 text-center font-bold tracking-wider flex items-center justify-center gap-2 border-b border-red-500 animate-pulse">
          <span>🚨 EMERGENCY DISPATCH MODE ACTIVE • PRIORITY OVERRIDE FOR FASTEST & SAFEST CORRIDORS</span>
        </div>
      )}

      {/* Error Message Toast */}
      {errorMsg && (
        <div className="max-w-7xl mx-auto px-4 mt-4 w-full">
          <div className="bg-rose-500/10 border border-rose-500/40 text-rose-300 p-4 rounded-xl text-xs font-semibold flex items-center justify-between">
            <span>⚠️ {errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="text-white hover:underline">Dismiss</button>
          </div>
        </div>
      )}

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'dashboard' && (
          <DashboardPage
            nodes={graphData.nodes}
            edges={graphData.edges}
            source={source}
            setSource={setSource}
            destination={destination}
            setDestination={setDestination}
            mode={mode}
            setMode={setMode}
            routeResult={routeResult}
            onCalculate={handleComputeRoute}
            isLoading={isLoading}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'planner' && (
          <PlannerPage
            nodes={graphData.nodes}
            edges={graphData.edges}
            source={source}
            setSource={setSource}
            destination={destination}
            setDestination={setDestination}
            mode={mode}
            setMode={setMode}
            routeResult={routeResult}
            onCalculate={handleComputeRoute}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'comparison' && (
          <ComparisonPage
            routeResult={routeResult}
            onSelectRoute={handleSelectRouteFromMatrix}
          />
        )}

        {activeTab === 'adaptive' && (
          <AdaptivePage
            nodes={graphData.nodes}
            edges={graphData.edges}
            source={source}
            destination={destination}
            trafficLevel={trafficLevel}
            setTrafficLevel={setTrafficLevel}
            roadCondition={roadCondition}
            setRoadCondition={setRoadCondition}
            riskLevel={riskLevel}
            setRiskLevel={setRiskLevel}
            onRecalculate={handleRecalculateAdaptive}
            adaptiveChange={adaptiveChange}
            isRecalculating={isLoading}
            routeResult={routeResult}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPage routeResult={routeResult} />
        )}

        {activeTab === 'about' && (
          <AboutPage />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0B0F19] py-6 text-center text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            AI-Based Adaptive Optimal Path Detection and Route Optimization System
          </div>
          <div className="text-slate-400">
            B.Tech Artificial Intelligence and Data Science Mini-Project
          </div>
        </div>
      </footer>

    </div>
  );
}
