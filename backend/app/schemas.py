from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    ticker: str = Field(..., example="AAPL")
    days: int = Field(default=30, ge=1, le=60)


class ForecastItem(BaseModel):
    date: str
    predicted_open: float
    predicted_high: float
    predicted_low: float
    predicted_close: float