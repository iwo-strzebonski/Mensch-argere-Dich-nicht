import { AjaxHandler } from './AjaxHandler.js'
import { HTMLGenerator } from './HTMLGenerator.js'
Array.range = (start, end) => { return [...Array(end - start).keys()].map(i => i + start) }

const AjaxLoop = async() => {
    const BOOL = true
    while (BOOL) {
        AjaxHandler.getPlayers()
        AjaxHandler.getState()
        await new Promise(r=>setTimeout(r,1000))
    }
}

window.onload = async() => {
    document.getElementById('state').checked = false
    AjaxHandler.sendState(false)

    AjaxHandler.checkSession()
    HTMLGenerator.genBoard()
    
    AjaxLoop()
}

document.getElementById('submit').onclick = () => AjaxHandler.playerName()
document.getElementById('roll').onclick = () => AjaxHandler.getRollResult()
document.getElementById('state').onchange = () => AjaxHandler.sendState(document.getElementById('state').checked)
