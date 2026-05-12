import yfinance as yf
from datetime import date, timedelta


def get_stock_data(ticker: str):
    start = "2010-01-01"
    end = (date.today() - timedelta(days=1)).strftime("%Y-%m-%d")

    df = yf.download(ticker, start=start, end=end)

    if df.empty:
        return None

    return df