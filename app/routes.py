import os
import mimetypes

from flask import send_from_directory, make_response
from app import app


mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/javascript', '.js')

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')


@app.route('/', methods=['GET'])
def index():
    '''
    Returns main page
    '''

    res = make_response(send_from_directory(root, 'index.html'))
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['X-Content-Type-Options'] = 'nosniff'

    return res


@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    '''
    Returns requested static element

    Keyword arguments:
    path -- absolute path to directory containing static files
    '''

    res = make_response(send_from_directory(root, path))
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['X-Content-Type-Options'] = 'nosniff'

    return res

@app.route('/<path:path>', methods=['OPTIONS'])
def options():
    res = make_response()
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['X-Content-Type-Options'] = 'nosniff'
    res.headers['Access-Control-Allow-Headers'] = [
        'Origin, X-Requested-With, Content-Type, Accept, POST, GET, OPTIONS'
    ]
