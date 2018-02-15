
$().ready(function(){
    
    var level = [
        [{life: 0},{life: 0},{life: 1},{life: 0}], //this line with life: 0 means empty space
        [{life: 1},{life: 1},{life: 1},{life: 1}],
        [{life: 2},{life: 2},{life: 2},{life: 2}],
        [{life: 3},{life: 3},{life: 0},{life: 3}],
    ];

    makeScenario(level);

    //scenario properties
    var scenario = ($('#scenario').get(0)).getBoundingClientRect();
    
    //paddle properties
    var paddle = ($('#paddle').get(0)).getBoundingClientRect();
    paddle.x = scenario.right / 2;
    paddle.y = scenario.bottom - paddle.height;
    $('#paddle').css( {"left" : paddle.x} );
    $('#paddle').css( {"top" : paddle.y} );

    //paddle movement
    $(document).on('keydown', function(event){           
        if(event.which == 37){ //<-
            if(paddle.x > scenario.left){
                paddle.x -= 10;
                $('#paddle').css( {"left" : paddle.x} );
            }
        }

        if(event.which == 39){ //->
            if(paddle.x + paddle.width < scenario.right){
                paddle.x += 10;
                $('#paddle').css( {"left" : paddle.x} );
            }
        }
    });

    //ball properties
    var ball = ($('#ball').get(0)).getBoundingClientRect();
    ball.x = scenario.right / 2;
    ball.y = scenario.bottom - (ball.width + paddle.height);
    $('#ball').css( {"left" : ball.x} );
    $('#ball').css( {"top" : ball.y} );
    var movX = 1;
    var movY = -1;


    setInterval(function(){
        
        $('#ball').css( { "left" : ball.x , "top" : ball.y } );
        
        //top
        if(ball.y < scenario.top){ 
            $('#ball').css( { "background-image" : "url('assets/mario.png')" } );
            movY = -movY;
        }

        //bottom
        if (ball.y > scenario.bottom - ball.width){ 
            $('#ball').css( { "background-image" : "url('assets/mario-dead.png')" } );
            //console.log("GAME OVER");
            movY = -movY;
        }

        //left
        if(ball.x < scenario.left){
            $('#ball').css( { "background-image" : "url('assets/mario.png')" } ); 
            movX = -movX;
        }

        //right
        if (ball.x > scenario.right - ball.width){ 
            $('#ball').css( { "background-image" : "url('assets/mario.png')" } );
            movX = -movX;
        }

        //paddle colission
        if ((ball.bottom > paddle.top && 
            ball.top < paddle.bottom) && 
            (ball.right > paddle.left && 
            ball.left < paddle.right)){ 

            $('#ball').css( { "background-image" : "url('assets/mario-paddle.png')" } );
            
            ball.x += movX;
            movY = -movY;
        }

        //column colission
        $('.row').each(function(){
            $(this).children('.column').each(function(){

                var column = this.getBoundingClientRect();
                var life = $(this).attr("data-life");

                if(life != "0"){
                    
                    if((ball.bottom > column.top && 
                        ball.top < column.bottom) && 
                        (ball.right > column.left && 
                        ball.left < column.right)){ 
                        
                        $(this).css( { "visibility" : "hidden" } );
                        $('#ball').css( { "background-image" : "url('assets/mario-brick.png')" } );

                        movX = -movX;
                        movY = -movY;
                            
                    }
                }
            });         
        });
        
        ball.x += movX;
        ball.y += movY;
            
    }, 6);

});



function makeScenario(level){
    
    for (var i = 0; i < level.length; i++) {
        var currentRow = 'row-' + i;

        $('#scenario').append("<div class='row' id=" + currentRow + ">");
        
        for (var j = 0; j < level[i].length; j++) {

            var currentCol = 'col-' + j;

            if(level[i][j].life == 0){
                $('#' + currentRow).append("<div class='column' id=" + currentCol + " data-life=" + level[i][j].life + " style='visibility:hidden;'>");
            }else{
                $('#' + currentRow).append("<div class='column' id=" + currentCol + " data-life=" + level[i][j].life + ">");
            }           

        }        
    }

    $('#scenario').append("<div id='ball'>");
    $('#scenario').append("<div id='paddle'>");

}