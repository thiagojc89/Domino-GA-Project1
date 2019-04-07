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

	startGame(){
		const newGame = new Domino();
		this.gameSet = newGame;

	},	
	selectDominoTile(idName) {

		return this.gameSet.dominoTiles[idName];
	},
	playValidate(element){
		const validePlay = this.checkMatch();
		if (validePlay){
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
		console.log($(element));
		const $idElement = $(element).attr('id');
		const $classElement = $(element).attr('class');
		console.log($classElement);

		if ($classElement === "dominoH ui-draggable ui-draggable-handle"){
			console.log($idElement);
			console.log($(`#${$idElement} .side-H`).attr('class'));

			$(`#${$idElement} .side-H .side-H-dot`).attr('class', 'side-V-dot')
			$(`#${$idElement} .side-H`).attr('class', 'side-V')
			$(`#${$idElement}`).attr('class', 'dominoV ui-draggable ui-draggable-handle')

		}
		if ($classElement === "dominoV ui-draggable ui-draggable-handle"){
			console.log($(`#${$idElement} .side-H`).attr('class'));

			$(`#${$idElement} .side-V .side-V-dot`).attr('class', 'side-H-dot')
			$(`#${$idElement} .side-V`).attr('class', 'side-H')
			$(`#${$idElement}`).attr('class', 'dominoH ui-draggable ui-draggable-handle')
		}
	},
	goBackToPreviousLoc(element,top,left){
		$(element).css('top',top)
		$(element).css('left',left);

	}
}	
	// suffleDomino(){
	// }


game.startGame()

/*for (let i = 0; i < 7; i++){
	for (let j = i; j < 7; j++)
		console.log(i,j);

	// const
}
*/
// $( ".domino" ).draggable( "option", "snapMode", "outer");
// $( "#65" ).css("transform", "rotate(270deg)");
// $( "#54" ).css("transform", "rotate(270deg)");
// $(".dominoV" )
// .draggable()
// .draggable("option", "snap", true )
// .draggable("option", "snapMode", "outer")
// .draggable( "option", "revert", "valid" )



$(".dominoH , .dominoV" )
.draggable()
.draggable("option", "snap", true )
.draggable("option", "snapMode", "outer")
.mousedown(function() {


    game.cursorDominoTile = game.selectDominoTile($(this).attr('id'))	
	game.cursorDominoTilelocTop = $(this).css('top');
	game.cursorDominoTilelocLeft = $(this).css('left');
	
    // $(this).draggable( "option", "snap", true);
    // $(this).draggable( "option", "snapMode", "outer");
    // console.log($(this).css('left'));
    // console.log($(this).css('top'));
    game.rotateTile(this);

})

.mouseup(function() {

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




