from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class RouteRequest(BaseModel):
    source: str = Field(..., example="central")
    destination: str = Field(..., example="rmk_engg")
    mode: str = Field("BALANCED", example="BALANCED") # FASTEST, CHEAPEST, SAFEST, BALANCED, EMERGENCY, ECO
    traffic_level: str = Field("LOW", example="LOW") # LOW, MEDIUM, HIGH
    road_condition: str = Field("NORMAL", example="NORMAL") # NORMAL, SLOW, BLOCKED
    risk_level: str = Field("LOW", example="LOW") # LOW, MEDIUM, HIGH
    custom_weights: Optional[Dict[str, float]] = None

class RecalculateRequest(RouteRequest):
    previous_route_id: Optional[str] = None

class RouteEdge(BaseModel):
    id: str
    source: str
    target: str
    name: str
    distance: float
    time: float
    cost: float
    risk: float
    traffic: float

class RouteMetrics(BaseModel):
    distance_km: float
    travel_time_min: float
    cost_inr: float
    risk_level: str
    risk_score: float
    traffic_level: str
    traffic_score: float
    fuel_consumption_liters: float
    co2_emissions_kg: float
    composite_score: float

class RouteDNA(BaseModel):
    route_id: str
    name: str
    algorithm: str
    metrics: RouteMetrics
    is_recommended: bool = False
    highlights: List[str]

class DetailedRoute(BaseModel):
    route_id: str
    name: str
    path_nodes: List[str]
    path_node_names: List[str]
    edges: List[Dict[str, Any]]
    metrics: RouteMetrics
    highlights: List[str]
    algorithm: str

class ExplanationResponse(BaseModel):
    selected_route_id: str
    selected_route_name: str
    why_selected: List[str]
    trade_offs: List[str]
    comparative_advantages: List[str]
    summary: str

class RouteResponse(BaseModel):
    selected_route: DetailedRoute
    alternatives: List[DetailedRoute]
    mode: str
    weights_used: Dict[str, float]
    explanation: ExplanationResponse
    total_candidate_routes_analyzed: int
    execution_time_ms: float
    adaptive_change: Optional[Dict[str, Any]] = None
