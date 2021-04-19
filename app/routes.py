import os
from flask import send_from_directory
from app import app

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

@app.route('/', methods=['GET'])
def index():
    '''
    Returns main page
    '''

    return send_from_directory(root, 'index.html')


@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    '''
    Returns requested static element

    Keyword arguments:
    path -- absolute path to directory containing static files
    '''

    return send_from_directory(root, path)
