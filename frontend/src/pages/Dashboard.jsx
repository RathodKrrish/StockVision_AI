import "../styles/dashboard.css";
// import React, { useState } from "react";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from "recharts";

// function Dashboard() {
//     const [ticker, setTicker] = useState("");
//     const [forecastDays, setForecastDays] = useState(30);

//     const [loading, setLoading] = useState(false);

//     const [forecastData, setForecastData] = useState([]);

//     const startDate = "2010-01-01";

//     // SAFE NUMBER
//     const getNum = (value) => {
//         const num = Number(value);

//         return Number.isFinite(num) ? num : null;
//     };

//     // GENERATE FORECAST
//     const generateForecast = async () => {
//         if (!ticker.trim()) {
//             alert("Please enter stock ticker");
//             return;
//         }

//         setLoading(true);

//         setForecastData([]);

//         try {
//             const response = await fetch("http://127.0.0.1:8000/predict", {
//                 method: "POST",

//                 headers: {
//                     "Content-Type": "application/json",
//                 },

//                 body: JSON.stringify({
//                     ticker: ticker.toUpperCase(),
//                     start_date: startDate,
//                     days: Number(forecastDays),
//                 }),
//             });

//             let result = {};

//             try {
//                 result = await response.json();
//             } catch {
//                 result = {};
//             }

//             console.log("API RESULT:", result);

//             if (!response.ok) {
//                 throw new Error(
//                     result.error ||
//                     result.message ||
//                     "Backend prediction failed"
//                 );
//             }

//             // FORECAST DATA
//             const forecast =
//                 result.forecast_data ||
//                 result.future_forecast ||
//                 result.forecast ||
//                 [];

//             // CLEAN FORECAST
//             const cleanForecast = forecast.map((row) => ({
//                 Date: row.Date || row.date,

//                 Open: getNum(
//                     row.Open ??
//                     row.open ??
//                     row.predicted_open
//                 ),

//                 High: getNum(
//                     row.High ??
//                     row.high ??
//                     row.predicted_high
//                 ),

//                 Low: getNum(
//                     row.Low ??
//                     row.low ??
//                     row.predicted_low
//                 ),

//                 Close: getNum(
//                     row.Close ??
//                     row.close ??
//                     row.predicted_close
//                 ),
//             }));

//             setForecastData(cleanForecast);
//         } catch (error) {
//             console.error("FULL ERROR:", error);

//             alert(error.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="dashboard">
//             <h1>Stock Price Prediction Dashboard</h1>
//             <br></br>
//             <p>Future forecast are based on the trained machine learning model by Krish</p>
//             <br></br>
//             <p>Dont Take it as Serious. This is just for educational purposes, this model predict the values just by analysing historical data of the stock.</p>
//             <br></br>

//             {/* INPUTS */}

//             <div className="input-section">
//                 <input
//                     type="text"
//                     placeholder="Enter ticker (AAPL)"
//                     value={ticker}
//                     disabled={loading}
//                     onChange={(e) => setTicker(e.target.value)}
//                 />

//                 <input
//                     type="number"
//                     min="1"
//                     max="365"
//                     value={forecastDays}
//                     disabled={loading}
//                     onChange={(e) => setForecastDays(e.target.value)}
//                 />

//                 <button onClick={generateForecast} disabled={loading}>
//                     {loading ? "Generating..." : "Generate Forecast"}
//                 </button>
//             </div>

//             {/* FORECAST SECTION */}

//             {forecastData.length > 0 && (
//                 <>
//                     <h2>Future Forecast</h2>

//                     <div className="chart-card main-chart">
//                         <h3>Next {forecastDays} Days Forecast</h3>

//                         <ResponsiveContainer width="100%" height={450}>
//                             <LineChart data={forecastData}>
//                                 <CartesianGrid strokeDasharray="3 3" />

//                                 <XAxis dataKey="Date" />

//                                 {/* FIXED Y AXIS */}

//                                 <YAxis
//                                     domain={[
//                                         (dataMin) => Math.floor(dataMin - 5),
//                                         (dataMax) => Math.ceil(dataMax + 5),
//                                     ]}
//                                 />

//                                 <Tooltip />

//                                 <Legend />

//                                 {/* OPEN */}

//                                 <Line
//                                     type="monotone"
//                                     dataKey="Open"
//                                     name="Forecast Open"
//                                     stroke="#2563eb"
//                                     strokeWidth={3}
//                                     dot={false}
//                                     connectNulls
//                                 />

//                                 {/* HIGH */}

//                                 <Line
//                                     type="monotone"
//                                     dataKey="High"
//                                     name="Forecast High"
//                                     stroke="#16a34a"
//                                     strokeWidth={3}
//                                     dot={false}
//                                     connectNulls
//                                 />

//                                 {/* LOW */}

//                                 <Line
//                                     type="monotone"
//                                     dataKey="Low"
//                                     name="Forecast Low"
//                                     stroke="#dc2626"
//                                     strokeWidth={3}
//                                     dot={false}
//                                     connectNulls
//                                 />

//                                 {/* CLOSE */}

//                                 <Line
//                                     type="monotone"
//                                     dataKey="Close"
//                                     name="Forecast Close"
//                                     stroke="#eab308"
//                                     strokeWidth={3}
//                                     dot={false}
//                                     connectNulls
//                                 />
//                             </LineChart>
//                         </ResponsiveContainer>
//                     </div>

//                     {/* TABLE */}

//                     <div className="table-section">
//                         <h2>Forecast Data Table</h2>

//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Date</th>

//                                     <th>Open</th>

//                                     <th>High</th>

//                                     <th>Low</th>

//                                     <th>Close</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {forecastData.map((row, index) => (
//                                     <tr key={index}>
//                                         <td>{row.Date}</td>

