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
                if (xhr.responseText.includes(null)) return
                let response = JSON.parse(xhr.responseText)

                if (['M20','M21', 'M27'].includes(name)) {
                    if (response == '-1' || response.length === 0) return
                    let state = AjaxHandler.getPlayerState(response)

                    response = Object.values(response)
                    HTMLGenerator.addPlayerNames(response)

                    if (name !== 'M27') document.getElementById('getName').remove()
                    try { document.getElementById('state').checked = state }
                    catch { 'pass' }
                } else if (name === 'M80') {
                    TTSHandler.main(response)
                    document.getElementById('dice').src = 'img/dice-' + response + '.svg'
                } else if (name === 'G11') {
                    if (response != '-1') {
                        let color = AjaxHandler.getPlayerColor(response.players)
                        let turn = response.data.turn
                        let state = response.count === 5

                        if (state) {
                            try { document.getElementById('check').remove() }
                            catch { 'pass' }
                        }

                        if (color === turn && state) {
                            document.getElementById('roll').style.display = 'initial'

                            if (localStorage.getItem('timestamp') == 0 || localStorage.getItem('timestamp') == null) localStorage.setItem('timestamp', new Date().getTime())

                            else if (new Date().getTime() - localStorage.getItem('timestamp') >= 10000) {
                                AjaxHandler.pass()
                            } else {
                                document.getElementById('timer').innerText = 10 - Math.round((new Date().getTime() - localStorage.getItem('timestamp')) / 1000)
                            }
                        }
                        else {
                            localStorage.setItem('timestamp', 0)
                            document.getElementById('roll').style.display = 'none'
                            document.getElementById('timer').innerText = 'X'
                            // document.getElementById('dice').src = 'img/dice-x.svg'
                        }
                    }
                }
            }
        }

        xhr.open('POST', location.href + '/post')
        xhr.send( formData )
    }

    /** 
     * Checks if there's already user data on server
     */
    static checkSession() {
        this.sendPost('M20') // M20 - List room data
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
     * Gets list of players in a specific room
     */
    static getPlayers() {
        this.sendPost('M27') // M27 - Get player list
    }

    /**
     * Gets roll result
     */
    static getRollResult() {
        this.sendPost('M80') // M80 - Get roll result
    }
    
    /**
     * Pass round
     */
    static pass() {
        this.sendPost('M81') // M81 - Pass
        localStorage.setItem('timestamp', 0)
        document.getElementById('roll').style.display = 'none'
        document.getElementById('timer').innerText = 'X'
        document.getElementById('dice').src = 'img/dice-x.svg'
    }

    /**
     * Sends info to server if player is ready
     * @param {Boolean} state - Player's state
     */
    static sendState(state) {
        this.sendPost('M118', state) // M118 - Send player state
    }

    /**
     * Gets data of room
     */
    static getRoomData() {
        this.sendPost('G11') // G11 - Get room data
    }

    /**
     * Gets color of the player
     * @param {Object} players - List of all players in the room
     */
    static getPlayerColor(players) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].uid === document.cookie.replace(/session=/, '')) return players[i].color
        }
    }

    /**
     * Gets state of the player
     * @param {Object} players - List of all players in the room
     */
    static getPlayerState(players) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].uid === document.cookie.replace(/session=/, '')) return players[i].ready
        }
    }
}
