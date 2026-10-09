import time
from typing import Dict, List, Any, Optional
from backend.services.graph_service import GraphService, MODE_WEIGHTS
from backend.services.explanation_service import ExplanationService
from backend.algorithms.k_paths import find_k_shortest_paths

class RouteService:
    def __init__(self):
        self.graph_service = GraphService()

    def find_routes(
        self,
        source: str,
        destination: str,
        mode: str = "BALANCED",
        traffic_level: str = "LOW",
        road_condition: str = "NORMAL",
        risk_level: str = "LOW",
        custom_weights: Optional[Dict[str, float]] = None
    ) -> Dict[str, Any]:
        start_time = time.time()
        
        nodes_info = self.graph_service.get_nodes()
        if source not in nodes_info or destination not in nodes_info:
            raise ValueError(f"Invalid source '{source}' or destination '{destination}'.")
            
        if source == destination:
            raise ValueError("Source and destination locations cannot be the same.")

        # Build graph with dynamic live parameters
        graph_adj = self.graph_service.build_adjacency_graph(
            traffic_level=traffic_level,
            road_condition=road_condition,
            risk_level=risk_level
        )
        
        weight_calculator = self.graph_service.get_weight_calculator(mode, custom_weights)
        
        # Discover candidate paths
        raw_paths = find_k_shortest_paths(
            graph_adj=graph_adj,
            nodes_info=nodes_info,
            source=source,
            target=destination,
            weight_calculator=weight_calculator,
            k=3
        )
        
        if not raw_paths:
            raise ValueError(f"No available route found between {nodes_info[source]['name']} and {nodes_info[destination]['name']} under current road conditions (roads may be blocked).")

        # Evaluate candidate route metrics
        processed_routes = []
        for idx, path in enumerate(raw_paths):
            metrics = self._calculate_route_metrics(path["edges"])
            
            # Map node IDs to readable node names
            path_node_names = [nodes_info[n]["name"] for n in path["path_nodes"]]
            
            highlights = self._generate_route_highlights(metrics, mode)
            
            route_obj = {
                "route_id": f"route_{chr(65 + idx)}",
                "name": path.get("name", f"Route {chr(65 + idx)}"),
                "path_nodes": path["path_nodes"],
                "path_node_names": path_node_names,
                "edges": path["edges"],
                "metrics": metrics,
                "highlights": highlights,
                "algorithm": path.get("algorithm", "Dijkstra / Multi-Objective")
            }
            processed_routes.append(route_obj)

        # Normalize metrics & compute composite route scores according to mode weights
        active_weights = custom_weights or MODE_WEIGHTS.get(mode.upper(), MODE_WEIGHTS["BALANCED"])
        self._rank_routes(processed_routes, active_weights)

        # Selected route is rank 0
        selected_route = processed_routes[0]
        alternatives = processed_routes[1:]

        # Explanation generator
        explanation = ExplanationService.generate_explanation(selected_route, alternatives, mode)

        execution_time_ms = round((time.time() - start_time) * 1000, 2)

        return {
            "selected_route": selected_route,
            "alternatives": alternatives,
            "mode": mode,
            "weights_used": active_weights,
            "explanation": explanation,
            "total_candidate_routes_analyzed": len(processed_routes),
            "execution_time_ms": execution_time_ms
        }

    def _calculate_route_metrics(self, edges: List[Dict[str, Any]]) -> Dict[str, Any]:
        total_dist = sum(e["distance"] for e in edges)
        total_time = sum(e.get("effective_time", e["base_time"]) for e in edges)
        total_cost = sum(e.get("effective_cost", e["base_cost"]) for e in edges)
        
        avg_risk = sum(e.get("effective_risk", e["risk"]) * e["distance"] for e in edges) / max(total_dist, 0.1)
        avg_traffic = sum(e.get("effective_traffic", e["traffic"]) * e["distance"] for e in edges) / max(total_dist, 0.1)

        # Categorize risk and traffic levels
        risk_level = "Low" if avg_risk < 0.25 else ("Medium" if avg_risk < 0.5 else "High")
        traffic_level = "Low" if avg_traffic < 0.35 else ("Medium" if avg_traffic < 0.6 else "High")

        # Fuel & Emissions estimate
        # Base fuel consumption ~ 0.08 L/km + traffic penalty
        fuel_liters = round(total_dist * 0.075 * (1.0 + avg_traffic * 0.4), 2)
        co2_kg = round(fuel_liters * 2.31, 2) # ~ 2.31 kg CO2 per L petrol

        return {
            "distance_km": round(total_dist, 1),
            "travel_time_min": round(total_time, 1),
            "cost_inr": round(total_cost, 1),
            "risk_level": risk_level,
            "risk_score": round(avg_risk, 2),
            "traffic_level": traffic_level,
            "traffic_score": round(avg_traffic, 2),
            "fuel_consumption_liters": fuel_liters,
            "co2_emissions_kg": co2_kg,
            "composite_score": 0.0 # Will be populated during ranking
        }

    def _generate_route_highlights(self, metrics: Dict[str, Any], mode: str) -> List[str]:
        h = []
        if metrics["travel_time_min"] <= 30:
            h.append("Fast Transit Corridor")
        if metrics["risk_score"] < 0.2:
            h.append("Low Accident Risk Zone")
        if metrics["traffic_score"] < 0.3:
            h.append("Smooth Flow Traffic")
        if metrics["cost_inr"] <= 50:
            h.append("Low Toll & Cost")
        if not h:
            h.append("Standard Urban Corridor")
        return h

    def _rank_routes(self, routes: List[Dict[str, Any]], weights: Dict[str, float]):
        """
        Calculates multi-objective composite score and ranks routes.
        Higher composite score (0 - 1.0) = better choice.
        """
        if not routes:
            return

        min_t = min(r["metrics"]["travel_time_min"] for r in routes)
        max_t = max(r["metrics"]["travel_time_min"] for r in routes)
        
        min_c = min(r["metrics"]["cost_inr"] for r in routes)
        max_c = max(r["metrics"]["cost_inr"] for r in routes)
        
        min_d = min(r["metrics"]["distance_km"] for r in routes)
        max_d = max(r["metrics"]["distance_km"] for r in routes)
        
        min_r = min(r["metrics"]["risk_score"] for r in routes)
        max_r = max(r["metrics"]["risk_score"] for r in routes)

        def norm(val, min_v, max_v):
            if max_v - min_v == 0:
                return 0.5
            return (val - min_v) / (max_v - min_v)

        for r in routes:
            m = r["metrics"]
            norm_t = norm(m["travel_time_min"], min_t, max_t)
            norm_c = norm(m["cost_inr"], min_c, max_c)
            norm_d = norm(m["distance_km"], min_d, max_d)
            norm_r = norm(m["risk_score"], min_r, max_r)

            # Penalty cost (lower normalized values are better, so score = 1 - weighted_penalty)
            penalty = (
                weights["time"] * norm_t +
                weights["cost"] * norm_c +
                weights["dist"] * norm_d +
                weights["risk"] * norm_r
            )
            composite_score = round(max(0.01, 1.0 - penalty), 2)
            m["composite_score"] = composite_score

        # Sort routes descending by composite_score
        routes.sort(key=lambda x: x["metrics"]["composite_score"], reverse=True)
