import { AjaxHandler } from './AjaxHandler.js'
Array.range = (start, end) => { return [...Array(end - start).keys()].map(i => i + start) }

window.onload = () => {
}

AjaxHandler.checkForSession()

document.getElementById('submit').onclick = () => AjaxHandler.playerName()
document.getElementById('roll').onclick = () => AjaxHandler.getRollResult()
