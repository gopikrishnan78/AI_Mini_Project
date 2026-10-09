import React from 'react';
import ComparisonTable from '../components/ComparisonTable';
import RouteDNA from '../components/RouteDNA';

export default function ComparisonPage({ routeResult, onSelectRoute }) {
  const selectedRoute = routeResult?.selected_route;
  const alternatives = routeResult?.alternatives || [];
  const allRoutes = selectedRoute ? [selectedRoute, ...alternatives] : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">CANDIDATE ROUTE COMPARISON</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">Side-by-side Multi-Attribute Trade-off Evaluation</p>
      </div>

      <ComparisonTable
        routes={allRoutes}
        selectedRouteId={selectedRoute?.route_id}
        onSelectRoute={onSelectRoute}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {allRoutes.map((r) => (
          <RouteDNA
            key={r.route_id}
            route={r}
            isSelected={r.route_id === selectedRoute?.route_id}
          />
        ))}
      </div>
    </div>
  );
}
