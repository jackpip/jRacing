var carPic = document.createElement("img");
var greenCarPic = document.createElement("img");
var trackPics = [];

var picsToLoad = 0;

function countLoadedImages() {
  picsToLoad--;
  if (picsToLoad == 0) {
    imageLoadingDone();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImages();
  imgVar.src = "images/"+fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode], fileName);
}

function imagesLoad() {
  var imageList = [
    { varName: carPic, theFile: "player1car.png" },
    { varName: greenCarPic, theFile: "player2car.png" },
    { trackType: TRACK_ROAD, theFile: "track_road.png" },
    { trackType: TRACK_WALL, theFile: "track_wall.png" },
    { trackType: TRACK_GOAL, theFile: "track_goal.png" },
    { trackType: TRACK_TREE, theFile: "track_tree.png" },
    { trackType: TRACK_FLAG, theFile: "track_flag.png" }
  ];

  picsToLoad = imageList.length;

  for (var i = 0; i<imageList.length; i++) {
    if (imageList[i].varName != undefined) {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } else {
      loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
    }
  }
}
