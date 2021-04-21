import { HTMLGenerator } from './HTMLGenerator.js'

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

                if (response != -1 && name !== 'M80' && name !== 'M27') {
                    response = Object.values(JSON.parse(response))
                    HTMLGenerator.addPlayerNames(response)

                    document.getElementById('getName').remove()
                } else if (name === 'M80') {
                    console.log(response)
                } else if (response != -1 && name === 'M27') {
                    response = Object.values(JSON.parse(response))
                    HTMLGenerator.addPlayerNames(response)
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
}
