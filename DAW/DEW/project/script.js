
$().ready(function(){
    
    var level = [
        [{life: 0},{life: 0},{life: 0},{life: 0}], //this line with life: 0 means empty space
        [{life: 1},{life: 1},{life: 1},{life: 1}],
        [{life: 2},{life: 2},{life: 2},{life: 2}],
        [{life: 3},{life: 3},{life: 3},{life: 3}],
    ];

    makeScenario(level);

    //scenario properties
    var scenarioWidth = $('#scenario').width();
    var scenarioHeight = $('#scenario').height();

    //ball properties
    var ballWidth = $('#ball').width();
    var ballX = scenarioWidth / 2;
    var ballY = scenarioHeight - (ballWidth * 2);
    var movX = 1;
    var movY = -1;
    
    //paddle properties
    var paddleHeight = $('#paddle').height();
    var paddleWidth = $('#paddle').width();
    var paddleX = scenarioWidth / 2;
    var paddleY = scenarioHeight;
    $('#paddle').css( {"left" : paddleX} );

    //paddle movement
    $(document).on('keydown', function(event){           
        if(event.which == 37){ //<-
            paddleX -= 10;
            $('#paddle').css( {"left" : paddleX} );
        }

        if(event.which == 39){ //->
            paddleX += 10;
            $('#paddle').css( {"left" : paddleX} );
        }
    });

    setInterval(function(){

        $('#ball').css( { "left" : ballX , "top" : ballY } );

        //top
        if(ballY < 0){ 
            $('#ball').css( { "background-image" : "url('assets/mario.png')" } );
            movY = -movY;
        }

        //bottom
        if (ballY > scenarioHeight - ballWidth){ 
            
            $('#ball').css( { "background-image" : "url('assets/mario-dead.png')" } );
            console.log("GAME OVER");
            movY = -movY;
        }

        //left
        if(ballX < 0){
            $('#ball').css( { "background-image" : "url('assets/mario.png')" } ); 
            movX = -movX;
        }

        //right
        if (ballX > scenarioWidth - ballWidth){ 
            $('#ball').css( { "background-image" : "url('assets/mario.png')" } );
            movX = -movX;
        }

        //paddle colission
        if (ballX > paddleX && ballX < paddleX + paddleWidth && ballY == scenarioHeight - paddleHeight - ballWidth){ 
            //$('#ball').css( { "background-color" : "blue" } );
            $('#ball').css( { "background-image" : "url('assets/mario-paddle.png')" } );
            movY = -movY;
        }
        
        //column colission
        $('.row').each(function() {

            var row = this.getBoundingClientRect(); 
            
            if(ballX + ballWidth > row.x && ballY + ballWidth < row.y){
                console.log("hey");

                movY = -movY;

                $(this).children('.column').each(function(){

                    var column = this.getBoundingClientRect();
                    
                    if(ballX > column.left && ballX < column.right){
                            
                    }
                    
                });

            }

        });

        ballX += movX;
        ballY += movY;
            
    }, 3);

});



function makeScenario(level){
    
    for (var i = 0; i < level.length; i++) {
        var currentRow = 'row-' + i;

        $('#scenario').append("<div class='row' id=" + currentRow + ">");
        
        for (var j = 0; j < level[i].length; j++) {

            var currentCol = 'col-' + j;

            $('#' + currentRow).append("<div class='column' id=" + currentCol + " data-life=" + level[i][j].life + ">");
            
        }        
    }

    $('#scenario').append("<div class= 'ball' id='ball'>");
    $('#scenario').append("<div class='paddle' id='paddle'>");

}