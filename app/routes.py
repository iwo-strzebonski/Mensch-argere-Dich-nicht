import os
import mimetypes
import uuid
import datetime

from flask import send_from_directory, make_response, request
from flask_caching import Cache

from flask_cors import CORS, cross_origin

from app import app
from app import helpers


DELTA = datetime.timedelta(minutes=5)


cache = Cache(app)
cors = CORS(app, resources= { r'/post': { "origins": "http://localhost:5000" } })

mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/javascript', '.js')

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

# Helpers
room_helper = helpers.Helpers.Room(cache)



@app.route('/', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
def index():
    '''
    Returns main page
    '''

    res = make_response(send_from_directory(root, 'index.html'))

    if 'session' not in request.cookies:
        uid = str(uuid.uuid4())
        res.set_cookie('session', bytes(uid, 'utf-8'), secure=True, max_age=DELTA)

    # res.header['Access-Control-Allow-Origin'] = '*'
    # res.headers['X-Content-Type-Options'] = 'nosniff'

    return res


@app.route('/<path:path>', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
def static_proxy(path):
    '''
    Returns requested static element

    Keyword arguments:
    path -- absolute path to directory containing static files
    '''

    res = make_response(send_from_directory(root, path))

    # res.headers['Access-Control-Allow-Origin'] = '*'
    # res.headers['X-Content-Type-Options'] = 'nosniff'

    return res

@app.route('/post', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
def post():
    '''
    POST methods
    '''

    uid = request.cookies.get('session')

    if 'M23' in request.form:
        name = request.form['M23']

        t = room_helper.add_player(name, uid)

        res = make_response(str(t))
        # res = make_response(cache.get(uid))

    elif 'M32' in request.form:
        sid = request.form['M32']
        player_data = '-1' if cache.get(sid) is None else cache.get(sid)
        res = make_response(player_data)
    else:
        res = make_response(request.form)

    # res.headers['Access-Control-Allow-Origin'] = '*'
    # res.headers['X-Content-Type-Options'] = 'nosniff'

    return res
