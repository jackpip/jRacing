var carPic = document.createElement("img");
var carPicLoaded = false;

var canvas, canvasContext;
var mouseX, mouseY;
var carX = 75;
var carY = 75;
var carRadius = 10;
var carSpeedX = 5;
var carSpeedY = 5;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const TRACK_GAP = 2;
const GUTTER_ROWS = 0;
const TOTAL_ROWS = TRACK_ROWS+GUTTER_ROWS;
var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 9, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);
  carPic.onload = function() {
    carPicLoaded = true;
  }
  carPic.src = "player1car.png";
  canvas.addEventListener('mousemove', updateMousePos);
  carReset();
}

function updateAll() {
  moveAll();
  drawAll();
}

function carMove() {
  carX += carSpeedX;
  carY += carSpeedY;

  if(carX < 0 && carSpeedX < 0.0) {
    carSpeedX *= -1;
  }
  if(carX > canvas.width && carSpeedX > 0.0) {
    carSpeedX *= -1;
  }
  if(carY < 0 && carSpeedY < 0.0) {
    carSpeedY *= -1;
  }
  if(carY > canvas.height) {
    carReset();
  }
}

function carTrackHandling() {
  var carTrackCol = Math.floor(carX / TRACK_W);
  var carTrackRow = Math.floor(carY / TRACK_H);
  var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

  if (carTrackCol >=0 && carTrackCol < TRACK_COLS &&
      carTrackRow >=0 && carTrackRow < TOTAL_ROWS) {
    if (isTrackAtColRow(carTrackCol, carTrackRow)) {
      var prevCarX = carX - carSpeedX;
      var prevCarY = carY - carSpeedY;
      var prevTrackCol = Math.floor(prevCarX / TRACK_W);
      var prevTrackRow = Math.floor(prevCarY / TRACK_H);

      var bothTestsFailed = true;

      if (prevTrackCol != carTrackCol) {
        if (!isTrackAtColRow(prevTrackCol, carTrackRow)) {
          carSpeedX *= -1;
          bothTestsFailed = false;
        }
      }

      if (prevTrackRow != carTrackRow) {
        if (!isTrackAtColRow(carTrackCol, prevTrackRow)) {
          carSpeedY *= -1;
          bothTestsFailed = false;
        }
      }
      if (bothTestsFailed) {
        carSpeedX *= -1;
        carSpeedY *= -1;
      }
    }
  }
}

function moveAll() {
  //carMove();
  carTrackHandling();
}

function drawAll(){
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  //colorCircle(carX, carY, carRadius, 'white');
  if (carPicLoaded) {
    canvasContext.drawImage(carPic, carX - carPic.width/2, carY - carPic.height/2)
  }
  drawTracks();

  //colorText(mouseTrackCol+","+mouseTrackRow+":"+trackIndexUnderMouse, mouseX, mouseY, 'yellow');
}

function drawTracks() {
  for (var r = 0; r < TOTAL_ROWS; r++) {
    for (var c = 0; c < TRACK_COLS; c++) {
      var arrayIndex = rowColToArrayIndex(c, r);
      if (trackGrid[arrayIndex] == 1) {
        colorRect(TRACK_W*c, TRACK_H*r, TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, 'blue');
      }
    }
  }
}

function carReset() {
  for (var r = 0; r < TOTAL_ROWS; r++) {
    for (var c = 0; c < TRACK_COLS; c++) {
      var arrayIndex = rowColToArrayIndex(c, r);
      if (trackGrid[arrayIndex] == 2) {
        trackGrid[arrayIndex] == 0;
        carX = c * TRACK_W + TRACK_W/2;
        carY = r * TRACK_H + TRACK_H/2;
      }
    }
  }
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}

function updateMousePos(e) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  mouseX = e.clientX - rect.left - root.scrollLeft;
  mouseY = e.clientY - rect.top - root.scrollTop;

  //cheat
  /*carX = mouseX;
  carY = mouseY;
  carSpeedX = 5;
  carSpeedY = -5; */
}

function isTrackAtColRow(col, row) {
  if (col >= 0 && col < TRACK_COLS &&
      row >= 0 && row < TOTAL_ROWS) {
    var trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return trackGrid[trackIndexUnderCoord] == 1;
  } else {
    return false;
  }
}

function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}
