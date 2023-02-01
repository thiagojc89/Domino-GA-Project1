class Game {
	constructor(){

		this.dominoes = [],
		this.dominoesPlayer1Array = [],
		this.dominoesPlayer2Array = [],
		this.dominoPile = [],
		this.cursorDominoTile = null,
		this.top = null,
		this.left = null,
		this.mouseDown = false,
		this.mouseTarget = null,
		this.guide = ["000", "010", "101", "111", "202", "212", "222"],
		this.switchTurn = 'player1'
	}
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
	}

	start() {
		this.generateDominoesTiles()
		this.dealDominoes()
		this.appendTotheScreen()
		addListeners()
	}

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
	}

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
	}

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
	}

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
	}

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
	}
	
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
