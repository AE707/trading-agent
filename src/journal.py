import sqlite3
from datetime import datetime

class TradeJournal:
    """Database logging for trades and events."""
    
    def __init__(self, db_path):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path)
        self.init_schema()
    
    def init_schema(self):
        """Initialize database tables."""
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS trades (
                id INTEGER PRIMARY KEY,
                timestamp TEXT,
                action TEXT,
                quantity REAL,
                price REAL,
                pnl REAL
            )
        ''')
        self.conn.commit()
    
    def log_trade(self, action, quantity, price):
        """Record trade to database."""
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO trades (timestamp, action, quantity, price)
            VALUES (?, ?, ?, ?)
        ''', (datetime.now().isoformat(), action, quantity, price))
        self.conn.commit()
