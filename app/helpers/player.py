'''Player helpers
'''
import secrets

from app.helpers import room

class Player:
    '''Class for handling player data
    '''

    def __init__(self, cache):
        self.cache = cache
        self.room_helper = room.Room(cache)

    def get_players_from_room(self, sid):
        '''Gets data of players in specific room

        Args:
            sid (str): Name of session

        Returns:
            arr: Array with player data
        '''
        room_list = self.room_helper.get_room_from_player(sid)['players']
        arr = [self.cache.get(i['uid']) for i in room_list]

        return arr

    @classmethod
    def roll_dice(cls):
        '''Generates crypto random in range <1, 6>, which emulates rolling a six-sided dice

        Returns:
            int: Crypto random number
        '''
        return secrets.randbelow(6) + 1
