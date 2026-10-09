import copy
from typing import Dict, List, Any
from backend.algorithms.dijkstra import dijkstra_search
from backend.algorithms.astar import astar_search

def find_k_shortest_paths(
    graph_adj: Dict[str, List[Dict[str, Any]]],
    nodes_info: Dict[str, Dict[str, Any]],
    source: str,
    target: str,
    weight_calculator: Any,
    k: int = 3
) -> List[Dict[str, Any]]:
    """
    Generates K distinct alternative candidate routes between source and target
    using edge penalization method and hybrid Dijkstra / A* search.
    """
    candidate_routes: List[Dict[str, Any]] = []
    seen_path_signatures = set()
    
    # 1. Primary path using Dijkstra
    path1 = dijkstra_search(graph_adj, source, target, weight_calculator)
    if path1:
        sig = "-".join(path1["path_nodes"])
        seen_path_signatures.add(sig)
        path1["name"] = "Route A (Optimal Path)"
        candidate_routes.append(path1)

    # 2. Primary path using A* search
    path_astar = astar_search(graph_adj, nodes_info, source, target, weight_calculator)
    if path_astar:
        sig_astar = "-".join(path_astar["path_nodes"])
        if sig_astar not in seen_path_signatures:
            seen_path_signatures.add(sig_astar)
            path_astar["name"] = "Route B (A* Guided Path)"
            candidate_routes.append(path_astar)

    # 3. Iterative Edge Penalty to discover distinct alternative corridors
    penalty_multiplier = 2.5
    modified_graph = copy.deepcopy(graph_adj)
    
    # Apply penalty to edges on existing paths to force exploration of alternatives
    for route in list(candidate_routes):
        for edge in route["edges"]:
            edge_id = edge["id"]
            # Find and penalize in modified_graph
            for node_list in modified_graph.values():
                for e in node_list:
                    if e["id"] == edge_id:
                        e["penalized_cost"] = weight_calculator(e) * penalty_multiplier

    def penalized_weight_calculator(e):
        if "penalized_cost" in e:
            return e["penalized_cost"]
        return weight_calculator(e)

    for i in range(len(candidate_routes), k + 1):
        alt_path = dijkstra_search(modified_graph, source, target, penalized_weight_calculator)
        if not alt_path:
            break
            
        sig = "-".join(alt_path["path_nodes"])
        if sig in seen_path_signatures:
            # Further increase penalty and try once more
            penalty_multiplier *= 2.0
            for edge in alt_path["edges"]:
                for node_list in modified_graph.values():
                    for e in node_list:
                        if e["id"] == edge["id"]:
                            e["penalized_cost"] = weight_calculator(e) * penalty_multiplier
            continue
            
        seen_path_signatures.add(sig)
        alt_path["name"] = f"Route {chr(65 + len(candidate_routes))} (Alternative {len(candidate_routes)})"
        # Reset total_weight to unpenalized real weight
        alt_path["algorithm"] = "Multi-Objective Search"
        candidate_routes.append(alt_path)
        
        # Penalize newly found path
        for edge in alt_path["edges"]:
            for node_list in modified_graph.values():
                for e in node_list:
                    if e["id"] == edge["id"]:
                        e["penalized_cost"] = weight_calculator(e) * penalty_multiplier
                        
    return candidate_routes
