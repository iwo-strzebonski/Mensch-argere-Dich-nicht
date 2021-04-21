'''
Helpers used by Flask server
'''

import uuid
from random import randint

class Room:
    def __init__(self, cache):
        self.cache = cache
        self.cache.set('rooms', [])

    def create(self, name):
        rooms = self.cache.get('rooms')
        rooms.append( { 'name': name, 'players': [], 'count': 0 } )
        self.cache.set('rooms', rooms)

    def get_first_empty(self):
        for room in self.cache.get('rooms'):
            if room['count'] < 4:
                return room['name']

        room_name = str(uuid.uuid4())
        self.create(room_name)

        return room_name

    def add_player(self, name, uid):
        room_name = self.get_first_empty()

        rooms = self.cache.get('rooms')
        color = randint(0, 3)

        count = -1

        for i in enumerate(rooms):
            if room_name in rooms[i[0]]['name']:
                rooms[i[0]]['players'].append( { 'uid': uid, 'color': color } )
                rooms[i[0]]['count'] += 1
                count = rooms[i[0]]['count']
                break

        self.cache.set('rooms', rooms)
        self.cache.set(uid, { 'name': name, 'room': room_name, 'color': color } )

        return rooms, count
