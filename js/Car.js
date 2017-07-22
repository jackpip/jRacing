const GROUNDSPEED_DECAY_MULT = 0.95;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.08;
const MIN_SPEED_TO_TURN = 0.5;

function carClass() {
  this.x = 75;
  this.y = 75;
  this.ang = 0;
  this.speed = 0;
  this.myCarPic;

  this.keyHeldGas = false;
  this.keyHeldReverse = false;
  this.keyHeldTurnLeft = false;
  this.keyHeldTurnRight = false;

  this.controlKeyUp;
  this.controlKeyRight;
  this.controlKeyDown;
  this.controlKeyLeft;

  this.setupInput = function(upKey, rightKey, downKey, leftKey) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
  }

  this.move = function() {
    this.speed *= GROUNDSPEED_DECAY_MULT;
    if (this.keyHeldGas) {
      this.speed += DRIVE_POWER;
    }
    if (this.keyHeldReverse) {
      this.speed -= REVERSE_POWER;
    }
    if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
      if (this.keyHeldTurnLeft) {
        this.ang -= TURN_RATE;
      }
      if (this.keyHeldTurnRight) {
        this.ang += TURN_RATE;
      }
    }
    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

    carTrackHandling(this);
  }

  this.reset = function(whichImage) {
    this.myCarPic = whichImage;
    for (var r = 0; r < TRACK_ROWS; r++) {
      for (var c = 0; c < TRACK_COLS; c++) {
        var arrayIndex = rowColToArrayIndex(c, r);
        if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
          trackGrid[arrayIndex] = TRACK_ROAD;
          this.ang = -Math.PI/2;
          this.x = c * TRACK_W + TRACK_W/2;
          this.y = r * TRACK_H + TRACK_H/2;
          return;
        }
      }
    }
  }

  this.draw = function() {
    drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
  }

}
