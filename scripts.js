/*
  TODO: -Allow user to switch between hover and click mode ✔
        -Implement user selected colors
        -Implement eraser
        -Allow user to toggle borders
        -Allow user to dynamically alter grid size
        -Implement random color changes / incremental opacity increases


*/


var mouseDown = false;

function generateGrid(numberX) {
  size = $('#sketchbox').width() / numberX + 1;
  var numberY = Math.ceil($('#sketchbox').height() / (size - 1));
  console.log(size);
  console.log(numberY);

  var divsToInsert = [];

  for(var i = 0; i < numberY * numberX; i++) {
    divsToInsert[i] = "<div class='pixel' style='width:" +
    size + "px; height:" + size+"px;'></div>";
  }

  $('#sketchbox').append(divsToInsert.join(''));

  $('.pixel').css({
    'box-sizing': 'border-box',
    'border': '1px solid rgba(0, 0, 0, 0.1)',
    'margin': '0',
    'float': 'left',
    'margin-right': '-1px',
    'margin-bottom': '-1px',
    'padding': 0,
    'vertical-align': 'top',
    'cursor': 'cell'
  });

}


generateGrid(100);

function colorCell(div) {
  $(div).addClass('black');
}

$('#sketchbox').mouseleave(function() {
  $('.pixel').mouseup();
});


function drawMode() {


  if ($('#hover').prop('checked')) {
    $('#sketchbox').off('mouseenter mouseup mousedown', '.pixel');
    $('#sketchbox').on('mouseenter', '.pixel', function() {
      colorCell(this);
    });
    mouseDown = false;
  }
  else if($('#click').prop('checked')) {
    $('#sketchbox').off('mouseenter', '.pixel');
    $('#sketchbox').on('mousedown', '.pixel', function() {
      event.preventDefault();
      mouseDown = true;
      colorCell(this);
    });
    $('#sketchbox').on('mouseenter', '.pixel', function() {
      if(mouseDown) {
        colorCell(this);
      }
    });
    $('#sketchbox').on('mouseup', '.pixel', function() {
      mouseDown = false;
    });
  }


}

$('.drawMode').change(function(){
  drawMode();
});

drawMode();
