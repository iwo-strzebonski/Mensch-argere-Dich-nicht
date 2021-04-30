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
            if (!JSON.parse(player.ready)) document.getElementById('player' + player.color).style.filter = 'grayscale(100%)'
            else document.getElementById('player' + player.color).style.filter = ''
            document.getElementById('player' + player.color).innerText = player.name
        })
    }

    /**
     * Generates the board for the game
     */
    static genBoard() {
        const board = document.getElementById('board')
        const SIZE = 48
        const OFFSET = 16

        HTMLGenerator.genFields(board, SIZE, OFFSET)
        HTMLGenerator.genOuts(board, SIZE, OFFSET)
    }

    /**
     * Generates basic fields
     * @param {Object} board 
     * @param {Number} SIZE 
     * @param {Number} OFFSET 
     */
    static genFields(board, SIZE, OFFSET) {
        for (let i = 0; i < 40; i++) {
            let div = document.createElement('div')
            div.className = 'fields'
            div.id = 'f' + i

            if (i % 10 === 0) {
                switch (i / 10) {
                case 0:
                    div.style.backgroundColor = 'rgba(255,255,255,0.75)'
                    break
                
                case 1:
                    div.style.backgroundColor = 'rgba(0,0,255,0.75)'
                    break
                
                case 2:
                    div.style.backgroundColor = 'rgba(255,255,0,0.75)'
                    break
                
                case 3:
                    div.style.backgroundColor = 'rgba(0,255,0,0.75)'
                    break
                
                default:
                    break
                }
            }

            if (Array.range(0, 4).includes(i)) {
                div.style.left = OFFSET + i * SIZE + 'px'
                div.style.top = OFFSET + 4 * SIZE + 'px'
            } else if (Array.range(4, 8).includes(i)) {
                div.style.left = OFFSET + 4 * SIZE + 'px'
                div.style.top = OFFSET + (8 - i) * SIZE + 'px'
            } else if (Array.range(8, 10).includes(i)) {
                div.style.left = OFFSET + (i - 4) * SIZE + 'px'
                div.style.top = OFFSET + 'px'
            } else if (Array.range(10, 14).includes(i)) {
                div.style.left = OFFSET + 6 * SIZE + 'px'
                div.style.top = OFFSET + (i - 10) * SIZE + 'px'
            } else if (Array.range(14, 18).includes(i)) {
                div.style.left = OFFSET + (i - 8) * SIZE + 'px'
                div.style.top = OFFSET + 4 * SIZE + 'px'
            } else if (Array.range(18, 20).includes(i)) {
                div.style.left = OFFSET + 10 * SIZE + 'px'
                div.style.top = OFFSET + (i - 14) * SIZE + 'px'
            } else if (Array.range(20, 24).includes(i))  {
                div.style.left = OFFSET + (30 - i) * SIZE + 'px'
                div.style.top = OFFSET + 6 * SIZE + 'px'
            } else if (Array.range(24, 28).includes(i)) {
                div.style.left = OFFSET + 6 * SIZE + 'px'
                div.style.top = OFFSET + (i - 18) * SIZE + 'px'
            } else if (Array.range(28, 30).includes(i)) {
                div.style.left = OFFSET + (34 - i) * SIZE + 'px'
                div.style.top = OFFSET + 10 * SIZE + 'px'
            } else if (Array.range(30, 34).includes(i)) {
                div.style.left = OFFSET + 4 * SIZE + 'px'
                div.style.top = OFFSET + (40 - i) * SIZE + 'px'
            } else if (Array.range(34, 38).includes(i)) {
                div.style.left = OFFSET + (38 - i) * SIZE + 'px'
                div.style.top = OFFSET + 6 * SIZE + 'px'
            } else {
                div.style.left = OFFSET + 'px'
                div.style.top = OFFSET + (44 - i) * SIZE + 'px'
            }

            board.append(div)
        }
    }

    /**
     * Generates "out" fields
     * @param {Object} board 
     * @param {Number} SIZE 
     * @param {Number} OFFSET 
     */
    static genOuts(board, SIZE, OFFSET) {
        for (let i = 0; i < 16; i++) {
            let div = document.createElement('div')
            div.classList.add('outs')

            if (Array.range(0, 4).includes(i)) {
                div.classList.add('whites')
                div.id = 'w-o' + i
                div.style.top = OFFSET + (i < 2 ? 0 : SIZE) + 'px'
                div.style.left = OFFSET + (i % 2 !== 0 ? 0 : SIZE) + 'px'
            } else if (Array.range(4, 8).includes(i)) {
                div.classList.add('blues')
                div.id = 'b-o' + (i - 4)
                div.style.top = OFFSET + (i < 6 ? 0 : SIZE) + 'px'
                div.style.left = OFFSET + (i % 2 !== 0 ? 0 : SIZE) + 9 * SIZE + 'px'
            } else if (Array.range(8, 12).includes(i)) {
                div.classList.add('greens')
                div.id = 'g-o' + (i - 8)
                div.style.top = OFFSET + (i < 10 ? 0 : SIZE) + 9 * SIZE + 'px'
                div.style.left = OFFSET + (i % 2 !== 0 ? 0 : SIZE) + 9 * SIZE + 'px'
            } else {
                div.classList.add('yellows')
                div.id = 'y-o' + (i - 12)
                div.style.top = OFFSET + (i < 14 ? 0 : SIZE) + 9 * SIZE + 'px'
                div.style.left = OFFSET + (i % 2 !== 0 ? 0 : SIZE) + 'px'
            }

            board.append(div)
        }
    }
}