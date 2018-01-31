
$(document).ready(function(){
    
    var numRows = 3;
    var numCols = 4;
    var ballMovement = 0;
    var paddleMovement = 0;

    makeScenario(numRows, numCols);     

    setInterval(function(){

        $(document).keydown(function(event){
            if(event.keyCode == 37){ //<-
                paddleMovement -= 10;
                document.getElementById('paddle').style.left = paddleMovement + "px";
            }
    
            if(event.keyCode == 39){ //->
                paddleMovement += 10;
                document.getElementById('paddle').style.left = paddleMovement + "px";
            }
        });

        ballMovement += 10;
        document.getElementById('ball').style.bottom = ballMovement + "px";

    }, 5000);

});



function makeScenario(numRows, numCols){
    
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