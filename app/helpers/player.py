'''Player helpers
'''
import secrets
import time

from app.helpers import room

class Player:
    '''Class for handling player data
    '''
    def __init__(self, cache):
        self.cache = cache
        self.cache.set('players', [])
        self.room_helper = room.Room(cache)

    def get_players_from_room(self, sid):
        '''Gets data of players in specific room

        Args:
            sid (str): Name of session

        Returns:
            arr: Array with player data
        '''
        if self.room_helper.get_room_from_player(sid) != '-1':
            room_list = self.room_helper.get_room_from_player(sid)['players']
            arr = [self.get_player_from_cache(i['uid']) for i in room_list]
        else:
            arr = '-1'

        return arr

    def get_player_from_cache(self, uid):
        '''Gets player data by player ID (UID)

        Args:
            uid (str): UID of specific player

        Returns:
            dict: Dictionary with player data
        '''
        players = self.cache.get('players')

        for player in players:
            if player['uid'] == uid:
                return player

        return '-1'

    def set_player_state(self, uid, state):
        '''Sets player's readiness state

        Args:
            uid (str): UID of specific player
            state (bool): Player's readiness state
        '''
        players = self.cache.get('players')

        for player in players:
            if player['uid'] == uid:
                player['ready'] = state

        self.cache.set('players', players)

    def remove_old_players(self):
        '''Removes redundant players
        '''

        players = self.cache.get('players')

        for i in enumerate(players):
            if players[i[0]]['exp_date'] < time.time():
                del players[i[0]]

        self.cache.set('players', players)

    @classmethod
    def roll_dice(cls):
        '''Generates crypto random in range <1, 6>, which emulates rolling a six-sided dice

        Returns:
            int: Crypto random number
        '''
        return secrets.randbelow(6) + 1
