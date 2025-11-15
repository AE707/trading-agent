# Binance Testnet Setup Guide - Free Demo Trading

## 📱 What is Binance Testnet?

Binance Testnet is a **100% FREE** simulated trading environment where you can:
- Trade BTCUSDT with virtual funds
- Test trading strategies without risk
- Integrate real API code
- Practice before using real money

**Perfect for testing your trading agent!**

---

## 🚀 QUICK START (5 minutes)

### Step 1: Access Binance Testnet
1. Go to: https://testnet.binance.vision
2. Click "[Log In with GitHub]"
3. If you don't have GitHub, click "[Create an account]" and sign up (2 minutes)

### Step 2: GitHub OAuth Authorization
1. Log in with your GitHub credentials
2. Click "[Authorize binance-exchange]" to allow testnet access
3. You'll be redirected back to Binance testnet

### Step 3: Generate API Keys
1. On the Binance Testnet page, copy your:
   - **Spot API Key**
   - **Spot Secret Key**
2. Save these somewhere safe (we'll use them in the agent)

### Step 4: Get Free Test Funds
1. In the testnet interface, look for "**Faucet**" button
2. Click to receive free testnet BTC/USDT
3. You'll get virtual funds instantly

---

## 💻 Configure Your Agent

### Update broker_integration.py

Modify the BinanceIntegration class to use testnet:

```python
from src.broker_integration import BinanceIntegration

# Create testnet connection (NOT REAL MONEY)
broker = BinanceIntegration(
    api_key="YOUR_TESTNET_API_KEY",      # From Step 3
    api_secret="YOUR_TESTNET_SECRET_KEY", # From Step 3
    testnet=True  # ← THIS IS CRITICAL: testnet=True
)

# Now you can test:
balance = broker.get_account_balance()           # Get testnet USDT
price = broker.get_market_price("BTCUSDT")      # Get live price
broker.place_order("BTCUSDT", 0.001, "BUY")    # Place TEST order
```

### Create testnet_agent.py

```python
#!/usr/bin/env python3
"""
Live Testnet Agent - Tests agent on Binance Testnet
"""

from src.broker_integration import BinanceIntegration
from src.auto_learner import AutoLearner
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run_testnet_agent():
    # 1. Connect to Binance Testnet
    broker = BinanceIntegration(
        api_key="<YOUR_TESTNET_KEY>",
        api_secret="<YOUR_TESTNET_SECRET>",
        testnet=True  # Use testnet, not real Binance!
    )
    
    # 2. Check balance
    balance = broker.get_account_balance()
    logger.info(f"✓ Testnet Balance: {balance} USDT")
    
    # 3. Get market price
    price = broker.get_market_price("BTCUSDT")
    logger.info(f"✓ BTC Price: ${price}")
    
    # 4. Create ML learner
    learner = AutoLearner(models_dir="models")
    
    # 5. Test order placement
    order = broker.place_order("BTCUSDT", 0.001, "BUY", order_type="MARKET")
    logger.info(f"✓ Test Order Placed: {order}")
    
    # 6. Check open positions
    positions = broker.get_open_positions()
    logger.info(f"✓ Open Positions: {positions}")
    
    logger.info("\n✓ TESTNET AGENT RUN SUCCESSFUL!")
    return broker, learner

if __name__ == "__main__":
    run_testnet_agent()
```

---

## ⚙️ Testnet URLs Reference

**Use these URLs when configuring your agent:**

| Setting | Testnet URL | Live URL |
|---------|-------------|----------|
| **Base URL** | https://testnet.binance.vision | https://api.binance.com |
| **Spot API** | https://testnet.binance.vision/api/v3 | https://api.binance.com/api/v3 |
| **WebSocket** | wss://stream.testnet.binance.vision | wss://stream.binance.com |

**Your broker_integration.py already handles this!**
- When `testnet=True` → uses testnet.binance.vision
- When `testnet=False` → uses api.binance.com (REAL TRADING)

---

## 📊 What Can You Test on Testnet?

✅ **WORKS ON TESTNET:**
- GET account information (balance, positions)
- GET real-time market prices
- GET order history
- **PLACE test orders** (buy, sell, cancel)
- **MANAGE positions** (open, close)
- View open orders
- View trade history
- All API functions from BinanceIntegration class

❌ **NOT ON TESTNET:**
- Real money deposits/withdrawals
- Real trading (obviously)
- Some advanced features

---

## 🔍 Verify Your Agent is Working

### Checklist:

1. **Can connect to testnet?**
   ```
   ✓ Testnet Balance: 1000 USDT
   ```

2. **Can fetch prices?**
   ```
   ✓ BTC Price: $47500.00
   ```

3. **Can place orders?**
   ```
   ✓ Test Order Placed: {'orderId': 123, 'status': 'FILLED'}
   ```

4. **Can see positions?**
   ```
   ✓ Open Positions: [{'symbol': 'BTCUSDT', 'quantity': 0.001}]
   ```

If all 4 work → **Your agent is ready for testing!** ✅

---

## 📝 Step-by-Step Testing Workflow

### Phase 1: Basic Connection (5 min)
```python
# Just connect and check balance
broker = BinanceIntegration(api_key="...", api_secret="...", testnet=True)
print(broker.get_account_balance())
```

### Phase 2: Price Fetching (5 min)
```python
# Fetch real-time prices
for pair in ["BTCUSDT", "ETHUSDT"]:
    price = broker.get_market_price(pair)
    print(f"{pair}: ${price}")
```

### Phase 3: Test Orders (10 min)
```python
# Place small test BUY
order = broker.place_order("BTCUSDT", 0.001, "BUY")
print(f"Order status: {order['status']}")

# View position
positions = broker.get_open_positions()
print(f"Positions: {positions}")

# Place test SELL to close
order = broker.place_order("BTCUSDT", 0.001, "SELL")
print(f"Closed position: {order['status']}")
```

### Phase 4: ML Agent Integration (15 min)
```python
# Use your ML learner to generate signals
from src.auto_learner import AutoLearner

learner = AutoLearner()
df, signals = learner.prepare_features(market_data)

for signal in signals:
    if signal == "BUY":
        broker.place_order("BTCUSDT", 0.001, "BUY")
    elif signal == "SELL":
        broker.place_order("BTCUSDT", 0.001, "SELL")
```

---

## ⚠️ IMPORTANT REMINDERS

✅ **TESTNET BENEFITS:**
- 100% FREE
- No real money at risk
- Real Binance API experience
- Perfect for development
- Unlimited testing time

⚠️ **BEFORE GOING LIVE:**
- Change `testnet=True` → `testnet=False`
- Use REAL API keys from Binance.com (not testnet)
- Start with SMALL position sizes
- Test on multiple market conditions
- Monitor closely

---

## 🆘 Troubleshooting

**Q: "API Key Invalid Error"**
A: Make sure you're using **TESTNET** keys, not live Binance.com keys

**Q: "No balance on testnet"**
A: Click the "Faucet" button to get free test funds

**Q: "Order placement failed"**
A: Check:
   1. Sufficient balance (at least 10 USDT for 0.001 BTC)
   2. Valid symbol (use BTCUSDT exactly)
   3. testnet=True is set

**Q: "Connection timeout"**
A: Testnet may be under maintenance. Check status at: https://testnet.binance.vision

---

## 📚 Next Steps

1. **Set up testnet account** (5 min)
2. **Configure agent for testnet** (5 min)
3. **Run test trades** (10 min)
4. **Verify all features work** (10 min)
5. **Document results** (5 min)

**Total: ~35 minutes to fully test your agent!**

---

## 📞 Support Links

- Binance Testnet: https://testnet.binance.vision
- API Docs: https://binance-docs.github.io/apidocs/
- Testnet Faucet: https://testnet.binance.vision/faucet/btc
- GitHub: https://github.com/binance/binance-spot-api-docs

---

**Ready to test? Let's go! 🚀**
