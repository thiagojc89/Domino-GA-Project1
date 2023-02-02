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
		this.playerTurn = 'player1'
	}
	
	start() {
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
		switch (true) {
			case element1.sideA[0] === element2.sideA[0] && element2.sideA[1]:
				element1.sideA[1] = false
				element2.sideA[1] = false
				return [true, 'AA']
			case element1.sideA[0] === element2.sideB[0] && element2.sideB[1]:
				element1.sideA[1] = false
				element2.sideB[1] = false
				return [true, 'AB']
			case element1.sideB[0] === element2.sideA[0] && element2.sideA[1]:
				element1.sideB[1] = false
				element2.sideA[1] = false
				return [true, 'BA']
			case element1.sideB[0] === element2.sideB[0] && element2.sideB[1]:
				element1.sideB[1] = false
				element2.sideB[1] = false
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
		if (game.playerTurn === "player1") {

			player1.setAttribute('style', 'background-color: gray')
			player1.childNodes.forEach(elem => elem.setAttribute('style', 'visibility: hidden'))

			player2.setAttribute('style', 'background-color: rgba(0, 0, 255, 0.5)')
			player2.childNodes.forEach(elem => elem.setAttribute('style', 'visibility: visible'))
			game.playerTurn = "player2"
		}
		else {

			player2.setAttribute('style', 'background-color: gray')
			player2.childNodes.forEach(elem => elem.setAttribute('style', 'visibility: hidden'))

			player1.setAttribute('style', 'background-color: rgba(255, 0, 0, 0.5)')
			player1.childNodes.forEach(elem => elem.setAttribute('style', 'visibility: visible'))
			game.playerTurn = "player1"
		}

	}
	removeTileFromPlayer(){
		if (this.playerTurn === "player1"){
			const idx = this.dominoesPlayer1Array.findIndex(tile => tile.name === this.cursorDominoTile.name)
			this.dominoesPlayer1Array.splice(idx,1)
		}
		else{
			const idx = this.dominoesPlayer2Array.findIndex(tile => tile.name === this.cursorDominoTile.name)
			this.dominoesPlayer2Array.splice(idx,1)
		}
	}

	checkWinner(){
		return this.dominoesPlayer1Array.length > 0 && this.dominoesPlayer2Array.length > 0 ? false : true
	}
}









