import numpy as np


class FloodMLModel:
    """
    XGBoost-based flood risk prediction skeleton.

    The model can later be trained using historical rainfall,
    drainage, terrain, and flood observations.
    """

    def __init__(self):
        self.model = None
        self.is_trained = False

    def prepare_features(
        self,
        rainfall_mm_hr,
        water_depth_cm,
        slope_percent,
        drainage_capacity_mm_hr,
        blockage_pct,
    ):
        return np.array([[
            rainfall_mm_hr,
            water_depth_cm,
            slope_percent,
            drainage_capacity_mm_hr,
            blockage_pct,
        ]], dtype=float)

    def predict_risk(self, features):
        if not self.is_trained or self.model is None:
            return None

        prediction = self.model.predict(features)
        val = prediction[0] if hasattr(prediction, "__len__") else prediction
        return float(np.clip(val, 0.0, 100.0))


_global_ml_model = None


def get_ml_model() -> FloodMLModel:
    """Return singleton FloodMLModel instance to avoid re-initialization."""
    global _global_ml_model
    if _global_ml_model is None:
        _global_ml_model = FloodMLModel()
    return _global_ml_model

