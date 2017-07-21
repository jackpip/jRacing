var carPic = document.createElement("img");
var carPicLoaded = false;

var canvas, canvasContext;
var mouseX, mouseY;
var carX = 75;
var carY = 75;
var carAng = 0;
var carRadius = 10;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.95;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.04;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const PLAYER_START = 2;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var keyHeldGas = false;
var keyHeldReverse = false;
var keyHeldTurnLeft = false;
var keyHeldTurnRight = false;

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
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
  carReset();
}

function updateAll() {
  moveAll();
  drawAll();
}

function carMove() {
  carSpeed *= GROUNDSPEED_DECAY_MULT;
  if (keyHeldGas) {
    carSpeed += DRIVE_POWER;
  }
  if (keyHeldReverse) {
    carSpeed -= REVERSE_POWER;
  }
  if (keyHeldTurnLeft) {
    carAng -= TURN_RATE;
  }
  if (keyHeldTurnRight) {
    carAng += TURN_RATE;
  }
  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

function carTrackHandling() {
  var carTrackCol = Math.floor(carX / TRACK_W);
  var carTrackRow = Math.floor(carY / TRACK_H);
  var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

  if (carTrackCol >=0 && carTrackCol < TRACK_COLS &&
      carTrackRow >=0 && carTrackRow < TOTAL_ROWS) {
    if (isWallAtColRow(carTrackCol, carTrackRow)) {
      carX -= Math.cos(carAng) * carSpeed;
      carY -= Math.sin(carAng) * carSpeed;
      carSpeed *= -0.5;
    }
  }
}

function moveAll() {
  carMove();
  carTrackHandling();
}

function drawAll(){
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  //colorCircle(carX, carY, carRadius, 'white');
  if (carPicLoaded) {
    drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
  }
  drawTracks();

  //colorText(mouseTrackCol+","+mouseTrackRow+":"+trackIndexUnderMouse, mouseX, mouseY, 'yellow');
}

function drawTracks() {
  for (var r = 0; r < TOTAL_ROWS; r++) {
    for (var c = 0; c < TRACK_COLS; c++) {
      var arrayIndex = rowColToArrayIndex(c, r);
      if (trackGrid[arrayIndex] == TRACK_WALL) {
        colorRect(TRACK_W*c, TRACK_H*r, TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, 'blue');
      }
    }
  }
}

function carReset() {
  for (var r = 0; r < TOTAL_ROWS; r++) {
    for (var c = 0; c < TRACK_COLS; c++) {
      var arrayIndex = rowColToArrayIndex(c, r);
      if (trackGrid[arrayIndex] == PLAYER_START) {
        trackGrid[arrayIndex] = TRACK_ROAD;
        carAng = -Math.PI/2;
        carX = c * TRACK_W + TRACK_W/2;
        carY = r * TRACK_H + TRACK_H/2;
      }
    }
  }
}

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
  canvasContext.restore();
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

function isWallAtColRow(col, row) {
  if (col >= 0 && col < TRACK_COLS &&
      row >= 0 && row < TOTAL_ROWS) {
    var trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return trackGrid[trackIndexUnderCoord] == TRACK_WALL;
  } else {
    return false;
  }
}

function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}

function keyPressed(e) {
  if (e.keyCode == KEY_LEFT_ARROW) {
    keyHeldTurnLeft = true;
  }
  if (e.keyCode == KEY_RIGHT_ARROW) {
    keyHeldTurnRight = true;
  }
  if (e.keyCode == KEY_UP_ARROW) {
    keyHeldGas = true;
  }
  if (e.keyCode == KEY_DOWN_ARROW) {
    keyHeldReverse = true;
  }
  e.preventDefault();
}

function keyReleased(e) {
  if (e.keyCode == KEY_LEFT_ARROW) {
    keyHeldTurnLeft = false;
  }
  if (e.keyCode == KEY_RIGHT_ARROW) {
    keyHeldTurnRight = false;
  }
  if (e.keyCode == KEY_UP_ARROW) {
    keyHeldGas = false;
  }
  if (e.keyCode == KEY_DOWN_ARROW) {
    keyHeldReverse = false;
  }
  e.preventDefault();
}
