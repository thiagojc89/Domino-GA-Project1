//Tile Class
class tile {
	constructor(element, name, sideA, sideB) {
		this.name = name,
			this.element = element,
			this.sideA = [sideA, true],
			this.sideB = [sideB, true],
			this.double = sideA === sideB,
			this.boardSide = null,
			this.sideExposed = null
	}
	rotateTile(element = this.element) {

		if (element.classList.contains('dominoH')) {

			element.querySelectorAll('.side-H').forEach(elem => {
				elem.classList.remove('side-H')
				elem.classList.add('side-V')

				elem.childNodes.forEach(elem2 => {
					elem2.classList.remove('side-H-dot')
					elem2.classList.add('side-V-dot')
				})
			})
			element.classList.remove('dominoH')
			element.classList.add('dominoV')
		}
		else {
			element.querySelectorAll('.side-V').forEach(elem => {
				elem.classList.remove('side-V')
				elem.classList.add('side-H')

				elem.childNodes.forEach(elem2 => {
					elem2.classList.remove('side-V-dot')
					elem2.classList.add('side-H-dot')
				})
			})
			element.classList.remove('dominoV')
			element.classList.add('dominoH')
		}

	}
	switchSide(angle, element = this.element) {
		element.setAttribute('style', `transform: rotate(${angle}deg)`)
	}
}


