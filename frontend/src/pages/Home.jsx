import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    BarChart3,
    BrainCircuit,
    TrendingUp,
    ShieldCheck,
} from "lucide-react";

import "../styles/Home.css";

function Home() {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="home">

            {/* NAVBAR */}

            <nav className="navbar">

                <div className="logo">
                    StockVision AI
                </div>

                <div className="nav-links">
                    <a href="#badge_card">Home</a>
                    <a href="#features__cards">Features</a>
                    <a href="#about__card">About</a>
                    <a href="/dashboard">Dashboard</a>
                </div>

            </nav>

            {/* HERO */}

            <section className="hero">

                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="hero-content"
                >

                    <div id="badge_card" className="badge">
                        AI Powered Financial Forecasting
                    </div>

                    <h1>
                        Stock Price & Trend Prediction
                    </h1>

                    <p>
                        Forecast future market movement using Deep Learning,
                        FastAPI and real-time stock analytics.
                    </p>

                    <button onClick={goToDashboard}>
                        Launch Dashboard
                    </button>

                </motion.div>

            </section>

            {/* FEATURES */}

            <section className="features">

                <div id="features__cards" className="section-title">
                    <h2>Powerful AI Features</h2>
                    <p>
                        Professional-grade market analytics powered by deep learning.
                    </p>
                </div>

                <div className="feature-grid">

                    <div className="feature-card">
                        <BarChart3 size={40} />
                        <h3>OHLC Forecasting</h3>
                        <p>
                            Predict Open, High, Low and Close stock prices.
                        </p>
                    </div>

                    <div className="feature-card">
                        <BrainCircuit size={40} />
                        <h3>LSTM Deep Learning</h3>
                        <p>
                            Advanced TensorFlow neural network prediction models.
                        </p>
                    </div>

                    <div className="feature-card">
                        <TrendingUp size={40} />
                        <h3>Trend Analysis</h3>
                        <p>
                            Detect bullish and bearish market movement patterns.
                        </p>
                    </div>

                    <div className="feature-card">
                        <ShieldCheck size={40} />
                        <h3>Production Backend</h3>
                        <p>
                            FastAPI backend with scalable AI architecture.
                        </p>
                    </div>

                </div>

            </section>

            {/* ABOUT */}

            <section className="about">

                <div id="about__card" className="about-card">

                    <h2>About This Project</h2>

                    <p>
                        This platform combines Deep Learning, FastAPI and React
                        to create a modern AI-powered financial forecasting system.
                        The project predicts future stock trends using historical
                        market data and TensorFlow LSTM models.
                    </p>

                </div>

            </section>

            {/* FOOTER */}

            <footer>

                <p>
                    © 2026 Krish Rathod. All Rights Reserved.
                </p>

            </footer>

        </div>
    );
}

export default Home;