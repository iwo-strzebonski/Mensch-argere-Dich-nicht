'''
Flask routing module
'''

import os
import mimetypes
import uuid
import datetime

from flask import send_from_directory, make_response, request, jsonify
from flask_caching import Cache
from flask_cors import CORS, cross_origin

from app import app
from app.helpers import room
from app.helpers import player

DELTA = datetime.timedelta(days=1)

cache = Cache(app)
CORS(app)

with app.app_context():
    cache.clear()

mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/javascript', '.js')

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')


# Helpers
room_helper = room.Room(cache)
player_helper = player.Player(cache)


@app.route('/', methods=['GET'])
@cross_origin()
def index():
    '''Routing for main page (GET method)

    Returns:
        text/html: Main page (index.html)
    '''

    res = make_response(send_from_directory(root, 'index.html'))

    if 'session' not in request.cookies:
        uid = str(uuid.uuid4())
        res.set_cookie('session', bytes(uid, 'utf-8'), secure=True, max_age=DELTA)

    return res


@app.route('/<path:path>', methods=['GET'])
@cross_origin()
def static_proxy(path):
    '''Routing for requested static element (GET method)

    Args:
        path (str): Absolute path to directory containing static files

    Returns:
        file <mimetype>: Requested file
    '''

    res = make_response(send_from_directory(root, path))

    return res


@app.route('/post', methods=['POST'])
@cross_origin()
def post():
    '''Routing for POST methods

    Returns:
        JSON: Requested data
    '''

    sid = request.cookies.get('session')

    if 'M21' in request.form:
        room_helper.add_player(request.form['M21'], sid)

        players = player_helper.get_players_from_room(sid)
        res = make_response(jsonify(players))

    elif ('M20' in request.form or 'M27' in request.form) and cache.get(sid) is not None:
        players = player_helper.get_players_from_room(sid)
        res = make_response(jsonify(players))

    elif 'M20' in request.form:
        player_data = room_helper.get_room_from_player(sid)
        res = make_response(str(player_data))

    elif 'M27' in request.form:
        res = make_response('-1')

    elif 'M80' in request.form:
        res = make_response(str(player_helper.roll_dice()))

    else:
        res = make_response(request.form)

    return res
