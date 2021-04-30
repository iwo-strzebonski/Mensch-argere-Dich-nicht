'''
Room helpers
'''

import uuid
import secrets
import time
import datetime

class Room:
    '''Class for handling room data
    '''
    def __init__(self, cache):
        self.cache = cache
        self.cache.set('rooms', [])
        self.delta = datetime.timedelta(hours=2)

    def create(self, name):
        '''Creates a new room

        Args:
            name (str): ID name of room
        '''
        rooms = self.cache.get('rooms')

        if rooms is None:
            rooms = []

        rooms.append( { 'name': name, 'players': [], 'count': 0, 'data': {
            'turn': -1,
            '0': [-1, -1, -1, -1],
            '1': [-1, -1, -1, -1],
            '2': [-1, -1, -1, -1],
            '3': [-1, -1, -1, -1]
        } } )
        self.cache.set('rooms', rooms)

    def get_first_empty(self):
        '''Gets the name of the first empty room

        Returns:
            str: First empty room's name
        '''
        room_name = str(uuid.uuid4())

        if self.cache.get('rooms') is None:
            self.create(room_name)

        for room in self.cache.get('rooms'):
            if room['count'] < 4:
                return room['name']

        self.create(room_name)

        return room_name

    def add_player(self, uid, name, room_name, color):
        '''Adds data for a new player

        Args:
            uid (str): Player's Session ID
            name (str): Player's name
            room_name (str): Player's room
            color (int): Player's color
        '''
        players = self.cache.get('players')

        if players is None:
            players = []

        players.append(
            {
                'uid': uid,
                'name': name,
                'room': room_name,
                'color': color,
                'ready': False,
                'exp_date': time.time() + self.delta.total_seconds()
            }
        )

        self.cache.set('players', players)

    def add_player_to_room(self, name, uid):
        '''Adds a player to specific room

        Args:
            name (str): Room's name
            uid (str): UID of specific player
        '''
        room_name = self.get_first_empty()

        rooms = self.cache.get('rooms')
        colors = [0, 1, 2, 3]

        for i in enumerate(rooms):
            if room_name in rooms[i[0]]['name']:

                if len(rooms[i[0]]['players']) > 0:
                    for j in rooms[i[0]]['players']:
                        colors.remove(j['color'])

                color = secrets.choice(colors)

                rooms[i[0]]['players'].append( { 'uid': uid, 'color': color } )
                rooms[i[0]]['count'] += 1

                break

        self.cache.set('rooms', rooms)
        self.add_player(uid, name, room_name, color)

    def get_room_from_player(self, uid):
        '''Gets room data using specified user's UID

        Args:
            uid (str): UID of specific player

        Returns:
            dict: Room's data
        '''
        if self.cache.get('rooms') is None:
            return '-1'

        for room in self.cache.get('rooms'):
            for i in room['players']:
                if i['uid'] == uid:
                    return room

        return '-1'

    def close_room(self, uid):
        '''Closes room for new players

        Args:
            uid (str): UID of specific player
        '''
        rooms = self.cache.get('rooms')

        for i in enumerate(rooms):
            for player in rooms[i[0]]['players']:
                if player['uid'] == uid:
                    rooms[i[0]]['data']['turn'] = self.get_first_player(rooms[i[0]]['players'])
                    rooms[i[0]]['count'] = 5
                    break

            if rooms[i[0]]['count'] == 5:
                break

        self.cache.set('rooms', rooms)

    def start_game(self, uid):
        '''Starts the game for a room using specific user's SID

        Args:
            uid (str): UID of specific player

        Returns:
            bool: Has the game started?
        '''
        players = self.cache.get('players')

        room = self.get_room_from_player(uid)
        start = False
        temp = 0

        for player in players:
            if room['count'] == 5:
                start = True
                break

            for i in room['players']:
                if player['uid'] == i['uid'] and player['ready']:
                    temp += 1

            if temp == room['count'] and temp > 1:
                start = True
                self.close_room(uid)
                break

        return start

    def get_game_state(self, uid):
        '''Checks if game has started

        Args:
            uid (str): UID of specific player

        Returns:
            [bool]: Does the game started?
        '''
        room = self.get_room_from_player(uid)
        state = False

        if room != '-1' and room['count'] == 5:
            state = True

        return state

    @classmethod
    def get_first_player(cls, players):
        '''Gets the first player for the game

        Args:
            players (list): List of all players in the room

        Returns:
            int: First player
        '''
        arr = [i['color'] for i in players]
        arr.sort()
        return arr[0]
