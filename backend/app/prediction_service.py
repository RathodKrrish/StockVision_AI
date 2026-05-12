import numpy as np
import pandas as pd
from datetime import timedelta


def forecast_next_days(df, column_name, model, scaler, days=30):
    full_data = df[[column_name]]
    scaled_data = scaler.transform(full_data)

    last_100 = scaled_data[-100:]
    x_input = last_100.reshape(1, 100, 1)

    future_values = []

    for _ in range(days):
        pred = model.predict(x_input, verbose=0)
        future_values.append(pred[0][0])

        x_input = x_input.reshape(100, 1)
        x_input = np.vstack((x_input[1:], pred))
        x_input = x_input.reshape(1, 100, 1)

    future_values = scaler.inverse_transform(
        np.array(future_values).reshape(-1, 1)
    )

    return future_values.flatten()


def make_forecast(df, models, scalers, days=30):
    future_dates = pd.bdate_range(
        start=df.index[-1] + timedelta(days=1),
        periods=days
    )

    future_open = forecast_next_days(df, "Open", models["Open"], scalers["Open"], days)
    future_close = forecast_next_days(df, "Close", models["Close"], scalers["Close"], days)
    future_high = forecast_next_days(df, "High", models["High"], scalers["High"], days)
    future_low = forecast_next_days(df, "Low", models["Low"], scalers["Low"], days)

    # Financial consistency fix
    future_high = np.maximum.reduce([
        future_high,
        future_open,
        future_close
    ])

    future_low = np.minimum.reduce([
        future_low,
        future_open,
        future_close
    ])

    result = []

    for i in range(days):
        result.append({
            "date": str(future_dates[i].date()),
            "predicted_open": round(float(future_open[i]), 4),
            "predicted_high": round(float(future_high[i]), 4),
            "predicted_low": round(float(future_low[i]), 4),
            "predicted_close": round(float(future_close[i]), 4)
        })

    return result