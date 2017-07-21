var carPic = document.createElement("img");
var carPicLoaded = false;

var carX = 75;
var carY = 75;
var carAng = 0;
var carRadius = 10;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.95;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.04;

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

function carReset() {
  for (var r = 0; r < TRACK_ROWS; r++) {
    for (var c = 0; c < TRACK_COLS; c++) {
      var arrayIndex = rowColToArrayIndex(c, r);
      if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
        trackGrid[arrayIndex] = TRACK_ROAD;
        carAng = -Math.PI/2;
        carX = c * TRACK_W + TRACK_W/2;
        carY = r * TRACK_H + TRACK_H/2;
      }
    }
  }
}

function carDraw() {
  if (carPicLoaded) {
    drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
  }
}

function carImageLoad() {
  carPic.onload = function() {
    carPicLoaded = true;
  }
  carPic.src = "images/player1car.png";
}
