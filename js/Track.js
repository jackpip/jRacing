const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const TRACK_GAP = 2;

var trackGrid = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                 1, 3, 3, 1, 0, 0, 1, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 2, 2, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
                 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                 0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
                 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4];

function isObstacleAtColRow(col, row) {
 if (col >= 0 && col < TRACK_COLS &&
     row >= 0 && row < TRACK_ROWS) {
   var trackIndexUnderCoord = rowColToArrayIndex(col, row);
   return trackGrid[trackIndexUnderCoord] != TRACK_ROAD;
 } else {
   return false;
 }
}

function carTrackHandling(whichCar) {
  var carTrackCol = Math.floor(whichCar.x / TRACK_W);
  var carTrackRow = Math.floor(whichCar.y / TRACK_H);
  var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

  if (carTrackCol >=0 && carTrackCol < TRACK_COLS &&
      carTrackRow >=0 && carTrackRow < TRACK_ROWS) {
    if (isObstacleAtColRow(carTrackCol, carTrackRow)) {
      whichCar.speed *= -0.5;
    }
  }
}

function drawTracks() {
  var arrayIndex = 0;
  var drawTileX = 0;
  var drawTileY = 0;
  for (var r = 0; r < TRACK_ROWS; r++) {
    for (var c = 0; c < TRACK_COLS; c++) {
      var tileKind = trackGrid[arrayIndex];
      var useImg = trackPics[tileKind];
      canvasContext.drawImage(useImg, drawTileX, drawTileY);
      drawTileX += TRACK_W;
      arrayIndex++;
    }
    drawTileX = 0;
    drawTileY += TRACK_H;
  }
}

function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}
