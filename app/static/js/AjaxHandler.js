import { HTMLGenerator } from './HTMLGenerator.js'
import { TTSHandler } from './TTSHandler.js'

/**
 * Ajax request handler
 */
export class AjaxHandler {
    /** 
     * Sends data using POST method
     * @param {String} name - Field's name
     * @param {String} data - Field's data 
    */
    static sendPost(name, data=null) {
        let formData = new FormData()
        formData.append(name, data)

        let xhr = new XMLHttpRequest()

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                let response = xhr.responseText
                if (response.includes(null)) return

                if (!['M80','M118', 'M119'].includes(name)) {
                    if (JSON.parse(response) == '-1' || response.length === 0) return

                    response = Object.values(JSON.parse(response))
                    HTMLGenerator.addPlayerNames(response)

                    if (name !== 'M27') document.getElementById('getName').remove()
                } else if (name === 'M80') {
                    TTSHandler.main(response)
                    document.getElementById('dice').src = 'img/dice-' + response + '.svg'
                } else if (['M118', 'M119'].includes(name)) {
                    if (!!JSON.parse(response) && document.getElementById('check') !== null) document.getElementById('check').remove()
                }
            }
        }

        xhr.open('POST', location.href + '/post')
        xhr.send( formData )
    }

    /** 
     * Sends user's nickname to server
     */
    static playerName() {
        const player = document.getElementById('player').value

        if (player.length > 0 && player.length < 16) this.sendPost('M21', player) // M21 - Send player name
        else if (player === '') alert('Please provide your nickname!')
        else alert('Your nickname is too long!')
    }

    /** 
     * Checks if there's already user data on server
     */
    static checkSession() {
        this.sendPost('M20') // M20 - List room data
    }

    /**
     * Gets roll result
     */
    static getRollResult() {
        this.sendPost('M80') // M80 - Get roll result
    }

    /**
     * Gets list of players in a specific room
     */
    static getPlayers() {
        this.sendPost('M27') // M27 - Get player list
    }

    /**
     * Sends info to server if player is ready
     * @param {Boolean} state - Player's state
     */
    static sendState(state) {
        this.sendPost('M118', state) // M118 - Send player state
    }

    /**
     * Checks if the game has started
     */
    static getState() {
        this.sendPost('M119') // M119 - Get game state
    }
}
