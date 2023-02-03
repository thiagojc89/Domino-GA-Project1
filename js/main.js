const game = new Game

function openWinnerModal(){
	document.querySelector("#winner-modal span").innerText = game.playerTurn
	document.querySelector("#winner-modal").setAttribute('style', 'display: flex')
	document.querySelector("#new-game").setAttribute('style', 'display: flex')
}