/**
 * HTML generators
 */
export class HTMLGenerator {
    /** 
     * Adds player names to DOM elements.
     * @param {Array} players - List of players in specific room
     */
    static addPlayerNames(players) {
        for (let i = 0; i < 4; i++) document.getElementById('player' + i).innerText = ''

        players.forEach(player => {
            if (player === null) return
            document.getElementById('player' + player.color).innerText = player.name
        })
    }
}