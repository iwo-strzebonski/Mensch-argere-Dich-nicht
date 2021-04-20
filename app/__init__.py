import secrets
from flask import Flask
from flask_caching import Cache

app = Flask(__name__)
config = {
    'DEBUG': True,
    'CACHE_TYPE': 'SimpleCache',
    'CACHE_DEFAULT_TIMEOUT': 300,
    'SECRET_KEY': '9317f2b87044b56c44ca2502d3f945af'
}

app.config.from_mapping(config)

cache = Cache(app)

with app.app_context():
    cache.clear()

# pylint: disable=wrong-import-position
from app import routes
