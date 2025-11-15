from setuptools import setup, find_packages

setup(
    name='trading-agent',
    version='0.1.0',
    description='Automated three-stage trader learning pipeline',
    author='Trading Systems',
    url='https://github.com/AE707/trading-agent',
    packages=find_packages(),
    install_requires=['pandas','numpy','scikit-learn','SQLAlchemy','psycopg2-binary','PyYAML','xgboost','requests'],
    python_requires='>=3.8',
)
