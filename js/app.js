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
	generateDominoesTiles(){
		for (let i= 0 ;i <= 6; i++){
			for (let j= i ;j <= 6; j++){
				
				
				const $div1 = $('<div/>').attr('id',`${j}${i}`).attr('class', 'dominoV');
				const $div2A = $('<div/>').attr('class','side-V');

				for (let x = 0; x < 3; x++){

					const $div3 = $('<div/>').attr('class','side-V-dot');
		 
					for (let y = 0; y < parseInt(this.guide[i][x]); y++){
						
						$('<div/>').attr('class','dot').appendTo($div3);
						
					}
					$div3.appendTo($div2A);
				}
				$div2A.appendTo($div1);

				const $div2B = $('<div/>').attr('class','side-V');
				for (let x = 0; x < 3; x++){

					const $div3 = $('<div/>').attr('class','side-V-dot');

					for (let y = 0; y < parseInt(this.guide[j][x]); y++){
						
						$('<div/>').attr('class','dot').appendTo($div3);
					}
					$div3.appendTo($div2B);
				}
				$div2B.appendTo($div1);

				this.dominoesArray.push($div1);
			}
		}
	},
	startGame(){
		const newGame = new Domino();
		this.gameSet = newGame;

		this.generateDominoesTiles();
		this.dealDominoes();
		this.appendTotheScreen();
		$('#image-start-game').hide()

		addListeners()

	},	
	dealDominoes(){

		for (let i = 0; i < 7; i+=1){
			const rand = Math.floor(Math.random() * this.dominoesArray.length )
			this.dominoesPlayer1Array.push(this.dominoesArray[rand])
			this.dominoesArray.splice(rand,1)

		}
		
		for (let i = 0; i < 7; i+=1){
			const rand = Math.floor(Math.random() * this.dominoesArray.length )
			this.dominoesPlayer2Array.push(this.dominoesArray[rand])
			this.dominoesArray.splice(rand,1)

		}
		
		for (let i = 0; i < 14; i+=1){
			const rand = Math.floor(Math.random() * this.dominoesArray.length )
			this.dominoPile.push(this.dominoesArray[rand])
			this.dominoesArray.splice(rand,1)

		}	
	},
	appendTotheScreen(){
		for (let i = 0; i < 7; i+=1){
			
			$('#dominoPlayer1').append(this.dominoesPlayer1Array[i])
			

		}
		
		for (let i = 0; i < 7; i+=1){
			
			
			$('#dominoPlayer2').append(this.dominoesPlayer2Array[i])

		}

		for (let i = 0; i < 14; i+=1){
			
			
			$('#dominoPile').append(this.dominoPile[i])

		}
	},
	selectDominoTile(idName) {

		return this.gameSet.dominoTiles[idName];
	},
	playValidate(element){
		this.validPlay = this.checkMatch();
		if (this.validPlay){
			console.log("this is a valid play match");
		}else{

			this.goBackToPreviousLoc(element,this.cursorDominoTilelocTop,this.cursorDominoTilelocLeft);
		}
	},
	checkMatch(){
		
		if (this.cursorDominoTile.topValue === this.snappedDominoTile.topValue ||
			this.cursorDominoTile.topValue === this.snappedDominoTile.bottomValue||
			this.cursorDominoTile.bottomValue === this.snappedDominoTile.topValue ||
			this.cursorDominoTile.bottomValue === this.snappedDominoTile.bottomValue){

			console.log("found a Match");
			return true;
		}else{
			console.log("Match not Found");
			return false;
		}
	},
	rotateTile(element){
		
		const $idElement = $(element).attr('id');
		const $classElement = $(element).attr('class');
		

		if ($classElement === "dominoH ui-draggable ui-draggable-handle"){

			$(`#${$idElement} .side-H .side-H-dot`).attr('class', 'side-V-dot')
			$(`#${$idElement} .side-H`).attr('class', 'side-V')
			$(`#${$idElement}`).attr('class', 'dominoV ui-draggable ui-draggable-handle')

		}
		if ($classElement === "dominoV ui-draggable ui-draggable-handle"){

			$(`#${$idElement} .side-V .side-V-dot`).attr('class', 'side-H-dot')
			$(`#${$idElement} .side-V`).attr('class', 'side-H')
			$(`#${$idElement}`).attr('class', 'dominoH ui-draggable ui-draggable-handle')
		}
	},
	switchSide(element,angle){
		

		$($(element)).css('transform', 'rotate('+angle+'deg)')

	},
	goBackToPreviousLoc(element,top,left){
		$(element).css('top',top)
		$(element).css('left',left);

	},
	dominoPurchase(id){
		const rand = Math.floor(Math.random() * this.dominoPile.length )

		console.log(id);

		console.log(this.dominoPile[rand]);

		if (id === 'player1DominoGrid'){

			this.dominoPile[rand].appendTo($('#dominoPlayer1'));
		}
		if (id === 'player2DominoGrid'){
			this.dominoPile[rand].appendTo($('#dominoPlayer2'));
		}

		this.dominoPile.splice(rand,1);
		if (this.dominoPile.length === 0){
			$('.newDomino').off('click')
			$('.newDomino').css('background-color','rgb(197, 197, 197)');
		}

	}
}	



