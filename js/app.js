//Tile Class
class tile{
	constructor(name,sideA,sideB){
		this.name = name,
		this.sideA = sideA,
		this.sideB = sideB,
		this.double = sideA === sideB
	}
}

// //Domino Class
// class Domino {
// 	constructor(){
// 		this.dominoes = []
// 	}
// }

//game Object, all the moves and validaton of the games will be set here.
const game = {

	//declaring a few variabes to use inside of the game object.
	//cursoDominoTile is the domino the user ar dragging (mouse down)
	//cursorDominoTilelocTop is the top locatio of the domino on the screen
	//cursorDominoTilelocLeft is the Left locatio of the domino on the Scree
	//The same aplies to the domino snapped (mouse up && snapElement diferrent than 0)
	dominoes: null,
	cursorDominoTile: null,
	cursorDominoTilelocTop: null,
	cursorDominoTilelocLeft: null,
	snappedDominoTile: null,
	snappedDominoTileLocTop: null,
	snappedDominoTileLocLeft: null,
	mouseDown: false,
	mouseTarget: null,
	dominoesArray: [],
	dominoesPlayer1Array: [],
	dominoesPlayer2Array: [],
	dominoPile: [],
	validPlay: false,
	guide: ["000","010","101","111","202","212","222"],
	switchTurn: 'player1',
	generateDominoesTiles(){
		for (let i= 0; i <= 6; i++){
			for (let j= i; j <= 6; j++){
				
				const domino = document.createElement('div')

				// domino.setAttribute('id', `id${j}${i}`)
				domino.dataset.tile = `id${j}${i}`
				
				domino.classList.add('dominoH')
				
				const sideA = document.createElement('div')
				sideA.classList.add('side-H')

				for (let x = 0; x < 3; x++){

					const div = document.createElement('div')
					div.classList.add('side-H-dot')
		 
					for (let y = 0; y < parseInt(this.guide[i][x]); y++){
						
						const dot = document.createElement('div')
						dot.classList.add('dot')
						div.appendChild(dot)
						
					}
					sideA.appendChild(div)
				}
				domino.appendChild(sideA)				

				const sideB = document.createElement('div')
				sideB.classList.add('side-H')

				for (let x = 0; x < 3; x++){

					const div = document.createElement('div')
					div.classList.add('side-H-dot')

					for (let y = 0; y < parseInt(this.guide[j][x]); y++){
						
						const dot = document.createElement('div')
						dot.classList.add('dot')
						div.appendChild(dot)
					}
					sideB.appendChild(div)
				}
				domino.appendChild(sideB)

				domino.classList.add('tile')

				this.dominoes.push(new tile(`id${j}${i}`,i,j))
				this.dominoesArray.push(domino)
			}
		}
		console.log(this.dominoes)
	},
	startGame(){

		// this.dominoes = new Domino()

		this.generateDominoesTiles()
		this.dealDominoes()
		this.appendTotheScreen()

		document.querySelector('#image-start-game').setAttribute('style', 'display: none')
		document.querySelector('#instruction').setAttribute('style', 'display: none')
		document.querySelector('#dominoPlayer2').setAttribute('style', 'background-color: gray')
		document.querySelector('#dominoPlayer2').childNodes.forEach(elem => elem.setAttribute('style', 'visibility: hidden'))



		// document.querySelectorAll('#dominoPlayer2 div').forEach(div=>{
		// 	div.setAttribute('style', 'visibility: hidden')
		// })

		addListeners()

	},	
	dealDominoes(){
		const getRandom = () => Math.floor(Math.random() * this.dominoesArray.length)
		for (let i = 0; i < 21; i+=1){
			if (i < 7){
				const indexPlayer1 = getRandom()
				this.dominoesPlayer1Array.push(this.dominoesArray[indexPlayer1])
				this.dominoesArray.splice(indexPlayer1,1)
				
				const indexPlayer2 = getRandom()
				this.dominoesPlayer2Array.push(this.dominoesArray[indexPlayer2])
				this.dominoesArray.splice(indexPlayer2,1)
			}
			else {
				const indexPile = getRandom()
				this.dominoPile.push(this.dominoesArray[indexPile])
				this.dominoesArray.splice(indexPile,1)
			}
		}
	},
	appendTotheScreen(){
		for (let i = 0; i < 7; i+=1){
			document.querySelector('#dominoPlayer1').appendChild(this.dominoesPlayer1Array[i])		
		}	
		for (let i = 0; i < 7; i+=1){	
			document.querySelector('#dominoPlayer2').appendChild(this.dominoesPlayer2Array[i])
		}	
		for (let i = 0; i < 14; i+=1){
			document.querySelector('#dominoPile').appendChild(this.dominoPile[i])
		}
		document.querySelector('#dominoPile').setAttribute('style', 'display: none')	
	},
	selectDominoTile(tile) {
		return this.dominoes.dominoes.find((tile)=>tile.name===tile)
	},

	// lets do this next
	playValidate(element){
		this.validPlay = this.checkMatch()
		if (!this.validPlay){	
			this.goBackToPreviousLoc(element,this.cursorDominoTilelocTop,this.cursorDominoTilelocLeft)
		}
	},
	checkMatch(){	
		if (this.cursorDominoTile.sideA === this.snappedDominoTile.sideA ||
			this.cursorDominoTile.sideA === this.snappedDominoTile.sideB||
			this.cursorDominoTile.sideB === this.snappedDominoTile.sideA ||
			this.cursorDominoTile.sideB === this.snappedDominoTile.sideB){
			return true
		}else{
			console.log("Match not Found")
			return false
		}
	},
	rotateTile(element){
		
		if (element.classList.contains('dominoH')){

			element.querySelectorAll('.side-H').forEach(elem=>{
				elem.classList.remove('side-H')
				elem.classList.add('side-V')
				
				elem.childNodes.forEach(elem2=>{
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

	},
	switchSide(element,angle){
		element.setAttribute('style', `transform: rotate(${angle}deg)`)
	},
	goBackToPreviousLoc(element,top,left){
		element.setAttribute('style', `top: ${top}`)
		element.setAttribute('style', `top: ${left}`)
	},
	dominoPurchase(id){
		const rand = Math.floor(Math.random() * this.dominoPile.length )
		if (id === 'player1DominoGrid'){
			document.querySelector('#dominoPlayer1').appendChild(this.dominoPile[rand])		
		}
		if (id === 'player2DominoGrid'){
			document.querySelector('#dominoPlayer2').appendChild(this.dominoPile[rand])
		}
		this.dominoPile.splice(rand,1)
		if (this.dominoPile.length === 0){
			document.querySelectorAll('.newDomino').forEach(elem=>{
				elem.setAttribute('style', 'background-color: rgb(197, 197, 197)')
			})
		}
	},
	changePlayer(){
		const player1 = document.querySelector('#dominoPlayer1')
		const player2 = document.querySelector('#dominoPlayer2')
		if (game.switchTurn ==="player1"){

			player1.setAttribute('style', 'background-color: gray')
			player1.childNodes.forEach(elem => elem.setAttribute('style', 'visibility: hidden'))
			
			player2.setAttribute('style', 'background-color: rgba(0, 0, 255, 0.5)')
			player2.childNodes.forEach(elem => elem.setAttribute('style', 'visibility: visible'))
			game.switchTurn = "player2"
		}
		else{

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
		if (e.key === "r"){
			game.rotateTile(game.mouseTarget)
		}
		if (e.key === "s"){
			game.switchSide(game.mouseTarget,"0")
		}
		if (e.key === "a"){
			game.switchSide(game.mouseTarget,"180")
		} 
	}
})
document.querySelector("#image-start-game").addEventListener('click', ()=>game.startGame())

function addListeners() {
	// document.querySelectorAll('.dominoV, .dominoH').forEach(elem=>{
	document.querySelectorAll('.tile').forEach(elem=>{

		// make this element draggable
		elem.draggable=true

		// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#draggableattribute
		elem.addEventListener('dragstart', (event) => {
			event.dataTransfer.setData('text/plain', 'This text may be dragged')
			// event.dataTransfer.effectAllowed = "copy";

		})
		
		//Mouse DOWN listener
		elem.addEventListener('mousedown',function(e) {
			console.log(e.currentTarget)
			game.mousedown = true
			game.mouseTarget = e.currentTarget
			game.cursorDominoTile = game.selectDominoTile(e.currentTarget.dataset.tile)
			game.cursorDominoTilelocTop = e.currentTarget.top
			game.cursorDominoTilelocLeft = e.currentTarget.left
			
		})
	})
	document.querySelector('#gameBoard').addEventListener('drop', (event) => {
		console.log(event)
		event.preventDefault()
		if (event.target.id == "gameBoard") {

			// this returns position of the cursor on the page (where I drop the tile)
			const cursorPosition = event.pageX
			// this returns the position of the beggining of the gameBoard
			const margin = event.target.offsetLeft
			// this returns the size (width) of the gameBoard
			const boardWidth = event.target.clientWidth

			console.log('cursorPosition ', cursorPosition)
			console.log('margin ', margin)
			console.log('boardWidth ', boardWidth)
			
			if (cursorPosition - margin > (boardWidth / 2)) {
	  			
				game.mouseTarget.parentNode.removeChild(game.mouseTarget);
				event.target.appendChild(game.mouseTarget);
			}
			else{
				
				game.mouseTarget.parentNode.removeChild(game.mouseTarget);
				event.target.insertBefore(game.mouseTarget, event.target.querySelector('.tile'))
				
			}
		}
		game.changePlayer()
	})

	function _func(e) {
		if (game.dominoPile.length > 0) game.dominoPurchase(e.target.id)
		else e.target.removeEventListener('click', _func)
	}
	document.querySelectorAll('.newDomino').forEach(elem=>{
		elem.addEventListener('click', _func)	
	})
	document.querySelectorAll('.passTurn').forEach(elem=>{
		elem.addEventListener('click', game.changePlayer)
	})
	
}
game.startGame()
// debug listenter
// document.addEventListener('click', e => console.log(e.target))

