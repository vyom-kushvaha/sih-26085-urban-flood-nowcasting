def calculate_hybrid_risk(physics_risk, ml_risk=None, physics_weight=0.7, ml_weight=0.3):
    """
    Combine the existing physics-based flood risk with ML prediction.

    If ML prediction is unavailable, the physics score is used directly.
    """

    physics_risk = max(0.0, min(100.0, float(physics_risk)))

    if ml_risk is None:
        return round(physics_risk, 1)

    ml_risk = max(0.0, min(100.0, float(ml_risk)))

    total_weight = physics_weight + ml_weight

    if total_weight <= 0:
        return round(physics_risk, 1)

    hybrid_score = (
        physics_risk * physics_weight +
        ml_risk * ml_weight
    ) / total_weight

    return round(max(0.0, min(100.0, hybrid_score)), 1)
