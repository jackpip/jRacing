var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  colorRect(0, 0, canvas.width, canvas.height, 'black')
  colorText("Loading...", canvas.width/2, canvas.height/2, 'white;')

  imagesLoad();
}

function imageLoadingDone() {
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  setupInput();
  blueCar.reset(carPic);
  greenCar.reset(greenCarPic);
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  blueCar.move();
  greenCar.move();
}

function drawAll(){
  //clearScreen();
  drawTracks();
  blueCar.draw();
  greenCar.draw();
}

function clearScreen() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
}
