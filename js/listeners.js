// listeners
document.querySelector("#image-start-game").addEventListener('click', startGame)
document.querySelector("#new-game").addEventListener("click", startNewGame)
document.querySelectorAll('.newDomino')
	.forEach(elem => elem.addEventListener('click', getDominoFromPurchasePile))
document.querySelectorAll('.passTurn')
	.forEach(elem => elem.addEventListener('click', game.changePlayer))
document.querySelector('#gameBoard').addEventListener('drop', dropTile)

function dropTile(event)	{
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
				game.removeTileFromPlayer()
			}
		}
		// verify which side to append or preppend tile
		else if (cursorPosition - margin > (boardWidth / 2)) {
			// need to check first if I can append here
			const tilePlayed = game.dominoes.find(tile => tile.name === game.mouseTarget.dataset.tile)
			const tileAtTheTable = game.dominoes.find(tile => tile.name === event.target.lastChild.dataset.tile)
			const [foundMatch, match] = game.checkMatch(tilePlayed, tileAtTheTable)

			if (foundMatch) {
				game.mouseTarget.parentNode.removeChild(game.mouseTarget);
				event.target.appendChild(game.mouseTarget);
				
				tilePlayed.boardSide = 'right'
				if (!tilePlayed.double) game.fixRotation(tilePlayed, "R-"+match)
				game.removeTileFromPlayer()
			}
		}
		else {
			const tilePlayed = game.dominoes.find(tile => tile.name === game.mouseTarget.dataset.tile)
			const tileAtTheTable = game.dominoes.find(tile => tile.name === event.target.querySelector('.tile').dataset.tile)
			const [foundMatch, match] = game.checkMatch(tilePlayed, tileAtTheTable)

			if (foundMatch) {
				game.mouseTarget.parentNode.removeChild(game.mouseTarget);
				event.target.insertBefore(game.mouseTarget, event.target.querySelector('.tile'))

				tilePlayed.boardSide = 'left'
				if (!tilePlayed.double) game.fixRotation(tilePlayed, "L-"+match)
				game.removeTileFromPlayer()
			}
		}
		const winnerFound = game.checkWinner()
		if (winnerFound) {
			game.endGame()
		}
		else{
			game.changePlayer()		
		}
	}
}

function startGame(){
	document.querySelector('#image-start-game').setAttribute('style', 'display: none')
	document.querySelector('#instruction').setAttribute('style', 'display: none')
	document.querySelector('#dominoPlayer2').setAttribute('style', 'background-color: gray')

	game.start()
	document.querySelector('#dominoPlayer2').childNodes.forEach(elem => elem.setAttribute('style', 'visibility: hidden'))
}

function startNewGame(){
	document.querySelector("#winner-modal").setAttribute('style', 'display: none')
	document.querySelector("#new-game").setAttribute('style', 'display: none')
	game.resetState()
	game.start()
	document.querySelectorAll('#dominoPlayer2 > .tile').forEach(elem => elem.setAttribute('style', 'visibility: hidden'))
}

function getDominoFromPurchasePile(e) {
	if (game.dominoPile.length > 0){
		game.dominoPurchase(e.target.id)
	} 
	else{
		e.target.removeEventListener('click', getDominoFromPurchasePile)
	} 
}



