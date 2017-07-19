var canvas, canvasContext;
var ballX = 75;
var ballY = 75;
var ballRadius = 10;
var ballSpeedX = 5;
var ballSpeedY = 5;
var paddleX = 400;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 50;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX < 0) {
    ballSpeedX *= -1;
  }
  if(ballX > canvas.width) {
    ballSpeedX *= -1;
  }
  if(ballY < 0) {
    ballSpeedY *= -1;
  }
  if(ballY > canvas.height) {
    ballReset();
  }

  var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
  if (ballY > paddleTopEdgeY &&
      ballY < paddleBottomEdgeY &&
      ballX > paddleLeftEdgeX &&
      ballX < paddleRightEdgeX) {
        ballSpeedY *= -1;
        var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
        var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
        ballSpeedX = ballDistFromPaddleCenterX/3;
      }

}

function drawAll(){
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  colorCircle(ballX, ballY, ballRadius, 'white');
  colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
}

function ballReset() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
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

function updateMousePos(e) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = e.clientX - rect.left - root.scrollLeft;
  var mouseY = e.clientY - rect.top - root.scrollTop;
  paddleX = mouseX - PADDLE_WIDTH/2;
}
