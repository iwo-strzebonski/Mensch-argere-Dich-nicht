import { AjaxHandler } from './AjaxHandler.js'
import { CookieHandler } from './CookieHandler.js'
Array.range = (start, end) => { return [...Array(end - start).keys()].map(i => i + start) }

window.onload = () => {
    // document.body.append('[' + Array.range(0, 20) + ']')
}

AjaxHandler.checkForSession()

document.getElementById('submit').onclick = () => AjaxHandler.playerName()

console.log(CookieHandler.getSID())
