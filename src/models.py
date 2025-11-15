from sklearn.linear_model import LogisticRegression
import numpy as np

class TradeScorer:
    """ML-based trade scoring model."""
    
    def __init__(self):
        self.model = LogisticRegression(random_state=42)
        self.is_fitted = False
    
    def train(self, X_train, y_train):
        """Train logistic regression model."""
        self.model.fit(X_train, y_train)
        self.is_fitted = True
    
    def score(self, X):
        """Generate trade probability scores."""
        if not self.is_fitted:
            return np.ones(len(X)) * 0.5
        return self.model.predict_proba(X)[:, 1]
