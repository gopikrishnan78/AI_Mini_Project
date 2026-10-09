import heapq
import math
from typing import Dict, List, Tuple, Any, Optional

def euclidean_distance_heuristic(node_a_coords: Tuple[float, float], node_b_coords: Tuple[float, float]) -> float:
    """Calculates Euclidean distance heuristic between two spatial coordinates (X, Y)."""
    dx = node_a_coords[0] - node_b_coords[0]
    dy = node_a_coords[1] - node_b_coords[1]
    return math.sqrt(dx * dx + dy * dy) * 0.05 # Scaled heuristic for weight comparison

def astar_search(
    graph_adj: Dict[str, List[Dict[str, Any]]],
    nodes_info: Dict[str, Dict[str, Any]],
    source: str,
    target: str,
    weight_calculator: Any
) -> Optional[Dict[str, Any]]:
    """
    A* Search Algorithm for multi-objective weighted graph with Euclidean distance heuristic.
    
    :param graph_adj: Adjacency list mapping node -> list of edge dicts
    :param nodes_info: Dict containing node metadata including (x, y) spatial coordinates
    :param source: Starting node ID
    :param target: Destination node ID
    :param weight_calculator: Function mapping edge dict -> numeric effective cost
    :return: Dict containing path node list, edges traversed, total g_score and f_score
    """
    if source not in graph_adj or target not in graph_adj:
        return None
        
    target_coords = (nodes_info[target]["x"], nodes_info[target]["y"])
    
    g_score: Dict[str, float] = {node: float('inf') for node in graph_adj}
    f_score: Dict[str, float] = {node: float('inf') for node in graph_adj}
    previous_nodes: Dict[str, Optional[str]] = {node: None for node in graph_adj}
    previous_edges: Dict[str, Optional[Dict[str, Any]]] = {node: None for node in graph_adj}
    
    source_coords = (nodes_info[source]["x"], nodes_info[source]["y"])
    g_score[source] = 0.0
    f_score[source] = euclidean_distance_heuristic(source_coords, target_coords)
    
    pq = [(f_score[source], 0.0, source)] # (f_score, g_score, node)
    visited = set()

    while pq:
        current_f, current_g, current_node = heapq.heappop(pq)
        
        if current_node in visited:
            continue
        visited.add(current_node)
        
        if current_node == target:
            break
            
        for edge in graph_adj.get(current_node, []):
            neighbor = edge["target"] if edge["source"] == current_node else edge["source"]
            
            edge_weight = weight_calculator(edge)
            if edge_weight >= float('inf'): # Blocked road
                continue
                
            tentative_g = current_g + edge_weight
            
            if tentative_g < g_score[neighbor]:
                g_score[neighbor] = tentative_g
                neighbor_coords = (nodes_info[neighbor]["x"], nodes_info[neighbor]["y"])
                h = euclidean_distance_heuristic(neighbor_coords, target_coords)
                f_score[neighbor] = tentative_g + h
                
                previous_nodes[neighbor] = current_node
                previous_edges[neighbor] = edge
                heapq.heappush(pq, (f_score[neighbor], tentative_g, neighbor))
                
    if g_score[target] == float('inf'):
        return None
        
    # Reconstruct path
    path_nodes = []
    path_edges = []
    curr = target
    while curr is not None:
        path_nodes.append(curr)
        if previous_edges[curr] is not None:
            path_edges.append(previous_edges[curr])
        curr = previous_nodes[curr]
        
    path_nodes.reverse()
    path_edges.reverse()
    
    return {
        "algorithm": "A*",
        "path_nodes": path_nodes,
        "edges": path_edges,
        "total_weight": g_score[target]
    }
