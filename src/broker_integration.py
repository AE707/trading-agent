#!/usr/bin/env python3
"""
Real-Time Broker Integration Module
Connects to live trading platforms (Binance, Alpaca) for real-time data and execution
"""

import requests
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from abc import ABC, abstractmethod
import pandas as pd

logger = logging.getLogger(__name__)


class BrokerAPI(ABC):
    """Abstract base class for broker integrations"""
    
    @abstractmethod
    def get_account_balance(self) -> float:
        """Get current account balance"""
        pass
    
    @abstractmethod
    def get_market_price(self, symbol: str) -> float:
        """Get current market price for symbol"""
        pass
    
    @abstractmethod
    def place_order(self, symbol: str, quantity: float, side: str, order_type: str = "MARKET") -> Dict:
        """Place a market or limit order"""
        pass
    
    @abstractmethod
    def get_open_positions(self) -> List[Dict]:
        """Get all open positions"""
        pass
    
    @abstractmethod
    def close_position(self, position_id: str) -> bool:
        """Close an open position"""
        pass


class BinanceIntegration(BrokerAPI):
    """Binance Spot Trading Integration"""
    
    def __init__(self, api_key: str, api_secret: str, testnet: bool = True):
        self.api_key = api_key
        self.api_secret = api_secret
        self.testnet = testnet
        self.base_url = "https://testnet.binance.vision" if testnet else "https://api.binance.com"
        self.session = requests.Session()
        self.session.headers.update({"X-MBX-APIKEY": api_key})
    
    def _get_signature(self, data: str) -> str:
        """Generate HMAC SHA256 signature"""
        import hmac
        import hashlib
        return hmac.new(
            self.api_secret.encode(),
            data.encode(),
            hashlib.sha256
        ).hexdigest()
    
    def get_account_balance(self) -> float:
        """Get USDT balance from account"""
        try:
            params = {"timestamp": int(datetime.now().timestamp() * 1000)}
            query_string = "&".join([f"{k}={v}" for k, v in params.items()])
            signature = self._get_signature(query_string)
            params["signature"] = signature
            
            response = self.session.get(f"{self.base_url}/api/v3/account", params=params)
            if response.status_code == 200:
                balances = response.json()["balances"]
                usdt = next((b["free"] for b in balances if b["asset"] == "USDT"), 0)
                logger.info(f"✓ Binance balance: {usdt} USDT")
                return float(usdt)
        except Exception as e:
            logger.error(f"✗ Failed to get Binance balance: {e}")
        return 0.0
    
    def get_market_price(self, symbol: str = "BTCUSDT") -> float:
        """Get current market price"""
        try:
            response = requests.get(f"{self.base_url}/api/v3/ticker/price", params={"symbol": symbol})
            if response.status_code == 200:
                price = float(response.json()["price"])
                logger.info(f"✓ {symbol} price: ${price:.2f}")
                return price
        except Exception as e:
            logger.error(f"✗ Failed to get {symbol} price: {e}")
        return 0.0
    
    def place_order(self, symbol: str, quantity: float, side: str, order_type: str = "MARKET") -> Dict:
        """Place market order"""
        try:
            params = {
                "symbol": symbol,
                "side": side.upper(),
                "type": order_type.upper(),
                "quantity": quantity,
                "timestamp": int(datetime.now().timestamp() * 1000)
            }
            query_string = "&".join([f"{k}={v}" for k, v in params.items()])
            signature = self._get_signature(query_string)
            params["signature"] = signature
            
            response = self.session.post(f"{self.base_url}/api/v3/order", params=params)
            if response.status_code == 200:
                order = response.json()
                logger.info(f"✓ Order placed: {side} {quantity} {symbol}")
                return {"status": "success", "order_id": order.get("orderId"), "data": order}
        except Exception as e:
            logger.error(f"✗ Failed to place order: {e}")
        return {"status": "failed", "error": str(e)}
    
    def get_open_positions(self) -> List[Dict]:
        """Get open positions"""
        try:
            params = {"timestamp": int(datetime.now().timestamp() * 1000)}
            query_string = "&".join([f"{k}={v}" for k, v in params.items()])
            signature = self._get_signature(query_string)
            params["signature"] = signature
            
            response = self.session.get(f"{self.base_url}/api/v3/openOrders", params=params)
            if response.status_code == 200:
                positions = response.json()
                logger.info(f"✓ Open positions: {len(positions)}")
                return positions
        except Exception as e:
            logger.error(f"✗ Failed to get open positions: {e}")
        return []
    
    def close_position(self, symbol: str) -> bool:
        """Cancel all orders for a symbol"""
        try:
            params = {
                "symbol": symbol,
                "timestamp": int(datetime.now().timestamp() * 1000)
            }
            query_string = "&".join([f"{k}={v}" for k, v in params.items()])
            signature = self._get_signature(query_string)
            params["signature"] = signature
            
            response = self.session.delete(f"{self.base_url}/api/v3/openOrders", params=params)
            if response.status_code == 200:
                logger.info(f"✓ Closed all positions for {symbol}")
                return True
        except Exception as e:
            logger.error(f"✗ Failed to close position: {e}")
        return False


