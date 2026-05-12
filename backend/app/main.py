from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import PredictionRequest
from app.model_loader import load_models_and_scalers
from app.data_service import get_stock_data
from app.prediction_service import make_forecast


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="AI Stock Price Prediction API",
    description="Deep Learning based OHLC stock forecasting system",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# LOAD MODELS & SCALERS
# =========================================================

models, scalers = load_models_and_scalers()


# =========================================================
# HOME ROUTE
# =========================================================

@app.get("/")
def home():
    return {
        "message": "AI Stock Price Prediction API Running Successfully",
        "developer": "Krish Rathod"
    }


# =========================================================
# PREDICTION ROUTE
# =========================================================

@app.post("/predict")
def predict_stock(request: PredictionRequest):

    # Download stock data
    df = get_stock_data(request.ticker)

    # Validation
    if df is None:
        raise HTTPException(
            status_code=404,
            detail="Invalid ticker or no stock data found"
        )

    # Forecast generation
    forecast = make_forecast(
        df=df,
        models=models,
        scalers=scalers,
        days=request.days
    )

    return {
        "ticker": request.ticker.upper(),
        "days": request.days,
        "forecast": forecast,
        "developer": "Krish Rathod"
    }