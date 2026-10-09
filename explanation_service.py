from typing import Dict, List, Any

class ExplanationService:
    @staticmethod
    def generate_explanation(
        selected_route: Dict[str, Any],
        alternatives: List[Dict[str, Any]],
        mode: str
    ) -> Dict[str, Any]:
        """
        Generates Explainable AI reasoning detailing why the selected route was chosen over alternatives.
        """
        sel_m = selected_route["metrics"]
        why_selected = []
        trade_offs = []
        comparative_advantages = []

        # Compare with runner up alternative if available
        if alternatives:
            runner_up = alternatives[0]
            alt_m = runner_up["metrics"]

            # Time comparison
            time_diff = alt_m["travel_time_min"] - sel_m["travel_time_min"]
            if time_diff > 1.5:
                percent_saved = round((time_diff / alt_m["travel_time_min"]) * 100)
                why_selected.append(f"Saves {round(time_diff, 1)} minutes ({percent_saved}% faster) compared to {runner_up['name']}")
                comparative_advantages.append(f"Optimal travel time ({sel_m['travel_time_min']} mins vs {alt_m['travel_time_min']} mins)")
            elif time_diff < -1.5:
                trade_offs.append(f"Takes {round(abs(time_diff), 1)} mins longer than {runner_up['name']}, but optimized for {mode.lower()} criteria")

            # Cost comparison
            cost_diff = alt_m["cost_inr"] - sel_m["cost_inr"]
            if cost_diff > 5:
                why_selected.append(f"Cheaper by ₹{round(cost_diff, 1)} compared to {runner_up['name']}")
                comparative_advantages.append(f"Cost effective (₹{sel_m['cost_inr']} vs ₹{alt_m['cost_inr']})")
            elif cost_diff < -5:
                trade_offs.append(f"Cost is ₹{round(abs(cost_diff), 1)} higher, compensated by time/safety gains")

            # Risk & Traffic comparison
            if sel_m["risk_score"] < alt_m["risk_score"]:
                why_selected.append(f"Lower safety risk profile ({sel_m['risk_level']} Risk vs {alt_m['risk_level']} Risk)")
            
            if sel_m["traffic_score"] < alt_m["traffic_score"]:
                why_selected.append("Bypasses major high-congestion bottleneck segments")
                
            # Distance comparison
            dist_diff = sel_m["distance_km"] - alt_m["distance_km"]
            if dist_diff > 1.5:
                trade_offs.append(f"{round(dist_diff, 1)} km longer than {runner_up['name']}, but avoids congestion & delay")
            elif dist_diff < -1.5:
                why_selected.append(f"Shorter total distance by {round(abs(dist_diff), 1)} km")

        # Mode specific explanations
        if mode == "FASTEST":
            why_selected.insert(0, f"Provides absolute minimum travel time ({sel_m['travel_time_min']} mins)")
        elif mode == "CHEAPEST":
            why_selected.insert(0, f"Provides lowest total toll & fuel cost (₹{sel_m['cost_inr']})")
        elif mode == "SAFEST":
            why_selected.insert(0, f"Prioritizes low-hazard corridors with {sel_m['risk_level']} risk level")
        elif mode == "EMERGENCY":
            why_selected.insert(0, "EMERGENCY OVERRIDE: Fast-track corridor bypassing traffic bottlenecks and unsafe segments")
        elif mode == "ECO":
            why_selected.insert(0, f"Lowest carbon footprint ({sel_m['co2_emissions_kg']} kg CO2) and fuel usage ({sel_m['fuel_consumption_liters']} L)")
        else: # BALANCED
            why_selected.insert(0, "Delivers optimal multi-objective balance between time, cost, distance and safety")

        if not trade_offs:
            trade_offs.append("No significant negative trade-offs identified for this journey profile")

        summary = f"{selected_route['name']} was selected for {mode} mode with an overall route composite score of {sel_m['composite_score']:.2f}."

        return {
            "selected_route_id": selected_route["route_id"],
            "selected_route_name": selected_route["name"],
            "why_selected": why_selected,
            "trade_offs": trade_offs,
            "comparative_advantages": comparative_advantages,
            "summary": summary
        }
