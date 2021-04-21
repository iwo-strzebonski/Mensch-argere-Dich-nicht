/**
 * HTML generators
 */
export class HTMLGenerator {
    /** 
     * Adds player names to DOM elements.
     * @param {Array} players - List of players in specific room
     */
    static addPlayerNames(players) {
        players.forEach(player => {
            if (player === null) return
            document.getElementById('player' + player.color).innerText = player.name
        })
    }
}