import { AjaxHandler } from './AjaxHandler.js'
Array.range = (start, end) => { return [...Array(end - start).keys()].map(i => i + start) }


const playerListLoop = async() => {
    const BOOL = true
    while (BOOL) {
        AjaxHandler.getPlayers()
        await new Promise(r=>setTimeout(r,2000))
    }
}

window.onload = async() => {
    AjaxHandler.checkSession()
    
    playerListLoop()
}

document.getElementById('submit').onclick = () => AjaxHandler.playerName()
document.getElementById('roll').onclick = () => AjaxHandler.getRollResult()
