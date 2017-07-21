var canvas, canvasContext;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  carImageLoad();
  trackImagesLoad();

  setupInput();

  carReset();
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  carMove();
  carTrackHandling();
}

function drawAll(){
  //clearScreen();
  drawTracks();
  carDraw();
}

function clearScreen() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
}