//                                         <td>{row.Open?.toFixed(2)}</td>

//                                         <td>{row.High?.toFixed(2)}</td>

//                                         <td>{row.Low?.toFixed(2)}</td>

//                                         <td>{row.Close?.toFixed(2)}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default Dashboard;

import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import "../styles/Dashboard.css";

function Dashboard() {
    const [ticker, setTicker] = useState("");
    const [forecastDays, setForecastDays] = useState(30);
    const [loading, setLoading] = useState(false);
    const [forecastData, setForecastData] = useState([]);

    const startDate = "2010-01-01";

    // MOBILE CHECK
    const isMobile = window.innerWidth <= 480;

    // SAFE NUMBER
    const getNum = (value) => {
        const num = Number(value);
        return Number.isFinite(num) ? num : null;
    };

    // GENERATE FORECAST
    const generateForecast = async () => {
        if (!ticker.trim()) {
            alert("Please enter stock ticker");
            return;
        }

        setLoading(true);

        setForecastData([]);

        try {
            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    ticker: ticker.toUpperCase(),
                    start_date: startDate,
                    days: Number(forecastDays),
                }),
            });

            let result = {};

            try {
                result = await response.json();
            } catch {
                result = {};
            }

            console.log("API RESULT:", result);

            if (!response.ok) {
                throw new Error(
                    result.error ||
                    result.message ||
                    "Backend prediction failed"
                );
            }

            // FORECAST DATA
            const forecast =
                result.forecast_data ||
                result.future_forecast ||
                result.forecast ||
                [];

            // CLEAN FORECAST
            const cleanForecast = forecast.map((row) => ({
                Date: row.Date || row.date,

                Open: getNum(
                    row.Open ??
                    row.open ??
                    row.predicted_open
                ),

                High: getNum(
                    row.High ??
                    row.high ??
                    row.predicted_high
                ),

                Low: getNum(
                    row.Low ??
                    row.low ??
                    row.predicted_low
                ),

                Close: getNum(
                    row.Close ??
                    row.close ??
                    row.predicted_close
                ),
            }));

            setForecastData(cleanForecast);
        } catch (error) {
            console.error("FULL ERROR:", error);

            alert(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">

            {/* TITLE */}

            <h1>Stock Price Prediction Dashboard</h1>

            {/* PROJECT NOTE */}

            <p className="project-note">
                This is just an educational AI project and not real financial advice.
                The model does not understand real-world situations or news; it only
                predicts based on historical stock market data patterns.
            </p>

            {/* INPUTS */}

            <div className="input-section">

                <input
                    type="text"
                    placeholder="Enter ticker (AAPL)"
                    value={ticker}
                    disabled={loading}
                    onChange={(e) => setTicker(e.target.value)}
                />

                <input
                    type="number"
                    min="1"
                    max="365"
                    value={forecastDays}
                    disabled={loading}
                    onChange={(e) => setForecastDays(e.target.value)}
                />

                <button onClick={generateForecast} disabled={loading}>
                    {loading ? "Generating..." : "Generate Forecast"}
                </button>

            </div>

            {/* FORECAST SECTION */}

            {forecastData.length > 0 && (
                <>
                    <h2>Future Forecast</h2>

                    <div className="chart-card main-chart">

                        <h3>Next {forecastDays} Days Forecast</h3>

                        <ResponsiveContainer
                            width="100%"
                            height={isMobile ? 280 : 450}
                        >

                            <LineChart data={forecastData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis
                                    dataKey="Date"
                                    tick={{ fontSize: isMobile ? 8 : 12 }}
                                />

                                <YAxis
                                    tick={{ fontSize: isMobile ? 8 : 12 }}
                                    domain={[
                                        (dataMin) => Math.floor(dataMin - 5),
                                        (dataMax) => Math.ceil(dataMax + 5),
                                    ]}
                                />

                                <Tooltip />

                                <Legend
                                    wrapperStyle={{
                                        fontSize: isMobile ? "9px" : "14px",
                                    }}
                                />

                                {/* OPEN */}

                                <Line
                                    type="monotone"
                                    dataKey="Open"
                                    name="Forecast Open"
                                    stroke="#2563eb"
                                    strokeWidth={isMobile ? 2 : 3}
                                    dot={false}
                                    connectNulls
                                />

                                {/* HIGH */}

                                <Line
                                    type="monotone"
                                    dataKey="High"
                                    name="Forecast High"
                                    stroke="#16a34a"
                                    strokeWidth={isMobile ? 2 : 3}
                                    dot={false}
                                    connectNulls
                                />

                                {/* LOW */}

                                <Line
                                    type="monotone"
                                    dataKey="Low"
                                    name="Forecast Low"
                                    stroke="#dc2626"
                                    strokeWidth={isMobile ? 2 : 3}
                                    dot={false}
                                    connectNulls
                                />

                                {/* CLOSE */}

                                <Line
                                    type="monotone"
                                    dataKey="Close"
                                    name="Forecast Close"
                                    stroke="#eab308"
                                    strokeWidth={isMobile ? 2 : 3}
                                    dot={false}
                                    connectNulls
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                    {/* TABLE */}

                    <div className="table-section">

                        <h2>Forecast Data Table</h2>

                        <div className="table-wrapper">

                            <table>

                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Open</th>
                                        <th>High</th>
                                        <th>Low</th>
                                        <th>Close</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {forecastData.map((row, index) => (
                                        <tr key={index}>

                                            <td>{row.Date}</td>

                                            <td>{row.Open?.toFixed(2)}</td>

                                            <td>{row.High?.toFixed(2)}</td>

                                            <td>{row.Low?.toFixed(2)}</td>

                                            <td>{row.Close?.toFixed(2)}</td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;