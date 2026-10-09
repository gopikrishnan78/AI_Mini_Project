import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers, Info } from 'lucide-react';

export default function GraphMap({
  nodes,
  edges,
  selectedRoute,
  alternatives = [],
  sourceNodeId,
  targetNodeId,
  onNodeSelect
}) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);

  // Extract selected path edge IDs & node IDs
  const activeEdgeIds = new Set(selectedRoute?.edges?.map(e => e.id) || []);
  const activeNodeIds = new Set(selectedRoute?.path_nodes || []);

  // Collect alternative edge IDs
  const altEdgeIds = new Set();
  alternatives.forEach(alt => {
    alt.edges?.forEach(e => {
      if (!activeEdgeIds.has(e.id)) altEdgeIds.add(e.id);
    });
  });

  return (
    <div className="relative w-full h-[540px] bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      
      {/* Map Overlay Controls Header */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60 shadow-lg">
        <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
        <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Simulated Chennai Graph Network</span>
        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/30">
          {Object.keys(nodes || {}).length} Nodes | {edges?.length || 0} Edges
        </span>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 rounded bg-emerald-400 shadow-sm shadow-emerald-400/50"></span>
          <span className="text-slate-300 font-medium">Optimal AI Path</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 rounded bg-indigo-400 border border-dashed border-indigo-300"></span>
          <span className="text-slate-400 font-medium">Alternative Corridor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-300 font-medium">Source</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span className="text-slate-300 font-medium">Destination</span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <svg className="w-full h-full cursor-crosshair select-none" viewBox="0 0 750 780" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="mapBgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          
          <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Map Grid Background Pattern */}
        <rect width="100%" height="100%" fill="url(#mapBgGrad)" />
        <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />

        {/* Render Graph Edges */}
        <g id="edges-layer">
          {edges?.map((edge) => {
            const sourceNode = nodes[edge.source];
            const targetNode = nodes[edge.target];
            if (!sourceNode || !targetNode) return null;

            const isSelected = activeEdgeIds.has(edge.id);
            const isAlt = altEdgeIds.has(edge.id);
            const isHovered = hoveredEdge?.id === edge.id;

            // Stroke color based on traffic/risk unless selected
            let strokeColor = "#334155";
            let strokeWidth = 2.5;
            let strokeDasharray = "none";
            let filter = "none";

            if (isSelected) {
              strokeColor = "#10b981"; // Emerald green
              strokeWidth = 5.5;
              filter = "url(#glowGreen)";
            } else if (isAlt) {
              strokeColor = "#818cf8"; // Indigo
              strokeWidth = 3.5;
              strokeDasharray = "6 4";
            } else if (edge.traffic >= 0.6 || edge.risk >= 0.5) {
              strokeColor = "#f43f5e"; // High risk red
              strokeWidth = 2;
            } else if (edge.traffic >= 0.4) {
              strokeColor = "#f59e0b"; // Warning orange
              strokeWidth = 2;
            }

            if (isHovered) {
              strokeWidth += 2;
            }

            return (
              <g key={edge.id} className="transition-all duration-300">
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeLinecap="round"
                  filter={filter}
                  onMouseEnter={() => setHoveredEdge(edge)}
                  onMouseLeave={() => setHoveredEdge(null)}
                />
                
                {/* Edge Label for Active Route */}
                {isSelected && (
                  <text
                    x={(sourceNode.x + targetNode.x) / 2}
                    y={(sourceNode.y + targetNode.y) / 2 - 6}
                    fill="#34d399"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none font-mono"
                  >
                    {edge.distance}km ({edge.base_time}m)
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Render Graph Nodes */}
        <g id="nodes-layer">
          {Object.values(nodes || {}).map((node) => {
            const isSource = node.id === sourceNodeId;
            const isTarget = node.id === targetNodeId;
            const isPathNode = activeNodeIds.has(node.id);
            const isHovered = hoveredNode?.id === node.id;

            let fill = "#1e293b";
            let stroke = "#475569";
            let radius = 9;

            if (isSource) {
              fill = "#10b981";
              stroke = "#ecfdf5";
              radius = 13;
            } else if (isTarget) {
              fill = "#f43f5e";
              stroke = "#fff1f2";
              radius = 13;
            } else if (isPathNode) {
              fill = "#06b6d4";
              stroke = "#cff4fc";
              radius = 11;
            }

            return (
              <g
                key={node.id}
                className="cursor-pointer transition-transform duration-200 hover:scale-125"
                onClick={() => onNodeSelect && onNodeSelect(node.id)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Pulse Ring for Source/Target */}
                {(isSource || isTarget) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius + 8}
                    fill={isSource ? '#10b981' : '#f43f5e'}
                    opacity="0.25"
                    className="animate-ping"
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? radius + 3 : radius}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isPathNode || isSource || isTarget ? 3 : 1.5}
                />

                {/* Node Code Label */}
                <text
                  x={node.x}
                  y={node.y + radius + 14}
                  fill={isPathNode || isSource || isTarget ? "#ffffff" : "#94a3b8"}
                  fontSize={isPathNode ? "11" : "10"}
                  fontWeight={isPathNode ? "bold" : "500"}
                  textAnchor="middle"
                  className="pointer-events-none font-sans"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Hover Info Banner */}
      {hoveredNode && (
        <div className="absolute top-4 right-4 z-20 bg-slate-900/95 border border-cyan-500/40 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md max-w-xs text-xs">
          <div className="font-bold text-cyan-400 text-sm">{hoveredNode.name}</div>
          <div className="text-slate-300 font-mono mt-0.5">Code: {hoveredNode.code}</div>
          <div className="text-slate-400 mt-1">{hoveredNode.description}</div>
          <div className="mt-2 text-[10px] text-cyan-300/80 font-medium">Click to set as Source / Destination</div>
        </div>
      )}

      {hoveredEdge && (
        <div className="absolute top-4 right-4 z-20 bg-slate-900/95 border border-emerald-500/40 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md max-w-xs text-xs">
          <div className="font-bold text-emerald-400 text-sm">{hoveredEdge.name}</div>
          <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-slate-300">
            <div>Distance: <span className="text-white font-bold">{hoveredEdge.distance} km</span></div>
            <div>Time: <span className="text-white font-bold">{hoveredEdge.base_time} min</span></div>
            <div>Cost: <span className="text-white font-bold">₹{hoveredEdge.base_cost}</span></div>
            <div>Traffic: <span className="text-amber-400 font-bold">{Math.round(hoveredEdge.traffic * 100)}%</span></div>
          </div>
        </div>
      )}

    </div>
  );
}
