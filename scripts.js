var canvas, canvasContext;
var mouseX, mouseY;
var ballX = 75;
var ballY = 75;
var ballRadius = 10;
var ballSpeedX = 5;
var ballSpeedY = 5;

const TRACK_W = 80;
const TRACK_H = 20;
const TRACK_COLS = 10;
const TRACK_ROWS = 14;
const TRACK_GAP = 2;
const GUTTER_ROWS = 3;
const TOTAL_ROWS = TRACK_ROWS+GUTTER_ROWS;
var trackGrid = new Array(TRACK_COLS);
var tracksLeft = 0;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);
  trackReset();
  ballReset();
}

function updateAll() {
  moveAll();
  drawAll();
}

function ballMove() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX < 0 && ballSpeedX < 0.0) {
    ballSpeedX *= -1;
  }
  if(ballX > canvas.width && ballSpeedX > 0.0) {
    ballSpeedX *= -1;
  }
  if(ballY < 0 && ballSpeedY < 0.0) {
    ballSpeedY *= -1;
  }
  if(ballY > canvas.height) {
    ballReset();
  }
}

function ballTrackHandling() {
  var ballTrackCol = Math.floor(ballX / TRACK_W);
  var ballTrackRow = Math.floor(ballY / TRACK_H);
  var trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow);

  if (ballTrackCol >=0 && ballTrackCol < TRACK_COLS &&
      ballTrackRow >=0 && ballTrackRow < TOTAL_ROWS) {
    if (isTrackAtColRow(ballTrackCol, ballTrackRow)) {
      trackGrid[trackIndexUnderBall] = false;
      tracksLeft--;

      var prevBallX = ballX - ballSpeedX;
      var prevBallY = ballY - ballSpeedY;
      var prevTrackCol = Math.floor(prevBallX / TRACK_W);
      var prevTrackRow = Math.floor(prevBallY / TRACK_H);

      var bothTestsFailed = true;

      if (prevTrackCol != ballTrackCol) {
        if (!isTrackAtColRow(prevTrackCol, ballTrackRow)) {
          ballSpeedX *= -1;
          bothTestsFailed = false;
        }
      }

      if (prevTrackRow != ballTrackRow) {
        if (!isTrackAtColRow(ballTrackCol, prevTrackRow)) {
          ballSpeedY *= -1;
          bothTestsFailed = false;
        }
      }
      if (bothTestsFailed) {
        ballSpeedX *= -1;
        ballSpeedY *= -1;
      }
    }
  }
}

function moveAll() {
  ballMove();
  ballTrackHandling();
}

function drawAll(){
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  colorCircle(ballX, ballY, ballRadius, 'white');
  drawTracks();

  //colorText(mouseTrackCol+","+mouseTrackRow+":"+trackIndexUnderMouse, mouseX, mouseY, 'yellow');
}

function drawTracks() {
  for (var r = 0; r < TOTAL_ROWS; r++) {
    for (var c = 0; c < TRACK_COLS; c++) {
      var arrayIndex = TRACK_COLS * r + c;
      if (trackGrid[arrayIndex]) {
        colorRect(TRACK_W*c, TRACK_H*r, TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, 'blue');
      }
    }
  }
}

function ballReset() {
  ballX = canvas.width/2;
  ballY = 350;
}

function trackReset() {
  tracksLeft = 0;
  for (var i = 0; i < TRACK_COLS*TOTAL_ROWS; i++) {
    //trackGrid[i] = Math.random() < 0.5 ? true : false;
    if (i < GUTTER_ROWS*TRACK_COLS) {
      trackGrid[i] = false;
    } else {
      trackGrid[i] = true;
      tracksLeft++;
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
  /*ballX = mouseX;
  ballY = mouseY;
  ballSpeedX = 5;
  ballSpeedY = -5; */
}

function isTrackAtColRow(col, row) {
  if (col >= 0 && col < TRACK_COLS &&
      row >= 0 && row < TOTAL_ROWS) {
    var trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return trackGrid[trackIndexUnderCoord];
  } else {
    return false;
  }
}

function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}