const game = {

	dominoes: [],
	dominoesPlayer1Array: [],
	dominoesPlayer2Array: [],
	dominoPile: [],
	cursorDominoTile: null,
	top: null,
	left: null,
	mouseDown: false,
	mouseTarget: null,
	guide: ["000", "010", "101", "111", "202", "212", "222"],
	switchTurn: 'player1',
	generateDominoesTiles() {
		for (let i = 0; i <= 6; i++) {
			for (let j = i; j <= 6; j++) {

				const domino = document.createElement('div')

				domino.classList.add('dominoV')

				const sideA = document.createElement('div')
				sideA.classList.add('side-V')

				for (let x = 0; x < 3; x++) {

					const div = document.createElement('div')
					div.classList.add('side-V-dot')

					for (let y = 0; y < parseInt(this.guide[i][x]); y++) {

						const dot = document.createElement('div')
						dot.classList.add('dot')
						div.appendChild(dot)

					}
					sideA.appendChild(div)
				}
				domino.appendChild(sideA)

				const sideB = document.createElement('div')
				sideB.classList.add('side-V')

				for (let x = 0; x < 3; x++) {

					const div = document.createElement('div')
					div.classList.add('side-V-dot')

					for (let y = 0; y < parseInt(this.guide[j][x]); y++) {

						const dot = document.createElement('div')
						dot.classList.add('dot')
						div.appendChild(dot)
					}
					sideB.appendChild(div)
				}
				domino.appendChild(sideB)

				domino.classList.add('tile')

				domino.dataset.tile = `tile${i}by${j}`
				const newTile = new tile(domino, domino.dataset.tile, i, j)
				this.dominoes.push(newTile)

			}
		}
	},
	startGame() {
		this.generateDominoesTiles()
		this.dealDominoes()
		this.appendTotheScreen()

		document.querySelector('#image-start-game').setAttribute('style', 'display: none')
		document.querySelector('#instruction').setAttribute('style', 'display: none')
		document.querySelector('#dominoPlayer2').setAttribute('style', 'background-color: gray')
		document.querySelector('#dominoPlayer2').childNodes.forEach(elem => elem.setAttribute('style', 'visibility: hidden'))

		addListeners()

	},
	dealDominoes() {
		const getRandom = () => Math.floor(Math.random() * this.dominoes.length)
		for (let i = 0; i < 21; i += 1) {
			if (i < 7) {
				const indexPlayer1 = getRandom()
				this.dominoesPlayer1Array.push(this.dominoes[indexPlayer1])
				this.dominoes.splice(indexPlayer1, 1)

				const indexPlayer2 = getRandom()
				this.dominoesPlayer2Array.push(this.dominoes[indexPlayer2])
				this.dominoes.splice(indexPlayer2, 1)
			}
			else {
				const indexPile = getRandom()
				this.dominoPile.push(this.dominoes[indexPile])
				this.dominoes.splice(indexPile, 1)
			}
		}
		this.dominoes = [...this.dominoesPlayer1Array, ...this.dominoesPlayer2Array, ...this.dominoPile]
	},
	appendTotheScreen() {
		for (let i = 0; i < 7; i += 1) {
			document.querySelector('#dominoPlayer1').appendChild(this.dominoesPlayer1Array[i].element)
		}
		for (let i = 0; i < 7; i += 1) {
			document.querySelector('#dominoPlayer2').appendChild(this.dominoesPlayer2Array[i].element)
		}
		for (let i = 0; i < 14; i += 1) {
			document.querySelector('#dominoPile').appendChild(this.dominoPile[i].element)
		}
		document.querySelector('#dominoPile').setAttribute('style', 'display: none')
	},
	checkMatch(element1, element2) {
		// console.log("elem1", element1)
		// console.log("elem2", element2)
		switch (true) {
			case element1.sideA[0] === element2.sideA[0] && element2.sideA[1]:
				element1.sideA[1] = false
				element2.sideA[1] = false
				// element1.rotateTile()
				return [true, 'AA']
			case element1.sideA[0] === element2.sideB[0] && element2.sideB[1]:
				element1.sideA[1] = false
				element2.sideB[1] = false
				// element1.rotateTile()
				return [true, 'AB']
			case element1.sideB[0] === element2.sideA[0] && element2.sideA[1]:
				element1.sideB[1] = false
				element2.sideA[1] = false
				// element1.rotateTile()
				return [true, 'BA']
			case element1.sideB[0] === element2.sideB[0] && element2.sideB[1]:
				element1.sideB[1] = false
				element2.sideB[1] = false
				// element1.rotateTile()
				return [true, 'BB']
			default:
				return false
		}
	},
	fixRotation(element, cordinates) {
		switch (true) {
			case cordinates === 'L-AA':
				console.log("L-AA")
				element.rotateTile()
				element.switchSide("180")
				break
			case cordinates === 'L-AB':
				console.log("L-AB")
				element.rotateTile()
				element.switchSide("180")
				break
			case cordinates === 'L-BA':
				console.log("L-BA")
				element.rotateTile()
				break
			case cordinates === 'L-BB':
				console.log("L-BB")
				element.rotateTile()
				break
			case cordinates === 'R-AA':
				console.log("R-AA")
				element.rotateTile()
				break
			case cordinates === 'R-AB':
				console.log("R-AB")
				element.rotateTile()
				break
			case cordinates === 'R-BA':
				console.log("R-BA")
				element.rotateTile()
				element.switchSide("180")

				break
			case cordinates === 'R-BB':
				console.log("R-BB")
				element.rotateTile()
				element.switchSide("180")
				break
			default:
				return false
		}
	},
	dominoPurchase(id) {
		const rand = Math.floor(Math.random() * this.dominoPile.length)
		if (id === 'player1DominoGrid') {
			document.querySelector('#dominoPlayer1').appendChild(this.dominoPile[rand].element)
		}
		if (id === 'player2DominoGrid') {
			document.querySelector('#dominoPlayer2').appendChild(this.dominoPile[rand].element)
		}
		this.dominoPile.splice(rand, 1)
		if (this.dominoPile.length === 0) {
			document.querySelectorAll('.newDomino').forEach(elem => {
				elem.setAttribute('style', 'background-color: rgb(197, 197, 197)')
			})
		}
	},
	changePlayer() {
		const player1 = document.querySelector('#dominoPlayer1')
		const player2 = document.querySelector('#dominoPlayer2')
		if (game.switchTurn === "player1") {

			player1.setAttribute('style', 'background-color: gray')
			player1.childNodes.forEach(elem => elem.setAttribute('style', 'visibility: hidden'))

			player2.setAttribute('style', 'background-color: rgba(0, 0, 255, 0.5)')
			player2.childNodes.forEach(elem => elem.setAttribute('style', 'visibility: visible'))
			game.switchTurn = "player2"
		}
		else {

			player2.setAttribute('style', 'background-color: gray')
			player2.childNodes.forEach(elem => elem.setAttribute('style', 'visibility: hidden'))

			player1.setAttribute('style', 'background-color: rgba(255, 0, 0, 0.5)')
			player1.childNodes.forEach(elem => elem.setAttribute('style', 'visibility: visible'))
			game.switchTurn = "player1"
		}
	}
}

