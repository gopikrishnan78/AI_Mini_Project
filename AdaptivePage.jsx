import React from 'react';
import AdaptiveControlPanel from '../components/AdaptiveControlPanel';
import GraphMap from '../components/GraphMap';
import RouteDNA from '../components/RouteDNA';

export default function AdaptivePage({
  nodes,
  edges,
  source,
  destination,
  trafficLevel,
  setTrafficLevel,
  roadCondition,
  setRoadCondition,
  riskLevel,
  setRiskLevel,
  onRecalculate,
  adaptiveChange,
  isRecalculating,
  routeResult
}) {
  const selectedRoute = routeResult?.selected_route;
  const alternatives = routeResult?.alternatives || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">ADAPTIVE ROUTING PANEL</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">Real-time Road Condition Stress Simulation & Dynamic Re-routing</p>
      </div>

      <AdaptiveControlPanel
        trafficLevel={trafficLevel}
        setTrafficLevel={setTrafficLevel}
        roadCondition={roadCondition}
        setRoadCondition={setRoadCondition}
        riskLevel={riskLevel}
        setRiskLevel={setRiskLevel}
        onRecalculate={onRecalculate}
        adaptiveChange={adaptiveChange}
        isRecalculating={isRecalculating}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GraphMap
            nodes={nodes}
            edges={edges}
            selectedRoute={selectedRoute}
            alternatives={alternatives}
            sourceNodeId={source}
            targetNodeId={destination}
          />
        </div>

        <div>
          {selectedRoute && (
            <RouteDNA route={selectedRoute} isSelected={true} />
          )}
        </div>
      </div>
    </div>
  );
}
