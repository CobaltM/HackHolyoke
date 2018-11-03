var PointCalibrate = 0;
var CalibrationPoints={};

/**
 * Clear the canvas and the calibration button.
 */
function ClearCanvas(){
  $(".Calibration").hide();
  var canvas = document.getElementById("plotting_canvas");
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Show the instruction of using calibration at the start up screen.
 */
function PopUpInstruction(){
  ClearCanvas();
  swal({
    title:"Calibration",
    text: "Please click on each of the 9 points on the screen. You must click on each point 5 times till it goes yellow. This will calibrate your eye movements.",
    buttons:{
      cancel: false,
      confirm: true
    }
  }).then(isConfirm => {
    ShowCalibrationPoint();
  });

}
/**
  * Show the help instructions right at the start.
  */
function helpModalShow() {
    $('#helpModal').modal('show');
}

/**
 * Load this function when the index page starts.
* This function listens for button clicks on the html page
* checks that all buttons have been clicked 5 times each, and then goes on to measuring the precision
*/
$(document).ready(function(){
  ClearCanvas();
  helpModalShow();

      var canvas = document.getElementById("plotting_canvas");
      var context =  canvas.getContext("2d");
      console.log("help");
      $(document).keydown(function(e){
        if(e.keyCode == 32){
        console.log("me");
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
              
        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
      }
      });
      function drawOnLife(){
        
        if(paint){
          console.log(currentX, currentY, true)
          addClick(currentX, currentY, true);
          redraw();
        }
        setTimeout(drawOnLife,10)
      }
      drawOnLife();
      
      //setInterval(function(){drawOnLife(currentX,currentY);},10);
      
      /*$('#plotting_canvas').mousemove(function(e){
        if(paint){
          addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
          redraw();
        }
      });*/
      
      
  
      $(document).keyup(function(e){
        if(e.keyCode == 32){
          paint = false;
        }
      });
      var clickX = new Array();
      var clickY = new Array();
      var clickDrag = new Array();
      var paint;

      function addClick(x, y, dragging)
      {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
      }
      function redraw(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        
        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;
                  
        for(var i=0; i < clickX.length; i++) {        
          context.beginPath();
          if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
           }else{
             context.moveTo(clickX[i]-1, clickY[i]);
           }
           context.lineTo(clickX[i], clickY[i]);
           context.closePath();
           context.stroke();
        }
      }
     
});



// sleep function because java doesn't have one, sourced from http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
