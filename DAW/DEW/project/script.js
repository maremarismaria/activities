
$(document).ready(function(){

    var numRows = 3;
    var numCols = 3;
    

    for (var i = 0; i < numRows; i++) {
        var currentRow = 'row-' + i;
        $('#scenario').append("<div class='row' id=" + currentRow + ">");
        
        for (var j = 0; j < numCols; j++) {

            var currentCol = 'col-' + j;
            var life = Math.floor((Math.random() * 3) + 1);
            $('#' + currentRow).append("<div class='column' id=" + currentCol + " data-life=" + life + ">");

        }
        
    }



});

