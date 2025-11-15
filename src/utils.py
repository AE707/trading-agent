import yaml
import logging
from pathlib import Path

def load_config(config_path):
    """Load YAML configuration file."""
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)

def setup_logging(log_level=logging.INFO):
    """Configure logging for the trading agent."""
    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    return logging.getLogger(__name__)

def ensure_data_dir(data_path):
    """Ensure data directory exists."""
    Path(data_path).mkdir(parents=True, exist_ok=True)
