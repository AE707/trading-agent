import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
from src.rules import SMARulesEngine
from src.models import TradeScorer
from src.broker import PaperBroker
from src.backtester import EventDrivenBacktester
from src.reporting import PerformanceReporter

st.set_page_config(
    page_title="Trading Agent Dashboard",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.title("🤖 Automated Trading Agent Backtester")
st.markdown("---")

# Sidebar Configuration
with st.sidebar:
    st.header("⚙️ Configuration")
    
    col1, col2 = st.columns(2)
    with col1:
        initial_cash = st.number_input(
            "Initial Capital ($)",
            min_value=1000,
            max_value=100000,
            value=10000,
            step=1000
        )
    
    with col2:
        symbol = st.text_input("Trading Symbol", "BTCUSDT")
    
    st.divider()
    
    col1, col2 = st.columns(2)
    with col1:
        sma_short = st.slider("SMA Short Period", 5, 30, 20)
    with col2:
        sma_long = st.slider("SMA Long Period", 30, 100, 50)
    
    st.divider()
    confidence_threshold = st.slider(
        "Confidence Threshold",
        0.0, 1.0, 0.7, 0.05
    )

# Load and Display Data
st.subheader("📊 Market Data Preview")
try:
    data = pd.read_csv('data/market_data.csv')
    st.dataframe(data.head(10), use_container_width=True)
    
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Current Price", f"${data['close'].iloc[-1]:.2f}")
    with col2:
        st.metric("Price Change", f"{((data['close'].iloc[-1] / data['close'].iloc[0] - 1) * 100):.2f}%")
    with col3:
        st.metric("Days", len(data))
    with col4:
        st.metric("Volume", f"{data['volume'].iloc[-1]:,.0f}")
except FileNotFoundError:
    st.error("❌ Market data file not found. Please ensure data/market_data.csv exists.")
    st.stop()

st.divider()

# Backtesting Section
st.subheader("🚀 Run Backtest")

if st.button("▶️ Execute Backtest", use_container_width=True, key="run_backtest"):
    with st.spinner("Running backtest..."):
        try:
            # Initialize components
            rules_engine = SMARulesEngine(sma_short, sma_long)
            model = TradeScorer()
            broker = PaperBroker(initial_cash)
            
            # Run backtest
            backtester = EventDrivenBacktester(
                data,
                broker,
                rules_engine,
                model
            )
            backtester.run()
            results = backtester.get_results()
            
            # Store in session state for display
            st.session_state.backtest_results = results
            st.session_state.broker = broker
            st.session_state.data = data
            st.session_state.completed = True
            
            st.success("✅ Backtest completed successfully!")
        except Exception as e:
            st.error(f"❌ Error during backtest: {str(e)}")

st.divider()

# Display Results
if "completed" in st.session_state and st.session_state.completed:
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.info(f"📈 Final Cash: ${st.session_state.broker.cash:.2f}")
    with col2:
        st.info(f"📊 Total Trades: {len(st.session_state.broker.trades)}")
    with col3:
        st.info(f"💼 Position: {st.session_state.broker.position}")
    
    st.divider()
    st.subheader("📉 Price Chart & Signals")
    
    # Create interactive chart
    fig = go.Figure()
    
    # Add price line
    fig.add_trace(go.Scatter(
        x=st.session_state.data.index,
        y=st.session_state.data['close'],
        mode='lines',
        name='Price',
        line=dict(color='blue', width=2)
    ))
    
    # Add trade markers
    if len(st.session_state.backtest_results) > 0:
        fig.add_trace(go.Scatter(
            x=st.session_state.backtest_results['date'],
            y=st.session_state.backtest_results['price'],
            mode='markers',
            name='Trades',
            marker=dict(size=10, color='red')
        ))
    
    fig.update_layout(
        title="Price Action & Trading Signals",
        xaxis_title="Date/Period",
        yaxis_title="Price ($)",
        hovermode='x unified',
        height=400
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Performance Metrics
    st.subheader("📈 Performance Metrics")
    
    col1, col2, col3, col4 = st.columns(4)
    
    initial = initial_cash
    final = st.session_state.broker.cash
    pnl = final - initial
    roi = (pnl / initial) * 100 if initial != 0 else 0
    
    with col1:
        st.metric("P&L ($)", f"${pnl:.2f}", f"{roi:.2f}%")
    with col2:
        st.metric("ROI (%)", f"{roi:.2f}%")
    with col3:
        st.metric("Win Rate", "N/A")  # Calculate if needed
    with col4:
        st.metric("Sharpe Ratio", "N/A")  # Calculate if needed
    
    # Trade History
    st.subheader("📋 Trade History")
    if len(st.session_state.broker.trades) > 0:
        trades_df = pd.DataFrame(st.session_state.broker.trades)
        st.dataframe(trades_df, use_container_width=True)
    else:
        st.warning("⚠️ No trades executed during backtest")
    
    # Backtest Results Table
    st.subheader("📊 Backtest Results")
    st.dataframe(
        st.session_state.backtest_results,
        use_container_width=True
    )
    
    # Export Results
    st.divider()
    st.subheader("💾 Export Results")
    
    csv = st.session_state.backtest_results.to_csv(index=False)
    st.download_button(
        label="📥 Download CSV",
        data=csv,
        file_name="backtest_results.csv",
        mime="text/csv"
    )
else:
    st.info("👈 Configure parameters and click 'Execute Backtest' to begin")

# Footer
st.divider()
st.markdown("""
<div style='text-align: center; color: gray; font-size: 12px;'>
    Trading Agent v0.1.0 | Automated Three-Stage Trading Pipeline
</div>
""", unsafe_allow_html=True)
