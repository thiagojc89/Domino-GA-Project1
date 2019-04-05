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
	console.log($(this));
    $( this ).draggable( "option", "snap", false);
    console.log("mouse up");
})
.mousedown(function() {
	console.log("mouse down");
	console.log($(this));
    $( this ).draggable( "option", "snap", true);
    $( this ).draggable( "option", "snapMode", "outer");
    console.log("mouse down");
});






$(".domino").draggable({
    snap: ".domino",
    stop: function(event, ui) { 
        /* Get the possible snap targets: */
        var snapped = $(this).data('uiDraggable').snapElements;
       	console.log(snapped);
        /* Pull out only the snap targets that are "snapping": */
        var snappedTo = $.map(snapped, function(element) {
            return element.snapping ? element.item : null;
        });
        
        console.log(snappedTo);
       
        
    }
});



