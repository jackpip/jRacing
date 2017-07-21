var mouseX, mouseY;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var keyHeldGas = false;
var keyHeldReverse = false;
var keyHeldTurnLeft = false;
var keyHeldTurnRight = false;

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
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
