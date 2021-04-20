'''
Helpers used by Flask server
'''

import uuid
from random import randint

class Helpers:
    class Room:
        def __init__(self, cache):
            self.cache = cache
            self.cache.set('rooms', [])

        def create(self, name):
            rooms = self.cache.get('rooms')
            rooms.append( { 'name': name, 'players': [] } )
            self.cache.set('rooms', rooms)

        def get_first_empty(self):
            for room in self.cache.get('rooms'):
                if len(room['players']) < 3:
                    return room['name']

            room_name = str(uuid.uuid4())
            self.create(room_name)

            return room_name

        def add_player(self, name, uid):
            room_name = self.get_first_empty()

            rooms = self.cache.get('rooms')
            color = randint(0, 3)

            for i in enumerate(rooms):
                if room_name in rooms[i[0]]['name']:
                    rooms[i[0]]['players'].append( { 'uid': uid, 'color': color } )
                    break

            self.cache.set('rooms', rooms)
            self.cache.set(uid, { 'name': name, 'room': room_name, 'color': color } )

            return rooms
