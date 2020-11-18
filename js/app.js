//Domino Class
class Domino {
	constructor(){
		this.dominoTiles = {
			"66":{name:"Double Six", topValue:6, bottomValue:6, doubleValue:true},
			"65":{name:"6 by 5", topValue:6, bottomValue:5, doubleValue:false},
			"64":{name:"6 by 4", topValue:6, bottomValue:4, doubleValue:false},
			"63":{name:"6 by 3", topValue:6, bottomValue:3, doubleValue:false},
			"62":{name:"6 by 2", topValue:6, bottomValue:2, doubleValue:false},
			"61":{name:"6 by 1", topValue:6, bottomValue:1, doubleValue:false},
			"60":{name:"6 by 0", topValue:6, bottomValue:0, doubleValue:false},
			"55":{name:"Double Five", topValue:5, bottomValue:5, doubleValue:true},
			"54":{name:"5 by 4", topValue:5, bottomValue:4, doubleValue:false},
			"53":{name:"5 by 3", topValue:5, bottomValue:3, doubleValue:false},
			"52":{name:"5 by 2", topValue:5, bottomValue:2, doubleValue:false},
			"51":{name:"5 by 1", topValue:5, bottomValue:1, doubleValue:false},
			"50":{name:"5 by 0", topValue:5, bottomValue:0, doubleValue:false},
			"44":{name:"Double Four", topValue:4, bottomValue:4, doubleValue:true},
			"43":{name:"4 by 3", topValue:4, bottomValue:3, doubleValue:false},
			"42":{name:"4 by 2", topValue:4, bottomValue:2, doubleValue:false},
			"41":{name:"4 by 1", topValue:4, bottomValue:1, doubleValue:false},
			"40":{name:"4 by 0", topValue:4, bottomValue:0, doubleValue:false},
			"33":{name:"Double Three", topValue:3, bottomValue:3, doubleValue:true},
			"32":{name:"3 by 2", topValue:3, bottomValue:2, doubleValue:false},
			"31":{name:"3 by 1", topValue:3, bottomValue:1, doubleValue:false},
			"30":{name:"3 by 0", topValue:3, bottomValue:0, doubleValue:false},
			"22":{name:"Double Two", topValue:2, bottomValue:2, doubleValue:true},
			"21":{name:"2 by 1", topValue:2, bottomValue:1, doubleValue:false},
			"20":{name:"2 by 0", topValue:2, bottomValue:0, doubleValue:false},
			"11":{name:"Double One", topValue:1, bottomValue:1, doubleValue:true},
			"10":{name:"1 by 0", topValue:1, bottomValue:0, doubleValue:false},
			"00":{name:"Double Zero", topValue:0, bottomValue:0, doubleValue:true}
		}
	}
}

//game Object, all the moves and validaton of the games will be set here.
const game = {

	//declaring a few variabes to use inside of the game object.
	//cursoDominoTile is the domino the user ar dragging (mouse down)
	//cursorDominoTilelocTop is the top locatio of the domino on the screen
	//cursorDominoTilelocLeft is the Left locatio of the domino on the Scree
	//The same aplies to the domino snapped (mouse up && snapElement diferrent than 0)
	gameSet: null,
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
	cursorXposition: null,
	firstPlay: true,
	guide: ["000","010","101","111","202","212","222"],
	switchTurn: 'player1',
	generateDominoesTiles(){
		for (let i= 0; i <= 6; i++){
			for (let j= i; j <= 6; j++){
				
				const domino = document.createElement('div')
				domino.setAttribute('id', `id${j}${i}`)
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


				this.dominoesArray.push(domino)
			}
		}
	},
	startGame(){
		const newGame = new Domino()
		this.gameSet = newGame

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
	selectDominoTile(idName) {
		return this.gameSet.dominoTiles[idName]
	},
	playValidate(element){
		this.validPlay = this.checkMatch()
		if (!this.validPlay){	
			this.goBackToPreviousLoc(element,this.cursorDominoTilelocTop,this.cursorDominoTilelocLeft)
		}
	},
	checkMatch(){	
		if (this.cursorDominoTile.topValue === this.snappedDominoTile.topValue ||
			this.cursorDominoTile.topValue === this.snappedDominoTile.bottomValue||
			this.cursorDominoTile.bottomValue === this.snappedDominoTile.topValue ||
			this.cursorDominoTile.bottomValue === this.snappedDominoTile.bottomValue){
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
		if (e.key === "w"){
			game.switchSide(game.mouseTarget,"90")
		}
		if (e.key === "q"){
			game.switchSide(game.mouseTarget,"270")
		}
		
	}
})
document.querySelector("#image-start-game").addEventListener('click', ()=>game.startGame())

function addListeners() {
	// $(".dominoH , .dominoV ")
	// document.querySelectorAll('.dominoV, .dominoH').forEach(elem=>{
	document.querySelectorAll('.tile').forEach(elem=>{

		// make this element draggable
		elem.draggable=true

		
			
		//Mouse DOWN listener
		elem.addEventListener('mousedown',function(e) {
			game.mousedown = true
			game.mouseTarget = e.currentTarget
			game.cursorDominoTile = game.selectDominoTile(e.currentTarget.id)
			game.cursorDominoTilelocTop = e.currentTarget.top
			game.cursorDominoTilelocLeft = e.currentTarget.left
			
		})
	})

	//Mouse UP listener
	// .mouseup(function(event) {


	// 	// this line returns to me the x position of the cursor on the page
	// 	game.cursorXposition = event.originalEvent.pageX

	// 	game.mousedown = false
	// 	game.mouseTarget = null

	//     /* Pull out only the snap targets that are "snapping": */
	// 	const snappedArray = $(this).data('uiDraggable').snapElements
	//     const snappedTo = $.map(snappedArray, function(element) {
	//     	return element.snapping ? element.item : null //Conditional (ternary) operator
	//     })
	//     if (snappedTo.length !== 0){
	//     	game.snappedDominoTile = game.selectDominoTile($(snappedTo).attr('id'))
	// 		game.snappedDominoTilelocTop = $(this).css('top')
	// 		game.snappedDominoTilelocLeft = $(this).css('left')
	//         game.playValidate(this)
	//     }
	    
	//     // $( this ).draggable( "option", "snap", false)
	// })

	// $( "#gameBoard" )
	// .droppable()
	// .droppable({
	//   drop: function( event, ui ) {
	  	
	//   	// console.log(event)

	//   	//this line returns the Width size of my droppable area.
	//   	const droppableWidth = event.target.clientWidth
	  	

	//   	//this line returns the distance between the left side (0px) until the begining of the 
	//   	// #gameBoard border.
	//   	const margin = event.target.offsetLeft


	//   	if (game.validPlay || game.firstPlay){

	//   			// console.log(`margin : ${margin}`)
	//   			// console.log(`game.cursorXposition : ${game.cursorXposition}`)
	//   			// console.log(`droppableWidth : ${droppableWidth}`)
	//   			// console.log(`droppableWidth /2 : ${droppableWidth /2}`)
	//   			// console.log(`game.cursorXposition - margin : ${game.cursorXposition - margin}`)

	//   		if (game.cursorXposition - margin > (droppableWidth /2)){
	//   			$(ui.draggable).css('top','0px').css('left','0px').appendTo($('#gameBoard'))
	//   		}
	//   		else{
	//   			$(ui.draggable).css('top','0px').css('left','0px').prependTo($('#gameBoard'))	
	// 		}

	// 		game.changePlayer()
  
	//   	}

	//  	game.firstPlay = false
	//   }
	// })
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

