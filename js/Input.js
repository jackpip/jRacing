var mouseX, mouseY;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  blueCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
  greenCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function keySet(keyEvent, whichCar, setTo) {
  if (keyEvent.keyCode == whichCar.controlKeyLeft) {
    whichCar.keyHeldTurnLeft = setTo;
  }
  if (keyEvent.keyCode == whichCar.controlKeyRight) {
    whichCar.keyHeldTurnRight = setTo;
  }
  if (keyEvent.keyCode == whichCar.controlKeyUp) {
    whichCar.keyHeldGas = setTo;
  }
  if (keyEvent.keyCode == whichCar.controlKeyDown) {
    whichCar.keyHeldReverse = setTo;
  }
}

function keyPressed(e) {
  keySet(e, blueCar, true);
  keySet(e, greenCar, true);
}

function keyReleased(e) {
  keySet(e, blueCar, false);
  keySet(e, greenCar, false);
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
