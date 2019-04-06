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


const game = {
	gameSet: null,

	startGame(){
		const newGame = new Domino();
		this.gameSet = newGame;

	}	
	// selectDomino(idName){
	// 	console.log(dominoTiles[idName]);
	// }
	// suffleDomino(){
	// }
}

game.startGame()


























/*for (let i = 0; i < 7; i++){
	for (let j = i; j < 7; j++)
		console.log(i,j);

	// const
}
*/
$( ".domino" ).draggable();
// $( ".domino" ).draggable( "option", "snapMode", "outer");
// $( "#65" ).css("transform", "rotate(90deg)");
// $( "#54" ).css("transform", "rotate(90deg)");

$(".domino")
.mouseup(function() {
	console.log("mouse up");
    $( this ).draggable( "option", "snap", false);

})
.mousedown(function() {
	console.log("mouse down");
	console.log($(this));
    $( this ).draggable( "option", "snap", false);
    $( this ).draggable( "option", "snapMode", "outer");
    console.log("mouse down");
});

$(".domino").draggable({
    // snap: ".domino",
    stop: function(event, ui) { 
        /* Get the possible snap targets: */
        var snapped = $(this).data('uiDraggable').snapElements;
       	console.log(snapped);
        /* Pull out only the snap targets that are "snapping": */
        var snappedTo = $.map(snapped, function(element) {
            return element.snapping ? element.item : null;


            //Conditional (ternary) operator
        });

        console.log(snappedTo);
       
        
    }
});