// listeners
document.body.addEventListener('keypress', function (e) {

	if (game.mousedown) {
		if (e.key === "r") {
			game.cursorDominoTile.rotateTile()
		}
		if (e.key === "s") {
			game.cursorDominoTile.switchSide("0")
		}
		if (e.key === "a") {
			game.cursorDominoTile.switchSide("180")
		}
	}
})
document.querySelector("#image-start-game").addEventListener('click', () => game.startGame())

function addListeners() {
	document.querySelectorAll('.tile').forEach(elem => {

		// make this element draggable
		elem.draggable = true

		// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#draggableattribute
		elem.addEventListener('dragstart', (event) => {
			event.dataTransfer.setData('text/plain', 'This text may be dragged')
		})

		//Mouse DOWN listener
		elem.addEventListener('mousedown', function (e) {
			game.mousedown = true
			game.mouseTarget = e.currentTarget
			game.cursorDominoTile = game.dominoes.find((tile) => tile.name === e.currentTarget.dataset.tile)
			game.top = e.currentTarget.top
			game.left = e.currentTarget.left

		})
	})
	document.querySelector('#gameBoard').addEventListener('drop', (event) => {
		event.preventDefault()
		if (event.target.id == "gameBoard") {

			// this returns position of the cursor on the page (where I drop the tile)
			const cursorPosition = event.pageX
			// this returns the position of the beggining of the gameBoard
			const margin = event.target.offsetLeft
			// this returns the size (width) of the gameBoard
			const boardWidth = event.target.clientWidth

			// verify if is the first play
			if (!event.target.querySelector('.tile')) {

				if (game.cursorDominoTile.double){
					game.mouseTarget.parentNode.removeChild(game.mouseTarget);
					event.target.appendChild(game.mouseTarget);
					if (!game.cursorDominoTile.double) game.cursorDominoTile.rotateTile()
					game.changePlayer()
				}
			}
			// verify o which side to append or preppend tile
			else if (cursorPosition - margin > (boardWidth / 2)) {
				// need to check first if I can append here
				const elem1 = game.dominoes.find(tile => tile.name === game.mouseTarget.dataset.tile)
				const elem2 = game.dominoes.find(tile => tile.name === event.target.lastChild.dataset.tile)

				const [foundMatch, match] = game.checkMatch(elem1, elem2)

				if (foundMatch) {
					game.mouseTarget.parentNode.removeChild(game.mouseTarget);
					event.target.appendChild(game.mouseTarget);
					

					elem1.boardSide = 'right'
					if (!elem1.double) game.fixRotation(elem1, "R-"+match)

					game.changePlayer()
				}
			}
			else {
				const elem1 = game.dominoes.find(tile => tile.name === game.mouseTarget.dataset.tile)
				const elem2 = game.dominoes.find(tile => tile.name === event.target.querySelector('.tile').dataset.tile)

				const [foundMatch, match] = game.checkMatch(elem1, elem2)

				if (foundMatch) {

					game.mouseTarget.parentNode.removeChild(game.mouseTarget);
					event.target.insertBefore(game.mouseTarget, event.target.querySelector('.tile'))

					elem1.boardSide = 'left'
					if (!elem1.double) game.fixRotation(elem1, "L-"+match)
					game.changePlayer()
				}
			}
		}
	})

	function _func(e) {
		if (game.dominoPile.length > 0) game.dominoPurchase(e.target.id)
		else e.target.removeEventListener('click', _func)
	}
	document.querySelectorAll('.newDomino').forEach(elem => {
		elem.addEventListener('click', _func)
	})
	document.querySelectorAll('.passTurn').forEach(elem => {
		elem.addEventListener('click', game.changePlayer)
	})

}
game.startGame()
// debug listenter
// document.addEventListener('click', e => console.log(e.target))

