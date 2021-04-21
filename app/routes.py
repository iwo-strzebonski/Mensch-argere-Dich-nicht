import os
import mimetypes
import uuid
import datetime
from flask import send_from_directory, make_response, request
from flask_caching import Cache

from flask_cors import CORS, cross_origin

from app import app
from app import helpers


import logging
logging.getLogger('flask_cors').level = logging.DEBUG


DELTA = datetime.timedelta(minutes=5)


cache = Cache(app)
cors = CORS(app)

mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/javascript', '.js')

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')


# Helpers
room_helper = helpers.Helpers.Room(cache)



@app.route('/', methods=['GET'])
@cross_origin()
def index():
    '''
    Returns main page
    '''

    res = make_response(send_from_directory(root, 'index.html'))

    if 'session' not in request.cookies:
        uid = str(uuid.uuid4())
        res.set_cookie('session', bytes(uid, 'utf-8'), secure=True, max_age=DELTA)

    return res


@app.route('/<path:path>', methods=['GET'])
@cross_origin()
def static_proxy(path):
    '''
    Returns requested static element

    Keyword arguments:
    path -- absolute path to directory containing static files
    '''

    res = make_response(send_from_directory(root, path))

    return res


@app.route('/post', methods=['POST'])
@cross_origin()
def post():
    '''
    POST methods
    '''

    uid = request.cookies.get('session')

    if 'M23' in request.form:
        name = request.form['M23']

        data = room_helper.add_player(name, uid)

        res = make_response(str(data))
        # res = make_response(cache.get(uid))

    elif 'M32' in request.form:
        sid = request.form['M32']
        player_data = '-1' if cache.get(sid) is None else cache.get(sid)
        res = make_response(player_data)
    else:
        res = make_response(request.form)

    return res


@app.route('/post', methods=['POST'])
@cross_origin()
def options():
    res = make_response()

    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Headers'] = '*'
    res.headers['Access-Control-Allow-Methods'] = '*'
    res.headers['X-Content-Type-Options'] = 'nosniff'

    return res