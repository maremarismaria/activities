
$().ready(function(){
    
    var numRows = 3;
    var numCols = 4;
    makeScenario(numRows, numCols);


    //scenario properties
    var scenarioPosition = $('#scenario').position();
    var scenarioWidth = $('#scenario').width();
    var scenarioHeight = $('#scenario').height();

    //ball properties
    var ballMovement = 21;
    var ballPosition = $('#ball').position();
    var ballWidth = $('#ball').width();
    var ballHeight = $('#ball').height();
    var ballX = $('#scenario').width() / 2;
    var ballY = $('#scenario').height() - 20;
    var movX = 1;
    var movY = -1;
    
    //paddle properties
    var paddlePosition = $('#paddle').position();
    var paddleHeight = $('#paddle').height();
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
    
    var columns = document.getElementsByClassName('column');

    for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        var columnId = "#" + column.id;
        var columnX = $(columnId).position().left;
        var columnY = $(columnId).position().top;
        var columnWidth = $(columnId).width();
        var columnHeight = $(columnId).height();
        console.log(columnX + " - " + columnY + " / " + columnHeight + " - " + columnWidth);
    }


    setInterval(function(){

        $('#ball').css( { "left" : ballX , "top" : ballY } );

        if (ballX + movX > $('#scenario').width() - ballWidth){
            $('#ball').css( { "background-color" : "red" } );
            movX = -movX;
        }

        if(ballX + movX < 0){
            $('#ball').css( { "background-color" : "green" } );
            movX = -movX;
        }

        if (ballY + movY > $('#scenario').height() - ballWidth){
            $('#ball').css( { "background-color" : "blue" } );
            console.log("GAME OVER");
            movY = -movY;
        }

        if (ballY + movY > $('#scenario').height() - ballWidth - paddleHeight){
            alert("ay");
        }

        if(ballY + movY < ballWidth){
            $('#ball').css( { "background-color" : "red" } );
            movY = -movY;
        }

        ballX += movX;
        ballY += movY;
            
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

}