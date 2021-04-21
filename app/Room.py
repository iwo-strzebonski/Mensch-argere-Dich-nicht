'''
Room helpers
'''

import uuid
import secrets

class Room:
    '''Class for handling room data
    '''

    def __init__(self, cache):
        self.cache = cache
        self.cache.set('rooms', [])

    def create(self, name):
        rooms = self.cache.get('rooms')
        rooms.append( { 'name': name, 'players': [], 'count': 0 } )
        self.cache.set('rooms', rooms)

    def get_first_empty(self):
        room_name = str(uuid.uuid4())

        if self.cache.get('rooms') is None:
            self.create(room_name)

        for room in self.cache.get('rooms'):
            if room['count'] < 4:
                return room['name']

        self.create(room_name)

        return room_name

    def add_player(self, name, uid):
        room_name = self.get_first_empty()

        rooms = self.cache.get('rooms')
        colors = [0, 1, 2, 3]

        for i in enumerate(rooms):
            if room_name in rooms[i[0]]['name']:

                if len(rooms[i[0]]['players']) > 0:
                    for c in rooms[i[0]]['players']:
                        colors.remove(c['color'])

                color = secrets.choice(colors)

                rooms[i[0]]['players'].append( { 'uid': uid, 'color': color } )
                rooms[i[0]]['count'] += 1

                break

        self.cache.set('rooms', rooms)
        self.cache.set(uid, { 'name': name, 'room': room_name, 'color': color } )

    def get_room_from_player(self, uid):
        if self.cache.get('rooms') is None:
            return '-1'

        for room in self.cache.get('rooms'):
            for player in room['players']:
                if player['uid'] == uid:
                    return room

        return '-1'
