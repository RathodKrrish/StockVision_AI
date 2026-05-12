from tensorflow import keras
import joblib
from tensorflow.keras.layers import Dense

from app.config import MODEL_FILES, SCALER_FILES


def custom_dense(**kwargs):
    kwargs.pop("quantization_config", None)
    return Dense(**kwargs)


def load_models_and_scalers():
    models = {}
    scalers = {}

    for col in ["Open", "Close", "High", "Low"]:

        print(f"Loading model for {col} from {MODEL_FILES[col]}...")

        models[col] = keras.models.load_model(
            MODEL_FILES[col],
            custom_objects={"Dense": custom_dense},
            compile=False
        )

        print(f"Loading scaler for {col} from {SCALER_FILES[col]}...")

        scalers[col] = joblib.load(SCALER_FILES[col])

    return models, scalers