// game.startGame();

// listeners


$('body').on('keypress',function(e)  {
	
	if (game.mousedown) {
		if (e.key === "r"){
			game.rotateTile(game.mouseTarget);
		}
		if (e.key === "s"){
			game.switchSide(game.mouseTarget,"0")
		}
		if (e.key === "a"){
			game.switchSide(game.mouseTarget,"180")
		}
		
	};
})
$('#image-start-game').on('click',(e) => {

	game.startGame();	


});

function addListeners() {
	// draggble and snap JQUERY UI
	$(".dominoH , .dominoV ")
	.draggable()
	.draggable("option", "snap", true )
	.draggable("option", "snapMode", "outer")
	.draggable(
	   { refreshPositions: true }
	)


	//Mouse DOWN listener
	.mousedown(function() {

		console.log(this);
		game.mousedown = true;
		game.mouseTarget = this;
	    game.cursorDominoTile = game.selectDominoTile($(this).attr('id'))
		game.cursorDominoTilelocTop = $(this).css('top');
		game.cursorDominoTilelocLeft = $(this).css('left');
	    //game.rotateTile(this);

	})

	//Mouse UP listener
	.mouseup(function(event) {


		// this line returns to me the x position of the cursor on the page
		
		game.cursorXposition = event.originalEvent.pageX;

		game.mousedown = false;
		game.mouseTarget = null;

	    /* Pull out only the snap targets that are "snapping": */
		const snappedArray = $(this).data('uiDraggable').snapElements;
	    const snappedTo = $.map(snappedArray, function(element) {
	    	return element.snapping ? element.item : null; //Conditional (ternary) operator
	    });
	    if (snappedTo.length !== 0){
	    	game.snappedDominoTile = game.selectDominoTile($(snappedTo).attr('id'))
			game.snappedDominoTilelocTop = $(this).css('top');
			game.snappedDominoTilelocLeft = $(this).css('left');
	        game.playValidate(this);
	    }
	    
	    // $( this ).draggable( "option", "snap", false);
	});

	$( "#gameBoard" )
	.droppable()
	.droppable({
	  drop: function( event, ui ) {
	  	
	  	// console.log(event);

	  	//this line returns the Width size of my droppable area.
	  	const droppableWidth = event.target.clientWidth;
	  	

	  	//this line returns the distance between the left side (0px) until the begining of the 
	  	// #gameBoard border.
	  	const margin = event.target.offsetLeft;


	  	if (game.validPlay || game.firstPlay){

	  			console.log(`margin : ${margin}`);
	  			console.log(`game.cursorXposition : ${game.cursorXposition}`);
	  			console.log(`droppableWidth : ${droppableWidth}`);
	  			console.log(`droppableWidth /2 : ${droppableWidth /2}`);
	  			console.log(`game.cursorXposition - margin : ${game.cursorXposition - margin}`);

	  		if (game.cursorXposition - margin > (droppableWidth /2)){
	  			$(ui.draggable).css('top','0px').css('left','0px').appendTo($('#gameBoard'));
	  		}
	  		else{
	  			$(ui.draggable).css('top','0px').css('left','0px').prependTo($('#gameBoard'));	

	  		}
	  	}

	 	game.firstPlay = false;
	  }
	});

	$('#player1DominoGrid , #player2DominoGrid').on('click',(e) =>{

			
			game.dominoPurchase(e.target.id)
	}) 

}






// debug listenter
let $it;
$(document).on('click', (e) => {
  $it = $(e.target);
});

