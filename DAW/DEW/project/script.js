
$().ready(function(){
    
    var numRows = 3;
    var numCols = 4;
    makeScenario(numRows, numCols);


    //scenario properties
    var scenarioPosition = $('#scenario').position();
    var scenarioWidth = $('#scenario').width();

    //ball properties
    var ballMovement = 21;
    var ballPosition = $('#ball').position();
    
    //paddle properties
    var paddlePosition = $('#paddle').position();
    var paddleWidth = $('#paddle').width();

    //paddle movement
    $(document).on('keydown', function(event){           
        if(event.which == 37){ //<-
            $('#paddle').css( {"left" : "-=10"} );
        }

        if(event.which == 39){ //->
            $('#paddle').css( {"left" : "+=10"} );
        }
    });

    setInterval(function(){

    }, 3);

});



function makeScenario(numRows, numCols){
    
    //add stage

    for (var i = 0; i < numRows; i++) {
        var currentRow = 'row-' + i;
        $('#scenario').append("<div class='row' id=" + currentRow + ">");
        
        for (var j = 0; j < numCols; j++) {

            var currentCol = 'col-' + j;
            var life = Math.floor((Math.random() * 3) + 1);
            $('#' + currentRow).append("<div class='column' id=" + currentCol + " data-life=" + life + ">" + life + "</div>");
        }        
    }

    $('#scenario').append("<div class= 'ball' id='ball'>");
    $('#scenario').append("<div class='paddle' id='paddle'>");

    $('#ball').css( { "bottom" : "20" } );

}