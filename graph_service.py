import copy
from typing import Dict, List, Any
from backend.data.graph_data import CHENNAI_NODES, CHENNAI_EDGES

# Routing Mode Weights
# Formula: W_time * time + W_cost * cost + W_dist * dist + W_risk * risk
MODE_WEIGHTS = {
    "FASTEST": {
        "time": 0.55,
        "cost": 0.10,
        "dist": 0.20,
        "risk": 0.15
    },
    "CHEAPEST": {
        "time": 0.10,
        "cost": 0.55,
        "dist": 0.20,
        "risk": 0.15
    },
    "SAFEST": {
        "time": 0.15,
        "cost": 0.10,
        "dist": 0.15,
        "risk": 0.60
    },
    "BALANCED": {
        "time": 0.30,
        "cost": 0.20,
        "dist": 0.25,
        "risk": 0.25
    },
    "EMERGENCY": {
        "time": 0.65,
        "cost": 0.00,
        "dist": 0.10,
        "risk": 0.25
    },
    "ECO": {
        "time": 0.15,
        "cost": 0.30,
        "dist": 0.45,
        "risk": 0.10
    }
}

TRAFFIC_MODIFIERS = {
    "LOW": 1.0,
    "MEDIUM": 1.45,
    "HIGH": 2.20
}

ROAD_CONDITION_MODIFIERS = {
    "NORMAL": 1.0,
    "SLOW": 1.75,
    "BLOCKED": float('inf') # Impassable
}

RISK_MODIFIERS = {
    "LOW": 1.0,
    "MEDIUM": 1.8,
    "HIGH": 3.0
}

class GraphService:
    def __init__(self):
        self.nodes = CHENNAI_NODES
        self.raw_edges = CHENNAI_EDGES

    def get_nodes(self) -> Dict[str, Any]:
        return self.nodes

    def get_edges(self) -> List[Dict[str, Any]]:
        return self.raw_edges

    def build_adjacency_graph(
        self,
        traffic_level: str = "LOW",
        road_condition: str = "NORMAL",
        risk_level: str = "LOW"
    ) -> Dict[str, List[Dict[str, Any]]]:
        """
        Builds undirected adjacency list for the road network, applying live adaptive modifiers.
        """
        traffic_mult = TRAFFIC_MODIFIERS.get(traffic_level.upper(), 1.0)
        road_mult = ROAD_CONDITION_MODIFIERS.get(road_condition.upper(), 1.0)
        risk_mult = RISK_MODIFIERS.get(risk_level.upper(), 1.0)

        adj: Dict[str, List[Dict[str, Any]]] = {node_id: [] for node_id in self.nodes}

        for edge in self.raw_edges:
            # Create dynamic edge copy with active modifiers
            dynamic_edge = copy.deepcopy(edge)
            
            # Apply dynamic traffic & road condition to travel time
            if road_mult == float('inf'):
                dynamic_edge["effective_time"] = float('inf')
                dynamic_edge["effective_cost"] = float('inf')
            else:
                dynamic_edge["effective_time"] = round(edge["base_time"] * traffic_mult * road_mult, 1)
                dynamic_edge["effective_cost"] = round(edge["base_cost"] * (1.0 + (traffic_mult - 1.0) * 0.3), 1)
                
            dynamic_edge["effective_risk"] = min(1.0, round(edge["risk"] * risk_mult, 2))
            dynamic_edge["effective_traffic"] = min(1.0, round(edge["traffic"] * traffic_mult, 2))

            # Add forward & reverse edges (undirected road network)
            adj[edge["source"]].append(dynamic_edge)

            reverse_edge = copy.deepcopy(dynamic_edge)
            reverse_edge["source"] = edge["target"]
            reverse_edge["target"] = edge["source"]
            adj[edge["target"]].append(reverse_edge)

        return adj

    def get_weight_calculator(self, mode: str, custom_weights: Dict[str, float] = None):
        """
        Returns edge weight calculation function according to routing mode.
        """
        weights = custom_weights or MODE_WEIGHTS.get(mode.upper(), MODE_WEIGHTS["BALANCED"])

        def calculator(edge: Dict[str, Any]) -> float:
            eff_time = edge.get("effective_time", edge["base_time"])
            if eff_time == float('inf'):
                return float('inf')

            dist = edge["distance"]
            cost = edge.get("effective_cost", edge["base_cost"])
            risk = edge.get("effective_risk", edge["risk"])

            # Scale metrics to comparable magnitude
            # Time ~ 10-60 mins, Cost ~ 10-100 INR, Dist ~ 2-40 km, Risk ~ 0-1
            weighted_cost = (
                weights["time"] * (eff_time / 30.0) +
                weights["cost"] * (cost / 50.0) +
                weights["dist"] * (dist / 20.0) +
                weights["risk"] * (risk * 2.5)
            )
            return weighted_cost

        return calculator
