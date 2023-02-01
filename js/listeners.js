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
document.querySelector("#image-start-game").addEventListener('click', () => {
	document.querySelector('#image-start-game').setAttribute('style', 'display: none')
	document.querySelector('#instruction').setAttribute('style', 'display: none')
	document.querySelector('#dominoPlayer2').setAttribute('style', 'background-color: gray')

	game.start()
	document.querySelector('#dominoPlayer2').childNodes.forEach(elem => elem.setAttribute('style', 'visibility: hidden'))
})

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
// game.start()
// debug listenter
// document.addEventListener('click', e => console.log(e.target))

