import { AjaxHandler } from './AjaxHandler.js'
import { HTMLGenerator } from './HTMLGenerator.js'
Array.range = (start, end) => { return [...Array(end - start).keys()].map(i => i + start) }

const AjaxLoop = async() => {
    const BOOL = true
    while (BOOL) {
        AjaxHandler.getPlayers()
        await new Promise(r=>setTimeout(r,300))
        AjaxHandler.getRoomData()
        await new Promise(r=>setTimeout(r,300))
    }
}

window.onload = async() => {
    AjaxHandler.checkSession()
    HTMLGenerator.genBoard()

    AjaxLoop()
}

document.getElementById('submit').onclick = () => AjaxHandler.playerName()
document.getElementById('roll').onclick = () => AjaxHandler.getRollResult()
document.getElementById('state').onchange = () => AjaxHandler.sendState(document.getElementById('state').checked)
