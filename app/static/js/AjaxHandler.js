import { CookieHandler } from './CookieHandler.js'

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
                const response = xhr.responseText
                console.log('response :>> ', response)

                if (xhr.responseText == -1) {
                    document.getElementById('getName').style.display = ''
                } else {
                    document.getElementById('getName').remove()
                }
            }
        }

        console.log(location.href)
        xhr.open('POST', location.href + '/post')
        xhr.send( formData )
    }

    /** 
     * Sends user's nickname to server
     */
    static playerName() {
        const player = document.getElementById('player').value

        if (player.length > 0 && player.length < 16) this.sendPost('M23', player) // M23 - Send player name
        else if (player === '') alert('Please provide your nickname!')
        else alert('Your nickname is too long!')
    }

    /** 
     * Checks if there's already user data on server
     */
    static checkForSession() {
        this.sendPost('M32', CookieHandler.getSID()) // M32 - Start game
    }
}