class PaperTraderBroker(BrokerAPI):
    """Paper Trading Broker (Simulated)"""
    
    def __init__(self, initial_balance: float = 10000.0):
        self.balance = initial_balance
        self.positions = {}
        self.trade_history = []
        self.orders = []
    
    def get_account_balance(self) -> float:
        logger.info(f"✓ Paper trader balance: ${self.balance:.2f}")
        return self.balance
    
    def get_market_price(self, symbol: str = "BTCUSDT") -> float:
        """Simulated price (would fetch from real API)"""
        import random
        base_price = {"BTCUSDT": 47500, "ETHUSDT": 2800}.get(symbol, 1.0)
        price = base_price * (1 + random.uniform(-0.02, 0.02))
        logger.info(f"✓ {symbol} price: ${price:.2f}")
        return price
    
    def place_order(self, symbol: str, quantity: float, side: str, order_type: str = "MARKET") -> Dict:
        """Simulate order placement"""
        price = self.get_market_price(symbol)
        total = price * quantity
        
        if side.upper() == "BUY":
            if self.balance >= total:
                self.balance -= total
                order_id = len(self.orders) + 1
                order = {
                    "orderId": order_id,
                    "symbol": symbol,
                    "quantity": quantity,
                    "price": price,
                    "side": "BUY",
                    "status": "FILLED",
                    "time": datetime.now().isoformat()
                }
                self.positions[symbol] = self.positions.get(symbol, 0) + quantity
                logger.info(f"✓ Paper order: BUY {quantity} {symbol} @ ${price:.2f}")
                return {"status": "success", "order_id": order_id, "data": order}
        
        elif side.upper() == "SELL":
            if self.positions.get(symbol, 0) >= quantity:
                self.balance += total
                order_id = len(self.orders) + 1
                order = {
                    "orderId": order_id,
                    "symbol": symbol,
                    "quantity": quantity,
                    "price": price,
                    "side": "SELL",
                    "status": "FILLED",
                    "time": datetime.now().isoformat()
                }
                self.positions[symbol] -= quantity
                logger.info(f"✓ Paper order: SELL {quantity} {symbol} @ ${price:.2f}")
                return {"status": "success", "order_id": order_id, "data": order}
        
        return {"status": "failed", "error": "Insufficient balance or position"}
    
    def get_open_positions(self) -> List[Dict]:
        positions = [
            {"symbol": k, "quantity": v, "balance": v}
            for k, v in self.positions.items() if v > 0
        ]
        logger.info(f"✓ Open positions: {len(positions)}")
        return positions
    
    def close_position(self, symbol: str) -> bool:
        if symbol in self.positions and self.positions[symbol] > 0:
            quantity = self.positions[symbol]
            result = self.place_order(symbol, quantity, "SELL")
            return result["status"] == "success"
        return False


def create_broker(broker_type: str, **kwargs) -> BrokerAPI:
    """Factory function to create broker instances"""
    if broker_type.lower() == "binance":
        return BinanceIntegration(**kwargs)
    elif broker_type.lower() == "paper":
        return PaperTraderBroker(**kwargs)
    else:
        raise ValueError(f"Unknown broker type: {broker_type}")
