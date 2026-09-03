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
        if not self.is_trained:
            return None

        prediction = self.model.predict(features)
        return float(np.clip(prediction[0], 0, 100))
