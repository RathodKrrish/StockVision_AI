import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_DIR = os.path.join(BASE_DIR, "model_h5_files")
SCALER_DIR = os.path.join(BASE_DIR, "Scaler_files")

MODEL_FILES = {
    "Open": os.path.join(MODEL_DIR, "Opnkeras_model.h5"),
    "Close": os.path.join(MODEL_DIR, "keras_modell.h5"),
    "High": os.path.join(MODEL_DIR, "High_keras_modell.h5"),
    "Low": os.path.join(MODEL_DIR, "Low_keras_model.h5")
}

SCALER_FILES = {
    "Open": os.path.join(SCALER_DIR, "scaler.pkl"),
    "Close": os.path.join(SCALER_DIR, "scaler.pkl"),
    "High": os.path.join(SCALER_DIR, "scaler1.pkl"),
    "Low": os.path.join(SCALER_DIR, "scaler1.pkl")
}