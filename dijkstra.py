import heapq
from typing import Dict, List, Tuple, Any, Optional

def dijkstra_search(
    graph_adj: Dict[str, List[Dict[str, Any]]],
    source: str,
    target: str,
    weight_calculator: Any
) -> Optional[Dict[str, Any]]:
    """
    Dijkstra's Shortest Path Algorithm for multi-objective weighted graph.
    
    :param graph_adj: Adjacency list mapping node -> list of edge dicts
    :param source: Starting node ID
    :param target: Destination node ID
    :param weight_calculator: Function mapping edge dict -> numeric effective cost
    :return: Dict containing path node list, edges traversed, and total effective weight
    """
    if source not in graph_adj or target not in graph_adj:
        return None
        
    distances: Dict[str, float] = {node: float('inf') for node in graph_adj}
    previous_nodes: Dict[str, Optional[str]] = {node: None for node in graph_adj}
    previous_edges: Dict[str, Optional[Dict[str, Any]]] = {node: None for node in graph_adj}
    
    distances[source] = 0.0
    pq = [(0.0, source)] # (cost, current_node)
    visited = set()

    while pq:
        current_cost, current_node = heapq.heappop(pq)
        
        if current_node in visited:
            continue
        visited.add(current_node)
        
        if current_node == target:
            break
            
        for edge in graph_adj.get(current_node, []):
            neighbor = edge["target"] if edge["source"] == current_node else edge["source"]
            
            # Calculate cost using objective weighting function
            edge_weight = weight_calculator(edge)
            if edge_weight >= float('inf'): # Blocked road
                continue
                
            new_cost = current_cost + edge_weight
            
            if new_cost < distances[neighbor]:
                distances[neighbor] = new_cost
                previous_nodes[neighbor] = current_node
                previous_edges[neighbor] = edge
                heapq.heappush(pq, (new_cost, neighbor))
                
    if distances[target] == float('inf'):
        return None # Path not reachable
        
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
        "algorithm": "Dijkstra",
        "path_nodes": path_nodes,
        "edges": path_edges,
        "total_weight": distances[target]
    }
